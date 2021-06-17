canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// create a new hydra-synth instance
const hydra = new Hydra({
  canvas: document.getElementById("canvas"),
  detectAudio: false,
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
    evaluateHydraCommand(commandInput.value);
  });
}

// attempt to execute a given hydra command
function evaluateHydraCommand(command) {
  try {
    eval(command);
    lastValidHydraCommand = command;
  } catch (exception) {
    console.log("Provided command is not a valid hydra string");
    //console.log(exception);
    eval(lastValidHydraCommand);
    return false;
  }
  return true;
}
