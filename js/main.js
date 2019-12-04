import PreciseVideoPlayer from './preciseVideoPlayer.js';
import PlaybackController from './playbackController.js';
import Analyser from './analyser.js';
import Compare from './compare.js'

// URLs for PNG-sequences, adjust to use custom videos
const baseURL = "/media/FerrisWheel/";
const highQ = "Q30/thumb";
const lowQ = "Q60/thumb";

// Canvas to render high quality video & video player object
const canvasHQ = document.getElementById("video-high-quality");
let playerHQ = new PreciseVideoPlayer(canvasHQ, baseURL + highQ);

// Canvas to render low quality video & video player object
const canvasLQ = document.getElementById("video-low-quality");
let playerLQ = new PreciseVideoPlayer(canvasLQ, baseURL + lowQ);

// playback controller, keeps frames in sync between low and high quality player
let playbackController = new PlaybackController(24);
playbackController.addPlayer(playerLQ);
playbackController.addPlayer(playerHQ);

//////////////////////////////////////////////////////////////
//               Prepare Button Listener
//////////////////////////////////////////////////////////////

let btnNextFrame = document.getElementById("btn-next-frame");
btnNextFrame.onclick = () => {
  playerHQ.nextFrame();
  playerLQ.nextFrame();
}

let btnPlayForward = document.getElementById("btn-play-forward");
btnPlayForward.onclick = () => {
  if (!playbackController.isPlaying || (playbackController.isPlaying && !playbackController.forward)) {
    playbackController.setDirection(true);
    playbackController.setPlay(true);
    btnPlayForward.classList.add("active");
    btnPlayBackward.classList.remove("active");
  } else {
    playbackController.setPlay(false);
    btnPlayForward.classList.remove("active");
  }
}

let btnPlayBackward = document.getElementById("btn-play-backward");
btnPlayBackward.onclick = () => {
  if (!playbackController.isPlaying || (playbackController.isPlaying && playbackController.forward)) {
    playbackController.setDirection(false);
    playbackController.setPlay(true);
    btnPlayBackward.classList.add("active");
    btnPlayForward.classList.remove("active");
  } else {
    playbackController.setPlay(false);
    btnPlayBackward.classList.remove("active");
  }
}

let btnPrevFrame = document.getElementById("btn-prev-frame");
btnPrevFrame.onclick = () => {
  playerHQ.prevFrame();
  playerLQ.prevFrame();
}

var analyserHQ = new Analyser(canvasHQ, playerHQ);
var analyserLQ = new Analyser(canvasLQ, playerLQ);

// Start Render loop
render();

const maximumError = document.getElementById("maximum_error");
const sad = document.getElementById("sad");
const mad = document.getElementById("mad");
const mse = document.getElementById("mse");
const psnr = document.getElementById("psnr");
// Render loop, updates frames during playback
function render() {
  playbackController.render();

  if (playerHQ.newFrameAvailable()) {
    const a = analyserHQ.newValues();
    const b = analyserLQ.newValues();

    var comp = new Compare(a, b);
    comp.calcValues();

    maximumError.textContent = 'Maximum Error: ' + comp.maxError;
    sad.textContent = 'Sum of Absolute Differences: ' + comp.sad;
    mad.textContent = 'Mean Absolute Difference: ' + comp.mad();
    mse.textContent = 'Mean Squared Error: ' + comp.mse();
    psnr.textContent = 'Peak-Signal-to-Noise-Ratio: ' + comp.psnr();    
  }

  // console.log("Are they same? " + (a===b))
  // console.log(playerHQ.newFrameAvailable());
  requestAnimationFrame(render);
}