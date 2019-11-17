class FDistribution {
	/*
	 * Calculate the probability to x.
	 * Parameter:
	 * degreeOfFreedom1: Degree of Freedom of first population
	 * degreeOfFreedom2: Degree of Freedom of second population
	 * x: Value to which calculate the PDF
     * stepSize: Step-size for this calculation (optional, default:0.1)
     * integralLowerBound: Lower bound for integral because js can not use infinity (optional, default:0)
     * integralUpperBound: Upper bound for integral because js can not use infinity (optional, default:100)
	 * Return:
	 * Probability to x
	 */
    static pdf(degreeOfFreedom1, degreeOfFreedom2, x, stepSize=0.1, integralLowerBound=0, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(degreeOfFreedom1);
        SMathJsUtils.isValidNumber(degreeOfFreedom2);
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralLowerBound);
        SMathJsUtils.isValidNumber(integralUpperBound);
        if(x < 0) {
            return 0;
        }
        return (GammaDistribution.eulerGammaFunction((degreeOfFreedom1 + degreeOfFreedom2) / 2, stepSize, integralLowerBound, integralUpperBound)* Math.pow(degreeOfFreedom1 / degreeOfFreedom2, degreeOfFreedom1 / 2) * Math.pow(x, (degreeOfFreedom1 / 2) - 1)) / (GammaDistribution.eulerGammaFunction(degreeOfFreedom1 / 2, stepSize, integralLowerBound, integralUpperBound) * GammaDistribution.eulerGammaFunction(degreeOfFreedom2 / 2, stepSize, integralLowerBound, integralUpperBound) * Math.pow(1 + (degreeOfFreedom1 / degreeOfFreedom2) * x, (degreeOfFreedom1 + degreeOfFreedom2) / 2));
    }

	/*
	 * Calculate the CDF from x1 to x2.
	 * Parameter:
	 * mean: Mean of distribution
	 * degreeOfFreedom1: Degree of Freedom of first population
	 * degreeOfFreedom2: Degree of Freedom of second population
	 * x: Value to which calculate the PDF
	 * stepSize: Step-size for this calculation (optional, default:0.001)
     * integralLowerBound: Lower bound for integral because js can not use infinity (optional, default:0)
     * integralUpperBound: Upper bound for integral because js can not use infinity (optional, default:100)
	 * Return:
	 * CDF for x
	 */
    static cdf(degreeOfFreedom1, degreeOfFreedom2, x, stepSize=0.1, integralLowerBound=0, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(degreeOfFreedom1);
        SMathJsUtils.isValidNumber(degreeOfFreedom2);
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralLowerBound);
        SMathJsUtils.isValidNumber(integralUpperBound);
		var area = 0.0;
		for (var i=0.0; i<=x; i+=stepSize) { 
            var l = this.pdf(degreeOfFreedom1, degreeOfFreedom2, i, stepSize, integralLowerBound, integralUpperBound),
                h = this.pdf(degreeOfFreedom1, degreeOfFreedom2, i + stepSize, stepSize, integralLowerBound, integralUpperBound);
			area += ((l + h) / 2) * stepSize;
		}
		return area;
    }

    /*
    * Calculate the distribution mean for a degree of freedom.
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
    * Calculate the distribution mode.
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
    * Calculate the variance.
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
    * Calculate the skewness.
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
    * Calculation of the F-Ratio from sample variances.
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