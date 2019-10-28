class ExponentialDistribution {
	/*
	 * Calculate the probability for x.
	 * Parameter:
	 * lambda: Distribution lambda
	 * x: To with calculate the probability density
	 * Return:
	 * PDF for x
	 */
    static pdf(lambda, x) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(x);
        if(x < 0) {
            return 0;
        }
        return lambda * Math.pow(Math.E, -1 * lambda * x);
    }

	/*
	 * Calculate the CDF to x.
	 * Parameter:
	 * lambda: Distribution lambda
	 * x: To with calculate the probability density
     * stepSize: Step-size for this calculation (optional, default:0.01)
	 * Return:
	 * CDF for x
	 */
    static cdf(lambda, x, stepSize=0.01) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(stepSize);
        var area = 0.0;
        for (var i=0; i<=x; i+=stepSize) {
            var l = this.pdf(lambda, i),
                h = this.pdf(lambda, i + stepSize);
            area += ((l + h) / 2) * stepSize;
        }
        return area;
    }

	/*
	 * Calculate the coefficient of variation by given standard deviation, lambda and x.
	 * Parameter:
	 * sd: Standard deviation of distribution
	 * lambda: Distribution lambda
	 * x: To with calculate the probability density
	 * Return:
	 * Coefficient
	 */
    static variationCoefficient(sd, lambda, x) {
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(x);
        return Math.sqrt(Math.pow(sd, 2) * x) / this.expectedValue(lambda);
    }

	/*
	 * Calculate the standard deviation by given lambda.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Standard deviation
	 */
    static standardDeviation(lambda) {
        SMathJsUtils.isValidNumber(lambda);
        return Math.sqrt(1 / Math.pow(lambda, 2));
    }

	/*
	 * Calculate the variance by given lambda.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Variance
	 */
    static variance(lambda) {
        SMathJsUtils.isValidNumber(lambda);
        return 1 / Math.pow(lambda, 2);
    }

	/*
	 * Calculate the expected value by given lambda.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Expected value
	 */
    static expectedValue(lambda) {
        SMathJsUtils.isValidNumber(lambda);
        return 1 / lambda;
    }

	/*
	 * Calculate the mean by given lambda.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Mean
	 */
    static mean(lambda) {
        SMathJsUtils.isValidNumber(lambda);
        return Math.pow(lambda, -1);
    }

	/*
	 * Calculate the median by given lambda.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Median
	 */
    static median(lambda) {
        SMathJsUtils.isValidNumber(lambda);
        return 0.69314718056 / lambda;
    }
}