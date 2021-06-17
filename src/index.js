canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// create a new hydra-synth instance
const hydra = new Hydra({
  canvas: document.getElementById("canvas"),
  detectAudio: false,
});

function init() {
  console.log("Time to start the show!");
  console.dir(canvas);

  console.log("Starting the default light show");
  osc(10, 0.1, 0.8).rotate(0, 0.1).kaleid().color(-1, 1).out();
}
