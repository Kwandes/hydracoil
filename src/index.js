canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// create a new hydra-synth instance
const hydra = new Hydra({
  canvas: document.getElementById("canvas"),
  detectAudio: true,
  numSources: 4,
  numOutputs: 4,
});

// initialize the audio behaviour
a.setSmooth(0.9);
a.setScale(19);

// hydra command to show if the new evaluated command fails

let commandStart = "osc(10, 0.1, 0.8)";
let commandEnd = ".out()";

let backgroundPattern = [
  ".color(1.14, 0.6,.80).rotate(0.92, 0.3).pixelate(20, 10).mult(osc(40, 0.03).thresh(0.4).rotate(0, -0.02))",
  ".scale(1.5).color(1.14, 0.6,.80)",
  ".color(1.14, 0.6,.80)",
  ".color(0.5,0.8,50).scale(() => Math.sin(time)+1*70).repeat(() => Math.sin(time)*10).modulateRotate(o0).scale(() => Math.sin(time)+1 *1.5).modulate(noise(2,2)).rotate(1, .2)",
  ".color(0.5,0.8,5).scale(() => Math.sin(time)+1*5).repeat(() => Math.sin(time)*10).modulateRotate(o0).scale(() => Math.sin(time)+1 *2).modulate(noise(2,2)).rotate(10, .2)",
];
let foregroundPattern = [
  "shape(99,.15,.5).color(0,1,2).diff( shape(240,.5,0).scrollX(.05).rotate( ()=>time/10 ).color(1,0,.75) ).diff( shape(99,.4,.002).scrollX(.10).rotate( ()=>time/20 ).color(1,0,.75) ).diff( shape(99,.3,.002).scrollX(.15).rotate( ()=>time/30 ).color(1,0,.75) ).diff( shape(99,.2,.002).scrollX(.20).rotate( ()=>time/40 ).color(1,0,.75) ).diff( shape(99,.1,.002).scrollX(.25).rotate( ()=>time/50 ).color(1,0,.75) ).modulateScale(shape(240,.5,0).scrollX(.05).rotate( ()=>time/10 ), ()=>(Math.sin(time/3)*.2)+.2 ).scale(1.6,.6,1)",
  "osc(10, 0.1, 0.8).kaleid().mask(shape(4, 0.3, 1)).modulateRotate(shape(4, 0.1, 1)).modulateRotate(shape(4, 0.1, 0.9)).modulateRotate(shape(4, 0.1, 0.8)).rotate(() => time / 4).scale(0.3).add(shape(4, 0.3, 1).color(0.3, 0.2, 0.8))",
];

// Ability to scroll the background pattern
//const scrollPattern = ".scrollX(1,({time}) => Math.sin(time*0.05)*0.05 ).scrollY(1,({time}) => Math.sin(time*0.05)*0.05 )"
const scrollPattern = "";

let lastValidHydraCommand =
  commandStart +
  backgroundPattern[Math.floor(Math.random() * backgroundPattern.length)] +
  scrollPattern +
  ".add(" +
  //commandStart +
  foregroundPattern[Math.floor(Math.random() * foregroundPattern.length)] +
  ").out();";

document.getElementById("command-input").innerText = lastValidHydraCommand;

function init() {
  console.log("Time to start the show!");
  console.dir(canvas);

  console.log("Starting the default light show");
  // Apply the default hydra command
  evaluateHydraCommand(lastValidHydraCommand);

  // read the command input and apply it to the canvas if it is valid
  const commandInput = document.getElementById("command-input");
  commandInput.addEventListener("input", () => {
    let hydraCommand = commandInput.innerText;
    // replace spaces between commands with a semicolon
    hydraCommand = hydraCommand.replace(
      /\s(?=(osc)|(grad)|(voro)|(shape))/g,
      ";"
    );
    console.log(hydraCommand);
    evaluateHydraCommand(hydraCommand);
  });
}

// attempt to execute a given hydra command
function evaluateHydraCommand(command) {
  try {
    eval(command);
    // render the various buffers if they are used
    if (command.includes("o0")) render(o0);
    if (command.includes("o1")) render(o1);
    if (command.includes("o2")) render(o2);
    if (command.includes("o3")) render(o3);
    lastValidHydraCommand = command;
  } catch (exception) {
    console.log("Provided command is not a valid hydra string");
    //console.log(exception);
    eval(lastValidHydraCommand);
    return false;
  }
  return true;
}
