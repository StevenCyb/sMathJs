class InverseRegression {
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
        return this.coefficients[0] + " + (" + this.coefficients[1] + " / x)";
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
        return this.coefficients[0] + (this.coefficients[1] / x);
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
    * Gradients [c0, c1] => [A, B]
    */
    gradient(data=[]) {
        SMathJsUtils.isValidNdTupleArray(data, 2);
        var gradients = Array(2).fill(0), n = data.length.toFixed(1);
        for(var i=0; i<n; i++) {
            gradients[0] += (1.0 / n) * Math.max(1 / data[i][0], 1) * (data[i][1] - this.predict(data[i][0]));
            gradients[1] += (1.0 / n) * Math.max(1 - (1 / data[i][0]), 0) * (data[i][1] - this.predict(data[i][0]));
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
    * Gradients [c0, c1] => [A, B]
    */
    gradientWithGiven(data=[], coefficients=[]) {
        SMathJsUtils.isValidNdTupleArray(data, 2);
        var coefficientsHolder = this.coefficients, gradients;
        this.coefficients = coefficients;
        gradients = this.gradient(data);
        this.coefficients = coefficientsHolder;
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
        var n = data.length, x_1Mean = 0.0, yMean = 0.0, Sxx = 0.0, Sxy = 0.0;
        for(var i=0; i<n; i++) {
            x_1Mean += (1.0 / n) * Math.pow(data[i][0], -1);
            yMean += (1.0 / n) * data[i][1];
        }
        for(var i=0; i<n; i++) {
            Sxx += Math.pow(Math.pow(data[i][0], -1) - x_1Mean, 2);
            Sxy += (Math.pow(data[i][0], -1) - x_1Mean) * (data[i][1] - yMean);
        }
        this.coefficients[1] = Sxy / Sxx;
        this.coefficients[0] = yMean - this.coefficients[1] * x_1Mean;
    }
    /*
    * Calculate the correlation coefficient to the given data points from best fit.
    * Parameter:
    * data: Data in format [[x_1,y_1],[x_2,y_2],...] 
    * Return:
    * Correlation coefficient (r) where...
    * 0.7<|r|<=1  -> Strong correlation
    * 0.4<|r|<0.7 -> Moderate correlation
    * 0.2<|r|<0.4 -> Weak correlation
    *  0<=|r|<0.2 -> No correlation
    */
    correlationCoefficient(data) {
        SMathJsUtils.isValidNdTupleArray(data, 2);
        var n = data.length, x_1Mean = 0.0, yMean = 0.0, Sxx = 0.0, Syy = 0.0, Sxy = 0.0;
        for(var i=0; i<n; i++) {
            x_1Mean += (1.0 / n) * Math.pow(data[i][0], -1);
            yMean += (1.0 / n) * data[i][1];
        }
        for(var i=0; i<n; i++) {
            Sxx += Math.pow(Math.pow(data[i][0], -1) - x_1Mean, 2);
            Syy += Math.pow(data[i][1] - yMean, 2);
            Sxy += (Math.pow(data[i][0], -1) - x_1Mean) * (data[i][1] - yMean);
        }
        return Sxy / (Math.sqrt(Sxx) * Math.sqrt(Syy));
    }
}