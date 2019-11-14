class UniformDistribution{
	/*
	 * Calculate the probability for x.
	 * Parameter:
	 * a: Minimum value
	 * b: Maximum value
	 * x: To with calculate the probability density
	 * Return:
	 * PDF for x
	 */
    static pdf(a, b, x) {
        SMathJsUtils.isValidNumber(a);
        SMathJsUtils.isValidNumber(b);
        SMathJsUtils.isValidNumber(x);
        if(a>=b) {
            throw "a must be smaller than b.";
        }
        if(x >= a && x <= b) {
            return 1 / (b - a);
        } else {
            return 0;
        }
    }
    
	/*
	 * Calculate the CDF to x.
	 * Parameter:
	 * a: Minimum value
	 * b: Maximum value
	 * x: To with calculate the probability density
	 * Return:
	 * CDF to x
	 */
    static cdf(a, b, x) {
        SMathJsUtils.isValidNumber(a);
        SMathJsUtils.isValidNumber(b);
        SMathJsUtils.isValidNumber(x);
        if(a>=b) {
            throw "a must be smaller than b.";
        }
        if(x < a) {
            return 0;
        } else if(x >= b) {
            return 1;
        } else {
            return (x - a) / (b - a);
        }
    }

	/*
	 * Calculate the mean.
	 * Parameter:
	 * a: Minimum value
	 * b: Maximum value
	 * Return:
	 * Mean
	 */
    static mean(a, b) {
        SMathJsUtils.isValidNumber(a);
        SMathJsUtils.isValidNumber(b);
        return 0.5 * (a + b);
    }

	/*
	 * Calculate the median.
	 * Parameter:
	 * a: Minimum value
	 * b: Maximum value
	 * Return:
	 * Median
	 */
    static median(a, b) {
        SMathJsUtils.isValidNumber(a);
        SMathJsUtils.isValidNumber(b);
        return 0.5 * (a + b);
    }

	/*
	 * Calculate the variance.
	 * Parameter:
	 * a: Minimum value
	 * b: Maximum value
	 * Return:
	 * Variance
	 */
    static variance(a, b) {
        SMathJsUtils.isValidNumber(a);
        SMathJsUtils.isValidNumber(b);
        return (1 / 12) * Math.pow(b - a, 2);
    }

	/*
	 * Return the skewness.
	 * Return:
	 * Always zero
	 */
    static skewness() {
        return 0;
    }

	/*
	 * Return the skewness.
	 * Return:
	 * Always -1.2
	 */
    static kurtosis() {
        return -1.2;
    }

	/*
	 * Calculate the entropy.
	 * Parameter:
	 * a: Minimum value
	 * b: Maximum value
	 * Return:
	 * Entropy
	 */
    static entropy(a, b) {
        SMathJsUtils.isValidNumber(a);
        SMathJsUtils.isValidNumber(b);
        return Math.ln(b - a);
    }
}