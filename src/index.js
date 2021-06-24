/*
 * This file contains logic for initalizing the project, as well as hiding the UI
 *
 */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  console.log("Window has been resized, adjusting the canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  hydra.setResolution(canvas.width, canvas.height);
});

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

  document.getElementById("hide-ui-button").addEventListener("click", hideUi);
  document
    .getElementById("toggle-audio-patterns-button")
    .addEventListener("click", toggleAudioPatterns);
}

let isUiHidden = false;

function hideUi() {
  console.log(isUiHidden);
  isUiHidden = !isUiHidden;
  if (isUiHidden) {
    document.getElementById("input-box").style.display = "none";
    document.getElementById("audio").style.display = "none";
    document.getElementById("toggle-audio-patterns").style.display = "none";
  } else {
    document.getElementById("input-box").style.display = "flex";
    document.getElementById("audio").style.display = "flex";
    document.getElementById("toggle-audio-patterns").style.display = "flex";
  }
  document.getElementById("hide-ui-button").innerHTML = isUiHidden
    ? "Show UI"
    : "Hide UI";
}

let enabledAudioPatterns = true;

function toggleAudioPatterns() {
  enabledAudioPatterns = !enabledAudioPatterns;
  console.log(`Changing audio patterns to ${enabledAudioPatterns}`);
  document.getElementById("toggle-audio-patterns-button").innerHTML =
    enabledAudioPatterns ? "Disable Pattern Magic" : "Enable Pattern Magic";
}
