canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// create a new hydra-synth instance
const hydra = new Hydra({
  canvas: document.getElementById("canvas"),
  detectAudio: false,
  numSources: 4,
  numOutputs: 4,
});

// hydra command to show if the new evaluated command fails
let lastValidHydraCommand = "osc(10, 0.1, 0.8).out()";

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

// osc(20, 0.1, 0).color(0, 1, 2).rotate(1.57/2).out(o1) osc(30, 0.01, 0).color(2, 0.7, 1).modulate(o1, 0).add(o1,1).modulatePixelate(o1,1,10).out(o0)
// osc(30, 0.01, 0).color(2, 0.7, 1).modulate(o1, 0).add(o1,1).modulatePixelate(o1,1,10).out(o0)
