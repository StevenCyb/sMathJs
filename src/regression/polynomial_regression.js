/*
 * Class providing a polynomial regression with n-degrees
 */
class PolynomialRegression {
    /*
    * Constructor of this class.
    * Parameter:
    * degree: Degree of this polynomial regression
    * optimizer: Optimizer to train (optional)
    */
    constructor(degree=1, optimizer=null) {
        this.iteration = 0;
        SMathJsUtils.isValidNumber(degree);
        if(degree < 0) {
            throw "Degree must be greater or equal to zero";
        }
        this.degree = degree;
        this.coefficients = Array(degree + 1).fill(1.0);
        this.prettyEquation = "c" + degree;
        this.gradientEquation = Array(degree + 1).fill("");
        this.equation = "this.coefficients[" + degree + "]";
        this.gradientEquation[degree] = "this.coefficients[" + degree + "] * x0";
        this.optimizers = [];
        if(optimizer != null) {
            this.optimizers.push(optimizer.clone());
        }
        for(var i=degree; i>=1; i--) {
            if(optimizer != null) {
                this.optimizers.push(optimizer.clone());
            }
            if(i != degree) {
                this.equation = "this.coefficients[" + (i - 1) + "] * Math.pow(x, " + (degree - i + 1) + ") + " + this.equation;
                this.prettyEquation = "c" + (i - 1) + " * x^" + (degree - i + 1) + " + " + this.prettyEquation;
                this.gradientEquation[degree] = "this.coefficients[" + (i - 1) + "] * x" + (degree - i + 1) + " + " + this.gradientEquation[degree];
            } else {
                this.equation = "this.coefficients[" + (degree - 1) + "] * x + " + this.equation;
                this.prettyEquation = "c" + (degree - 1) + " * x + " + this.prettyEquation;
                this.gradientEquation[degree] = "this.coefficients[" + (degree - 1) + "] * x1 + " + this.gradientEquation[degree];
            }
        }
        for(var i=0; i<=degree; i++) {
            this.gradientEquation[i] = this.gradientEquation[degree];
            for(var j=0; j<=degree; j++) {
                if((j + degree - i) <= 0) {
                    this.gradientEquation[i] = this.gradientEquation[i].replace(" * x" + j, "");
                } else if((j + degree - i) == 1) {
                    this.gradientEquation[i] = this.gradientEquation[i].replace("x" + j, "x");
                } else {
                    this.gradientEquation[i] = this.gradientEquation[i].replace("x" + j, "Math.pow(x, " + (j + degree - i) + ")");
                }
            }
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
        return equation;
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
        return eval(this.equation);
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
    * Gradients [c0, c1, ..., cn]
    */
   gradient(data=[]) {
        SMathJsUtils.isValidNdTupleArray(data, 2);
        var gradients = Array(this.degree + 1).fill(0), n = data.length.toFixed(1);
        for(var i=0; i<n; i++) {
            var x= data[i][0]; // Needed in eval
            gradients[this.degree] += (1.0 / n) * (eval(this.gradientEquation[this.degree]) - data[i][1]);
            for(var j=this.degree; j>=1; j--) {
                if(j != this.degree) {
                    gradients[j - 1] += (1.0 / n) * (eval(this.gradientEquation[j - 1]) - (data[i][1] *  Math.pow(data[i][0], this.degree - j + 1)));
                } else {
                    gradients[(j - 1)] += (1.0 / n) * (eval(this.gradientEquation[j - 1]) - (data[i][1] * data[i][0]));
                }
            }
        }
        return gradients;
    }
    /*
    * Calculates the gradient with given coefficients.
    * Parameter:
    * data: Data in format [[x_1,y_1],[x_2,y_2],...] 
    * coefficients: Coefficients to use [c0, c1, ..., cn]
    * Return:
    * Gradients [c0, c1, ..., cn]
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
        var gradients = Array(this.degree + 1).fill(0);
		try {
            SMathJsUtils.isValidFunction(this.optimizers[0].gradientPreCalculation);
            var coefficients = Array(this.degree + 1).fill(0);
            for(var i=0; i<=this.degree; i++) {
                coefficients[i] = this.optimizers[i].gradientPreCalculation(this.coefficients[i]);
            }
            gradients = this.gradientWithGiven(data, coefficients);
		} catch(err) {
			gradients = this.gradient(data);
        }
        for(var i=0; i<=this.degree; i++) {
            this.coefficients[i] = this.optimizers[i].optimize(this.iteration, this.coefficients[i], gradients[i]);
        }
        this.iteration += 1;
        for(var i=0; i<this.coefficients.length; i++) {
            if(Math.abs(this.coefficients[i]) == Infinity) {
                throw "Coefficients reach infinity.";
            }
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
        var n = data.length.toFixed(1);
        if(this.degree == 0) {
            var cons = 0.0;
            for(var i=0; i<data.length; i++) {
                cons += (1 / n) * data[i][1];
            }
            this.coefficients = [cons];
        } else if(this.degree == 1) {
            var m, b, Sx=0.0, Sy=0.0, Sxy=0.0, Sx_2=0.0;
            for(var i=0; i<n; i++) {
                Sx += data[i][0];
                Sy += data[i][1];
                Sxy += data[i][0] * data[i][1];
                Sx_2 += Math.pow(data[i][0], 2);
            }
            m = (n * Sxy - Sx * Sy) / (n * Sx_2 - Math.pow(Sx, 2));
            b = (Sy * Sx_2 - Sx * Sxy) / (n * Sx_2 - Math.pow(Sx, 2));
            this.coefficients = [m, b];
        } else if(this.degree == 2) {
            var c0, c1, c2, Sx = 0.0, Sx_2 = 0.0, Sx_3 = 0.0, Sx_4 = 0.0, Sy = 0.0, Sxx = 0.0, Sxy = 0.0, Sxx_2 = 0.0, Sx_2y = 0.0, Sx_2x_2 = 0.0;
            for(var i=0; i<n; i++) {
                Sx += data[i][0];
                Sy += data[i][1];
                Sx_2 += Math.pow(data[i][0], 2);
                Sx_3 += Math.pow(data[i][0], 3);
                Sx_4 += Math.pow(data[i][0], 4);
                Sxy += data[i][0] * data[i][1];
                Sx_2y += Math.pow(data[i][0], 2) * data[i][1];
            }
            Sxx = Sx_2 - (Math.pow(Sx, 2) / n);
            Sxy = Sxy - ((Sx * Sy) / n);
            Sxx_2 = Sx_3 - ((Sx_2 * Sx) / n);
            Sx_2y = Sx_2y - ((Sx_2 * Sy) / n);
            Sx_2x_2 = Sx_4 - (Math.pow(Sx_2, 2) / n);
            c0 = ((Sx_2y * Sxx) - (Sxy * Sxx_2)) / ((Sxx * Sx_2x_2) - Math.pow(Sxx_2, 2));
            c1 = ((Sxy * Sx_2x_2) - (Sx_2y * Sxx_2)) / ((Sxx * Sx_2x_2) - Math.pow(Sxx_2, 2));
            c2 = (Sy / n) - (c1 * (Sx / n)) - (c0 * (Sx_2 / n));
            this.coefficients = [c0, c1, c2];
        } else {
            if(this.degree >= data.length) {
                throw "Degree is larger than the amount of data points.";
            }
            var matrix=[], mPrecomputed=[];
            mPrecomputed.push(n)
            for(var r=1; r<((this.degree + 1) * 2 - 1); r++) {
                var tmp = 0;
                for(var i=0; i<n; i++) {
                    tmp += Math.pow(data[i][0], r);
                }
                mPrecomputed.push(tmp);
            }
            for(var row=0; row<(this.degree + 1); row++) {
                var tmp = [];
                for(var column=0; column<=(this.degree + 1); column++) {
                    tmp.push(mPrecomputed[row + column]);
                }
                if(row == 0) {
                    var tmpY=0.0;
                    for(var i=0; i<data.length; i++) {
                        tmpY += data[i][1];
                    }
                    tmp[(this.degree + 1)] = tmpY;
                } else if(row == 1) {
                    var tmpXY=0.0;
                    for(var i=0; i<data.length; i++) {
                        tmpXY += data[i][0] * data[i][1];
                    }
                    tmp[(this.degree + 1)] = tmpXY;
                } else if(row >= 2) {
                    var tmpXr=0.0;
                    for(var i=0; i<data.length; i++) {
                        tmpXr += Math.pow(data[i][0], row) * data[i][1];
                    }
                    tmp[(this.degree + 1)] = tmpXr;
                }
                matrix.push(tmp);
            }
            // Echelon-Format (Based on the pseudocode from https://rosettacode.org/wiki/Reduced_row_echelon_form)
            var rowCount=matrix.length, columnCount=matrix[0].length, lead=0;
            for(var row=0; row<rowCount; row++) {
                if(columnCount <= lead) {
                    break;
                }
                var i = row;
                while(matrix[i][lead] == 0) {
                    i += 1;
                    if(i == rowCount) {
                        i = row;
                        lead += 1;
                        if(columnCount == lead) {
                            lead -= 1;
                            break;
                        }
                    }
                }
                var tmp = matrix[i];
                matrix[i] = matrix[row];
                matrix[row] = tmp;
				tmp = matrix[row][lead];
                if(matrix[row][lead] != 0) {
                    for(var column=0; column<columnCount; column++) {
                        matrix[row][column] /= tmp;
                    }
                }
                for(var row2=0; row2<rowCount; row2++) {
                    if(row2 != row) {
						tmp = matrix[row2][lead];
                        for(var column=0; column<columnCount; column++) {
                            matrix[row2][column] -= tmp * matrix[row][column]; 
                        }
                    }
                }
                lead += 1;
            }
            this.coefficients = [];
            for(var i=this.degree; i>=0; i--) {
                this.coefficients.push(matrix[i][columnCount - 1]);
            }
        }
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
        if(this.degree == 1) {
            var n = data.length, xMean = 0.0, yMean = 0.0, Sxx = 0.0, Syy = 0.0, Sxy = 0.0;
            for(var i=0; i<n; i++) {
                xMean += (1.0 / n) * data[i][0];
                yMean += (1.0 / n) * data[i][1];
            }
            for(var i=0; i<n; i++) {
                Sxx += Math.pow(data[i][0] - xMean, 2);
                Syy += Math.pow(data[i][1] - yMean, 2);
                Sxy += (data[i][0] - xMean) * (data[i][1] - yMean);
            }
            return Sxy / (Math.sqrt(Sxx) * Math.sqrt(Syy)); 
        } else {
            var yMean = 0.0, SyMean2 = 0.0, Sequation = 0.0, coefficientsHolder = this.coefficients;
            this.bestFit(data);
            for(var i=0; i<n; i++) {
                yMean += (1.0 / n) * data[i][1];
            }
            for(var i=0; i<n; i++) {
                SyMean2 += Math.pow(data[i][1] - yMean, 2)
                Sequation += Math.pow(data[i][1] - this.predict(data[i][0]), 2);
            }
            this.coefficients = coefficientsHolder;
            return Math.sqrt(1 - (Sequation / SyMean2));
        }
        /*
        else if(this.degree == 2) {
            var n = data.length, xMean = 0.0, yMean = 0.0, x2Mean = 0.0,
                Sxx = 0.0, Sxy = 0.0, Sxx2 = 0.0, Sx2x2 = 0.0, Sx2y = 0.0,
                SyMean2 = 0.0, SyABxCx22 = 0.0,
                a = 0.0, b = 0.0, c = 0.0;
            for(var i=0; i<n; i++) {
                xMean += (1.0 / n) * data[i][0];
                x2Mean += (1.0 / n) * Math.pow(data[i][0], 2);
                yMean += (1.0 / n) * data[i][1];
            }
            for(var i=0; i<n; i++) {
                Sxx += Math.pow(data[i][0] - xMean, 2);
                Sxy += (data[i][0] - xMean) * (data[i][1] - yMean);
                Sxx2 += (data[i][0] - xMean) * (Math.pow(data[i][0], 2) - x2Mean);
                Sx2x2 += Math.pow(Math.pow(data[i][0], 2) - x2Mean, 2);
                Sx2y += (Math.pow(data[i][0], 2) - x2Mean) * (data[i][1] - yMean);
                SyMean2 += Math.pow(data[i][1] - yMean, 2)
            }
            b = (Sxy * Sx2x2 - Sx2y * Sxx2) / (Sxx * Sx2x2 - Math.pow(Sxx2, 2));
            c = (Sx2y * Sxx - Sxy * Sxx2) / (Sxx * Sx2x2 - Math.pow(Sxx2, 2));
            a = yMean - b * xMean - c * x2Mean;
            for(var i=0; i<n; i++) {
                SyABxCx22 += Math.pow(data[i][1] - (a + b * data[i][0] + c * Math.pow(data[i][0], 2)), 2);
            }
            return Math.sqrt(1 - (SyABxCx22 / SyMean2));
        }
        */
    }
}