import PreciseVideoPlayer from './preciseVideoPlayer.js';
import PlaybackController from './playbackController.js';

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

// Start Render loop
render();

// Render loop, updates frames during playback
function render() {
  playbackController.render();
  
  //console.log(playerHQ.newFrameAvailable());
  requestAnimationFrame(render);
}