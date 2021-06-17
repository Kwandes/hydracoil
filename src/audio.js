const audio = document.getElementById("audio");
// adjust the volume
audio.volume = 0.2;
console.log(audio);

audio.addEventListener("play", startListeningToAudio);
audio.addEventListener("pause", stopListeningToAudio);

function startListeningToAudio() {
  console.log("Listening to your bullshit");
  a.show();
}

function stopListeningToAudio() {
  console.log("I'm done with your bullshit");
  a.hide();
}
//() => (a.fft[0]*4)
