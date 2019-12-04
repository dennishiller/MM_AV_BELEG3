import PreciseVideoPlayer from './preciseVideoPlayer.js';
import PlaybackController from './playbackController.js';
import Analyser from './analyser.js';
import Compare from './compare.js';
import AvgValue from './avgValue.js';

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

const avgMax = document.getElementById("avgMax");
const avgSad = document.getElementById("avgSad");
const avgMad = document.getElementById("avgMad");
const avgMse = document.getElementById("avgMse");
const avgPsnr = document.getElementById("avgPsnr");

const avg = new AvgValue();
// Render loop, updates frames during playback
function render() {
  playbackController.render();

  if (playerHQ.newFrameAvailable()) {
    const a = analyserHQ.newValues();
    const b = analyserLQ.newValues();

    var comp = new Compare(a, b);
    comp.calcValues();

    avg.setValues(comp.maxError,comp.sad,comp.mad(),comp.mse(),comp.psnr());

    maximumError.textContent = 'MAX: ' + comp.maxError;
    sad.textContent = 'SAD: ' + comp.sad;
    mad.textContent = 'MAD: ' + comp.mad();
    mse.textContent = 'MSE: ' + comp.mse();
    psnr.textContent = 'PSNR: ' + comp.psnr();  

    avgMax.textContent = 'Avg: ' + avg.avgMaxError();
    avgSad.textContent = 'Avg: ' + avg.avgSad();
    avgMad.textContent = 'Avg: ' + avg.avgMad();
    avgMse.textContent = 'Avg: ' + avg.avgMse();
    avgPsnr.textContent = 'Avg: ' + avg.avgPsnr();
  }

  // console.log("Are they same? " + (a===b))
  // console.log(playerHQ.newFrameAvailable());
  requestAnimationFrame(render);
}