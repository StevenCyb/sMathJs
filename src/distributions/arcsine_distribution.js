class ArcsineDistribution {
	/*
	 * Calculate the probability for x.
	 * Parameter:
	 * x: To with calculate the probability density
	 * Return:
	 * PDF for x
	 */
    static pdf(x) {
        SMathJsUtils.isValidNumber(x);
        if(x > 1.0) {
            throw "x must be less than 1.0 (x<=1.0).";
        }
        return 1 / (Math.PI * Math.sqrt(x * (1 - x)));
    }

	/*
	 * Calculate the CDF to x.
	 * Parameter:
	 * x: To with calculate the probability density
	 * Return:
	 * CDF for x
	 */
    static cdf(x) {
        SMathJsUtils.isValidNumber(x);
        if(x > 1.0) {
            throw "x must be smaller than 1.0 (x<=1.0).";
        }
        return (2 / Math.PI) * Math.asin(Math.sqrt(x));
    }

	/*
	 * Return the mean of arcsine distribution.
	 * Return:
	 * Always 1/2
	 */
    static mean() {
        return 0.5;
    }

	/*
	 * Return the median of arcsine distribution.
	 * Return:
	 * Always 1/2
	 */
    static median() {
        return 0.5;
    }

	/*
	 * Return the variance of arcsine distribution.
	 * Return:
	 * Always 1/8
	 */
    static variance() {
        return 0.125;
    }

	/*
	 * Return the skewness of arcsine distribution.
	 * Return:
	 * Always zero
	 */
    static skewness() {
        return 0;
    }

	/*
	 * Return the kurtosis of arcsine distribution.
	 * Return:
	 * Always -3/2
	 */
    static kurtosis() {
        return -1.5;
    }

	/*
	 * Return the entropy of arcsine distribution.
	 * Return:
	 * Always PI/4
	 */
    static entropy() {
        return Math.log(Math.PI / 4);
    }
}

class ArcsineBoundedDistribution {
	/*
	 * Calculate the probability for x using the shapes alpha and beta.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * x: To with calculate the probability density
	 * Return:
	 * PDF for x
	 */
    static pdf(alpha, beta, x) {
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        SMathJsUtils.isValidNumber(x);
        if(alpha > beta) {
            throw "alpha must be smaller than beta (alpha <= x <= beta).";
        }
        return 1 / (Math.PI * Math.sqrt((x - alpha) * (beta - x))); 
    }

	/*
	 * Calculate the CDF to x.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * x: To with calculate the probability density
	 * Return:
	 * CDF for x
	 */
    static cdf(alpha, beta, x) {
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        SMathJsUtils.isValidNumber(x);
        if(alpha > x) {
            throw "x must be greater than alpha (alpha <= x <= beta).";
        }
        if(beta < x) {
            throw "x must be smaller than beta (alpha <= x <= beta).";
        }
        if(alpha > beta) {
            throw "alpha must be smaller than beta (alpha <= x <= beta).";
        }
        return (2 / Math.PI) * Math.asin(Math.sqrt((x - alpha) / (beta - alpha)));
    }

	/*
	 * Calculate the mean.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * Return:
	 * Mean
	 */
    static mean(alpha, beta) {
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        return (alpha + beta) / 2;
    }

	/*
	 * Calculate the median.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * Return:
	 * Median
	 */
    static median(alpha, beta) {
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        return (alpha + beta) / 2;
    }

	/*
	 * Calculate the variance.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * Return:
	 * Variance
	 */
    static variance(alpha, beta) {
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        return 0.125 * Math.pow(beta - alpha, 2);
    }

	/*
	 * Return the skewness of arcsine distribution.
	 * Return:
	 * Always zero
	 */
    static skewness() {
        return 0;
    }

	/*
	 * Return the kurtosis of arcsine distribution.
	 * Return:
	 * Always -3/2
	 */
    static kurtosis() {
        return -1.5;
    }
}