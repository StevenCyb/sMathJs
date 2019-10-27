class FDistribution {
	/*
	 * Calculate the probability to x.
	 * Parameter:
	 * degreeOfFreedom1: Degree of Freedom of first population
	 * degreeOfFreedom2: Degree of Freedom of second population
	 * x: Value to which calculate the PDF
     * stepSize: Step-size for this calculation (optional, default:0.1)
     * integralUpperBound: Upper bound for gamma integral because js can not use infinity (optional, default:100)
	 * Return:
	 * Probability to x
	 */
    static pdf(degreeOfFreedom1, degreeOfFreedom2, x, stepSize=0.1, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(degreeOfFreedom1);
        SMathJsUtils.isValidNumber(degreeOfFreedom2);
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralUpperBound);
        if(x < 0) {
            return 0;
        }
        var gammaIntegral = function(z, stepSize=0.1, integralUpperBound=100) {
                SMathJsUtils.isValidNumber(z);
                SMathJsUtils.isValidNumber(stepSize);
                SMathJsUtils.isValidNumber(integralUpperBound);
                var area = 0.0,
                    eulerGammaFunction = function(z, x) {
                        SMathJsUtils.isValidNumber(z);
                        SMathJsUtils.isValidNumber(x);
                        return Math.pow(x, z - 1) * Math.pow(Math.E, -1 * x);
                    };
                for (var i = 0.0; i <= integralUpperBound; i += stepSize) {
                    var l = eulerGammaFunction(z, i),
                        h = eulerGammaFunction(z, i + stepSize);
                    area += ((l + h) / 2) * stepSize;
                }
                return area;
            };
        return (gammaIntegral((degreeOfFreedom1 + degreeOfFreedom2) / 2, stepSize, integralUpperBound)* Math.pow(degreeOfFreedom1 / degreeOfFreedom2, degreeOfFreedom1 / 2) * Math.pow(x, (degreeOfFreedom1 / 2) - 1)) / (gammaIntegral(degreeOfFreedom1 / 2, stepSize, integralUpperBound) * gammaIntegral(degreeOfFreedom2 / 2, stepSize, integralUpperBound) * Math.pow(1 + (degreeOfFreedom1 / degreeOfFreedom2) * x, (degreeOfFreedom1 + degreeOfFreedom2) / 2));
    }

	/*
	 * Calculate the CDF from x1 to x2.
	 * Parameter:
	 * mean: Mean of distribution
	 * degreeOfFreedom1: Degree of Freedom of first population
	 * degreeOfFreedom2: Degree of Freedom of second population
	 * x: Value to which calculate the PDF
	 * stepSize: Step-size for this calculation (optional, default:0.001)
     * integralUpperBound: Upper bound for gamma integral because js can not use infinity (optional, default:100)
	 * Return:
	 * CDF for x
	 */
    static cdf(degreeOfFreedom1, degreeOfFreedom2, x, stepSize=0.1, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(degreeOfFreedom1);
        SMathJsUtils.isValidNumber(degreeOfFreedom2);
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralUpperBound);
		var area = 0.0;
		for (var i=0.0; i<=x; i+=stepSize) { 
            var l = this.pdf(degreeOfFreedom1, degreeOfFreedom2, i, stepSize, integralUpperBound),
                h = this.pdf(degreeOfFreedom1, degreeOfFreedom2, i + stepSize, stepSize, integralUpperBound);
			area += ((l + h) / 2) * stepSize;
		}
		return area;
    }

    /*
    * Calculate the distribution mean for a given degree of freedom.
    * Parameter:
    * degreeOfFreedom: Degree of Freedom of population
    * Return:
    * Mean 
    */
    static mean(degreeOfFreedom) {
        SMathJsUtils.isValidNumber(degreeOfFreedom);
        if(degreeOfFreedom > 2) {
            return degreeOfFreedom / (degreeOfFreedom - 2);
        }
        return NaN;
    }

    /*
    * Calculate the degree of freedom.
    * Parameter:
    * n: Sample-size 
    * Return:
    * DOF
    */
    static degreeOfFreedom(n) {
        SMathJsUtils.isValidNumber(n);
        if(n < 2) {
            return NaN;
        } 
        return n - 1;
    }

    /*
    * Calculate the distribution mode by given degree of freedoms.
    * Parameter:
    * degreeOfFreedom1: Degree of Freedom of first population
    * degreeOfFreedom2: Degree of Freedom of second population
    * Return:
    * Mode 
    */
    static mode(degreeOfFreedom1, degreeOfFreedom2) {
        SMathJsUtils.isValidNumber(degreeOfFreedom1);
        SMathJsUtils.isValidNumber(degreeOfFreedom2);
        if(degreeOfFreedom1 > 2) {
            return ((degreeOfFreedom1 - 2) / degreeOfFreedom1) * (degreeOfFreedom2 / (degreeOfFreedom2 + 2));
        }
        return NaN;
    }

    /*
    * Calculate the variance by given degree of freedoms.
    * Parameter:
    * degreeOfFreedom1: Degree of Freedom of first population
    * degreeOfFreedom2: Degree of Freedom of second population
    * Return:
    * Variance 
    */
    static varianceFromDoF(degreeOfFreedom1, degreeOfFreedom2) {
        SMathJsUtils.isValidNumber(degreeOfFreedom1);
        SMathJsUtils.isValidNumber(degreeOfFreedom2);
        if(degreeOfFreedom2 > 4) {
            return (2 * Math.pow(degreeOfFreedom2, 2) * (degreeOfFreedom1 + degreeOfFreedom2 - 2)) / (degreeOfFreedom1 * Math.pow(degreeOfFreedom2 - 2, 2) * (degreeOfFreedom2 - 4));
        }
        return NaN;
    }

    /*
    * Calculate the skewness by given degree of freedoms.
    * Parameter:
    * degreeOfFreedom1: Degree of Freedom of first population
    * degreeOfFreedom2: Degree of Freedom of second population
    * Return:
    * Skewness 
    */
    static skewness(degreeOfFreedom1, degreeOfFreedom2) {
        SMathJsUtils.isValidNumber(degreeOfFreedom1);
        SMathJsUtils.isValidNumber(degreeOfFreedom2);
        if(degreeOfFreedom2 > 6) {
            return ((2 * degreeOfFreedom1 + degreeOfFreedom2 - 2) * Math.sqrt(8 * (degreeOfFreedom2 - 4))) / ((degreeOfFreedom2 - 6) * Math.sqrt(degreeOfFreedom1 * (degreeOfFreedom1 + degreeOfFreedom2 - 2)));
        }
        return NaN;
    }

    /*
    * Calculation of the F-Ratio from given sample variances.
    * Parameter:
    * sampleVariance1: First sample variance
    * sampleVariance2: Second sample variance
    * Return:
    * F-Ratio 
    */
    static fRatio(sampleVariance1, sampleVariance2) {
        SMathJsUtils.isValidNumber(sampleVariance1);
        SMathJsUtils.isValidNumber(sampleVariance2);
        if(sampleVariance1 >= sampleVariance2) {
            return Math.pow(sampleVariance1, 2) / Math.pow(sampleVariance2, 2);
        } else {
            return Math.pow(sampleVariance2, 2) / Math.pow(sampleVariance1, 2);
        }        
    }
}