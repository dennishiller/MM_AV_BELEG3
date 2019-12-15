class histogram {
    constructor(canvas) {
        this.canvas = canvas;
    }

    draw(data) {
        this.reset();
        /* Accepting and seperating comma seperated values */
        var ctx = this.canvas.getContext('2d');
        var values = data;
        var width = 0.1; //bar width
        var X = 10; // first bar position 
        var base = 200;

        for (var i = 0; i < values.length; i++) {
            ctx.fillStyle = 'rgba(127,127,127)';
            var h = values[i];
            ctx.fillRect(X, this.canvas.height - h, width, h);

            X += width;
        }


    }

    reset(){
        var ctx = this.canvas.getContext('2d');
          ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }


}

export default histogram;