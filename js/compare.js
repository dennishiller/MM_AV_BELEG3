class compare {

    constructor(frameOne, frameTwo) {
        this.frameOne = frameOne;
        this.frameTwo = frameTwo;
        this.maxError = 0;
        this.maxErrorSum = 0;
        this.sad = 0;
        this.sadSum = 0;
        this.reciprocalXY = 1 / (frameOne.height * frameOne.width);
        this.squared = 0;
        this.mseValue = 0;
    }

    calcValues() {
        for (var i = 0; i < this.frameOne.data.length; i++) {
            const valueOne = this.frameOne.data[i];
            const valueTwo = this.frameTwo.data[i];
            const result = Math.abs(valueOne - valueTwo);

           
            if (this.maxError < result) {
                this.maxError = result;
            }
            this.sad += result;
            this.squared += Math.pow((valueOne - valueTwo), 2);
        }
        this.iterator++;
    }

    sad() {
        return this.sad;
    }

   

    mad() {
        return (this.reciprocalXY * this.sad);
    }



    mse() {
        this.mseValue = this.reciprocalXY * this.squared;
        return this.mseValue;
    }

    psnr() {
        return 10 * Math.log10(Math.pow(255, 2) / this.mseValue);
    }


  }

export default compare;