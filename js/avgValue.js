class avgValue {
    constructor() {
        this.max = 0;
        this.sad = 0;
        this.mad = 0;
        this.mse = 0;
        this.psnr = 0;
        this.counter = 0;
    }

    setValues(max, sad, mad, mse, psnr) {
        this.max += max;
        this.sad += sad;
        this.mad += mad;
        this.mse += mse;
        this.psnr += psnr;
        this.counter += 1;
    }

    avgMaxError() {
        return this.max / this.counter;
    }

    avgSad() {
        return this.sad / this.counter;
    }

    avgMad() {
        return this.mad / this.counter;
    }

    avgMse() {
        return this.mse / this.counter;
    }

    avgPsnr() {
        return this.psnr / this.counter;
    }

}
export default avgValue;