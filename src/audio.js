/*
 * THis file contains logic for audio setup, and controlling the visuals with audio
 *
 */

const audio = document.getElementById("audio");
// adjust the volume
audio.volume = 0.2;
console.log(audio);

audio.addEventListener("play", startListeningToAudio);
audio.addEventListener("pause", stopListeningToAudio);

let audioPatternLoopInterval;

const patternChangeMinFrequencyPerMinute = 4; // Pattern will change at least X times per minute
const patternChangeCheckFrequency = 60; // How often to check the pattern change, per second
const minimumTimeBetweenPatternChanges = 5; // seconds
let intervalCounter = 0;

function startListeningToAudio() {
  console.log("Listening to the music");
  a.show();
  audioPatternLoopInterval = setInterval(() => {
    // Check if the pattern changing is enabled
    if (enabledAudioPatterns == undefined || enabledAudioPatterns == false)
      return;
    intervalCounter++;
    // don't change the pattern if it changed too often
    if (
      (minimumTimeBetweenPatternChanges * 1000) / patternChangeCheckFrequency >
      intervalCounter
    ) {
      return;
    }
    // Only change the pattern on loud beats or if it hasn't changed in X seconds
    if (Math.floor(a.fft[0] * 100) < 25) {
      if (intervalCounter != 1000 / patternChangeMinFrequencyPerMinute) {
        return;
      }
    }
    intervalCounter = 0;

    let backgroundPatternIndex =
      Math.floor(a.fft[0] * 100) % backgroundPattern.length;
    let foregroundPatternIndex =
      Math.floor(a.fft[0] * 100) % foregroundPattern.length;
    console.log(
      `Pattern change, new pattern is background[${backgroundPatternIndex}] and foreground[${foregroundPatternIndex}]`
    );

    const newPattern =
      commandStart +
      backgroundPattern[Math.floor(Math.random() * backgroundPattern.length)] +
      scrollPattern +
      ".add(" +
      //commandStart +
      foregroundPattern[Math.floor(Math.random() * foregroundPattern.length)] +
      ").out();";
    evaluateHydraCommand(newPattern);
    document.getElementById("command-input").innerText = newPattern;
  }, 1000 / patternChangeCheckFrequency);
}

function stopListeningToAudio() {
  console.log("Your taste is bad, I'm out");
  a.hide();
  clearInterval(audioPatternLoopInterval);
}

//() => (a.fft[0]*4)
