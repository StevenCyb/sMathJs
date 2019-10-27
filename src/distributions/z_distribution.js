class ZDistribution {
	/*
	 * Calculate the probability from x1 to x2.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x: Value for which the PDF is calculated
	 * Return:
	 * Probability for x1 to x2
	 */
    static pdf(mean, sd, x) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(x);
        return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, -0.5 * Math.pow((x - mean) / sd, 2));
    }

	/*
	 * Calculate the normal PDF.
	 * Parameter:
	 * x: Value for which the PDF is calculated
	 * stepSize: Step-size for this calculation (optional, default: 0.1)
	 * Return:
	 * PDF for x
	 */
    static normalPdf(x) {
        SMathJsUtils.isValidNumber(x);
		return (1 / (Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, -0.5 * Math.pow((x), 2));
    }

	/*
	 * Calculate the CDF from x1 to x2.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x1: Value from which calculate the PDF
	 * x2: Value to which calculate the PDF
	 * stepSize: Step-size for this calculation (optional, default:0.001)
	 * Return:
	 * CDF for x
	 */
    static cdf(mean, sd, x1, x2, stepSize=0.001) {
		SMathJsUtils.isValidNumber(mean);
		SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(x1);
        SMathJsUtils.isValidNumber(x2);
        SMathJsUtils.isValidNumber(stepSize);
		var area = 0.0;
		for (var i=parseFloat(x1); i<=parseFloat(x2); i+=stepSize) { 
			var l = this.pdf(mean, sd, i),
				h = this.pdf(mean, sd, i + stepSize);
			area += ((l + h) / 2) * stepSize;
		}
		return area;
    }

	/*
	 * Get the min. and max. by mean and standard deviation (dirty solution).
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * maxMulti: Multiply factor (optional, default: 5)
	 * Return:
	 * Probability for x1 to x2
	 */
    static simpleMinMax(mean, sd, maxMulti=5) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(maxMulti);
        return [mean - (sd * maxMulti), mean + (sd * maxMulti)];
    }
	
    /*
    * Calculate the standard deviation from an array.
    * Parameter:
    * mean: Mean of array
    * arr: Array for which the variance should be calculated
    * Return:
    * SD
    */
	static standardDeviationFromArray (mean, arr) {
		return SMathJsUtils.standardDeviationFromArray (mean, arr);
	}

	/*
	 * Calculate the margin of error (MOE).
	 * Parameter:
	 * sd: Standard deviation of distribution 
	 * n: Sample-Size of distribution
	 * z: Z for which to calculate
	 * Return:
	 * MOE
	 */
    static marginOfError(sd, n, z) {
        SMathJsUtils.isValidNumber(z);
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(sd);
        return z * this.standardErrorOfMean(sd, n);
	}

	/*
	 * Calculate the standard error of mean (SEM).
	 * Parameter:
	 * sd: Standard deviation of distribution 
	 * n: Sample-Size of distribution
	 * Return:
	 * SEM
	 */
    static standardErrorOfMean(sd, n) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(sd);
        return (sd / Math.sqrt(n));
    }

	/*
	 * Calculate the standard error of two means (SEMs).
	 * Parameter:
	 * sd1: Standard deviation of distribution of dataset 1
	 * n1: Sample-Size of distribution of datasset 1
	 * sd2: Standard deviation of distribution of dataset 2
	 * n2: Sample-Size of distribution of datasset 2
	 * Return:
	 * SEMs
	 */
    static standardOfErrorOfTwoMeans(sd1, n1, sd2, n2) {
        SMathJsUtils.isValidNumber(n1);
        SMathJsUtils.isValidNumber(sd1);
        SMathJsUtils.isValidNumber(n2);
        SMathJsUtils.isValidNumber(sd2);
        return Math.sqrt((Math.pow(sd1, 2)  / n1) + (Math.pow(sd2, 2)  / n2));
    }
    
	/*
	 * Calculate the confidence interval with known standard deviation.
	 * Parameter:
	 * Mean: Mean of distribution
	 * sd: Standard deviation of distribution 
	 * n: Sample-Size of distribution
	 * z: Z for which to calculate
	 * Return:
	 * [bottom_ce, top_ce]
	 */
    static confidenceIntervalWithKnownSD(mean, sd, n, z) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(z);
        var cl = z * (sd / Math.sqrt(n));
        return [mean - cl, mean + cl];
    }

	/*
	 * Calculate z-score for x.
	 * Parameter:
	 * Mean: Mean of distribution
	 * sd: Standard deviation of distribution 
	 * x: For which to calculate the z-score
	 * Return:
	 * Z-Score
	 */
    static zScore(mean, sd, x) {
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        return (x - mean) / sd;
    }
}