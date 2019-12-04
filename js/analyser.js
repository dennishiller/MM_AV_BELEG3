class analyser{
    constructor(canvas,preciseVideoPlayer){
        this.canvas = canvas
        this.preciseVideoPlayer = preciseVideoPlayer
    }

    newValues(){
        this.ctx = this.canvas.getContext("2d");
        var imgData = this.ctx.getImageData(0,0,this.canvas.width, this.canvas.height);
        if(this.preciseVideoPlayer.newFrameAvailable()){
            console.log("yes")
            imgData = this.ctx.getImageData(0,0,this.canvas.width, this.canvas.height);
            return imgData;
        } else {
            return imgData;
        }
    }


}

export default analyser;



//context.getImageData(0, 0, canvas.width, canvas.height)