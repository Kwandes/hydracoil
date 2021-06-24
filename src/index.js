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

let commandStart = "osc(10, 0.1, ()=> (a.fft[0]*8))";
let commandEnd = ".out()";

let backgroundPattern = [
  ".color(1.14, 0.6,.80).rotate(0.92, 0.3).pixelate(20, 10).mult(osc(40, 0.03).thresh(0.4).scale(()=> (a.fft[0]/5-1)).rotate(0, -0.02))",
  ".scale(1.5).color(1.14, 0.6,.80)",
  ".color(1.14, 0.6,.80)",
  ".color(0.5,0.8,50).scale(() => Math.sin(time)+1*70).repeat(() => Math.sin(time)*10).modulateRotate(o0).scale(() => Math.sin(time)+1 *1.5).modulate(noise(2,2)).rotate(1, .2)",
  ".color(0.5,0.8,5).scale(() => Math.sin(time)+1*5).repeat(() => Math.sin(time)*10).modulateRotate(o0).scale(() => Math.sin(time)+1 *2).modulate(noise(2,2)).rotate(10, .2)",
  ".diff(osc(20,0.00008).rotate(Math.PI/0.00003)).modulateScale(noise(1.5,0.18).modulateScale(osc(13).rotate(()=>Math.sin(time/22))),3).color(11,0.5,0.4, 0.9, 0.2, 0.011, 5, 22,  0.5, -1).contrast(1.4).add(src(o0).modulate(o0,.04),.6, .9).invert().brightness(0.0003, 2).contrast( 0.5, 2, 0.1, 2).color(4, -2, 0.1).modulateScale(osc(2),-0.2, 2, 1, 0.3).posterize(200) .rotate(1, 0.2, 0.01, 0.001).color(22, -2, 0.5, 0.5, 0.0001,  0.1, 0.2, 8).contrast(0.18, 0.3, 0.1, 0.2, 0.03, 1) . brightness(0.0001, -1, 10)",
  ".mult(shape(1,0.09).rotate(1.5)).diff(gradient()).add(shape(2,2).blend(gradient(1))).modulate(noise().modulate(noise().scrollY(1,0.0625))).blend(o0).color(1,-0.5,-0.75)",
  ".color(1.04,0, -1.1).rotate(0.30, 0.1).pixelate(2, 20).modulate(noise(2.5), () => 1.5 * Math.sin(0.08 * time))",
];
let foregroundPattern = [
  "osc(20, 0.01, 1.1).kaleid(5).mask(shape(4, () => (a.fft[0]*2), 1)).color(2.83,0.91,0.39).rotate(0, 0.8).scale(() => (a.fft[0]+0.4))",
  "osc(10, 0.1, 0.8).kaleid().mask(shape(4, 0.3, 1)).modulateRotate(shape(4, 0.1, 1)).modulateRotate(shape(4, () => (a.fft[3]), 0.9)).modulateRotate(shape(4, 0.1, () => (a.fft[3]))).rotate(() => time / 4).scale(() => (a.fft[0]/5 + 0.3)).add(shape(4, 0.3, 1).color(0.3, 0.2, 0.8))",
  "shape(8, 0.2, () => (a.fft[3])/2).color(() => Math.abs(Math.sin(time) *2), () => Math.sin(time), () => (a.fft[0])).modulateScale(osc(2, 0.5, 0.05)).modulateRotate(shape(4,0.9,1)).mask(shape(4,0.3,.4)).rotate(() => time/5)",
  "shape(() => Math.sin(time) *5 +  a.fft[3]*2, 0.2, 0.1).scale(() => (a.fft[3]/4 + 0.1)).color(() => Math.abs(Math.sin(time) *2), () => Math.sin(time), .3).modulateScale(osc(2, 0.5, 0.05))  .modulateRotate(shape(4,0.9,1)).mask(shape(4,() => (a.fft[3]),.4)).rotate(() => time/5)",
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
