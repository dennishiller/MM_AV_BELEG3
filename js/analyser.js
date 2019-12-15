class analyser {
    constructor(canvas, preciseVideoPlayer) {
        this.canvas = canvas;
        this.preciseVideoPlayer = preciseVideoPlayer;

    }

    newValues() {
        this.ctx = this.canvas.getContext("2d");
        var img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        if (this.preciseVideoPlayer.newFrameAvailable()) {
            return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        }
        return img;
    }
}
export default analyser;