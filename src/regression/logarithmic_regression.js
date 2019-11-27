/*
 * Class providing a logarithmic regression
 */
class LogarithmicRegression {
    /*
    * Constructor of this class.
    * Parameter:
    * optimizer: Optimizer to train (optional)
    */
    constructor(optimizer=null) {
        this.iteration = 0;
        this.coefficients = Array(2).fill(1.0);
        this.optimizers = [];
        if(optimizer != null) {
            this.optimizers.push(optimizer.clone());
            this.optimizers.push(optimizer.clone());
        }
    }
    /*
    * Get equation string with current coefficients.
    * Return:
    * Equation string
    */
    getEquationString() {
        var equation = this.prettyEquation;
        for(var i=0; i<this.coefficients.length;i++) {
            equation = equation.replace("c" + [i], this.coefficients[i]);
        }
        return this.coefficients[0] + " + (" + this.coefficients[1] + ") * ln(x)";
    }
    /*
    * Calculate the y-value for the corresponding x-value.
    * Parameter:
    * x: X-Value 
    * Return:
    * Y-Value
    */
    predict(x) {
        SMathJsUtils.isValidNumber(x);
        return this.coefficients[0] + this.coefficients[1] * Math.log(x);
    }
    /*
    * Calculates the summed mean square error (MSE) loss.
    * Parameter:
    * data: Data in format [[x_1,y_1],[x_2,y_2],...] 
    * Return:
    * Summed MSE
    */
    summedMeanSquaredError(data=[]) { 
        SMathJsUtils.isValidNdTupleArray(data, 2);
        var totalError = 0.0, n = data.length;
        for(var i=0; i<n; i++) {
            totalError += Math.pow(data[i][1] - this.predict(data[i][0]), 2);
        }
        return (1 / n) * totalError;
    }
    /*
    * Calculates the gradient with current regression parameters.
    * Parameter:
    * data: Data in format [[x_1,y_1],[x_2,y_2],...] 
    * Return:
    * Gradients [c0, c1] => [a, b]
    */
    gradient(data=[]) {
        SMathJsUtils.isValidNdTupleArray(data, 2);
        var gradients = Array(2).fill(0), n = data.length.toFixed(1);
        for(var i=0; i<n; i++) {
            var x= data[i][0]; // Needed in eval
            gradients[0] += (1.0 / n) * (data[i][1] - (this.coefficients[0] + this.coefficients[1] * Math.log(data[i][0])));
            gradients[1] += (1.0 / n) * data[i][0] * (data[i][1] - (this.coefficients[0] + this.coefficients[1] * Math.log(data[i][0])));
        }
        // Invert the gradient value
        gradients[0] *= -1;
        gradients[1] *= -1;
        return gradients;
    }
    /*
    * Calculates the gradient with given coefficients.
    * Parameter:
    * data: Data in format [[x_1,y_1],[x_2,y_2],...] 
    * coefficients: Coefficients to use [c0, c1] => [a, b]
    * Return:
    * Gradients [c0, c1] => [a, b]
    */
    gradientWithGiven(data=[], coefficients=[]) {
        SMathJsUtils.isValidNdTupleArray(data, 2);
        var coefficientsHolder = this.coefficients, gradients;
        this.coefficients = coefficients;
        gradients = this.gradient(data);
        this.coefficients = coefficientsHolder;
        // Invert the gradient value
        gradients[0] *= -1;
        gradients[1] *= -1;
        return gradients;
    }
    /*
    * Perform a training step with the setted optimizer.
    * Parameter:
    * data: Data in format [[x_1,y_1],[x_2,y_2],...] 
    * Return:
    * Loss after training step.
    */
    train(data) {
        if(this.optimizers.length <= 0) {
            throw "Optimizer not setted.";
        }
        SMathJsUtils.isValidNdTupleArray(data, 2);
        var gradients = Array(2).fill(1.0);
		try {
            SMathJsUtils.isValidFunction(this.optimizers[0].gradientPreCalculation);
            var coefficients = Array(2).fill(1.0);
            coefficients[0] = this.optimizers[0].gradientPreCalculation(this.coefficients[0]);
            coefficients[1] = this.optimizers[1].gradientPreCalculation(this.coefficients[1]);
            gradients = this.gradientWithGiven(data, coefficients);
		} catch(err) {
			gradients = this.gradient(data);
        }
        this.coefficients[0] = this.optimizers[0].optimize(this.iteration, this.coefficients[0], gradients[0]);
        this.coefficients[1] = this.optimizers[1].optimize(this.iteration, this.coefficients[1], gradients[1]);
        this.iteration += 1;
        if(Math.abs(this.coefficients[0]) == Infinity || Math.abs(this.coefficients[1]) == Infinity) {
            throw "Coefficients reach infinity.";
        }
        return this.summedMeanSquaredError(data);
    }
    /*
    * Calculate the best fit to the given data points.
    * Parameter:
    * data: Data in format [[x_1,y_1],[x_2,y_2],...] 
    * Return:
    * Nothing, but set the coefficients
    */
    bestFit(data) {
        SMathJsUtils.isValidNdTupleArray(data, 2);
        var n = data.length, lnxMean = 0.0, yMean = 0.0, Sxx = 0.0, Syy = 0.0, Sxy = 0.0;
        for(var i=0; i<n; i++) {
            lnxMean += (1.0 / n) * Math.log(data[i][0]);
            yMean += (1.0 / n) * data[i][1];
        }
        for(var i=0; i<n; i++) {
            Sxx += Math.pow(Math.log(data[i][0]) - lnxMean, 2);
            Syy += Math.pow(data[i][1] - yMean, 2);
            Sxy += (Math.log(data[i][0]) - lnxMean) * (data[i][1] - yMean);
        }
        this.coefficients[1] = Sxy / Sxx;
        this.coefficients[0]  = yMean - this.coefficients[1]  * lnxMean;
    }
}