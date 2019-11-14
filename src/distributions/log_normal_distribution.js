class LogNormalDistribution {
	/*
	 * Calculate the probability for x.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x: Value for which the PDF is calculated
	 * Return:
	 * PDF for x
	 */
    static pdf(mean, sd, x) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(x);
        if(sd <= 0.0) {
            throw "Standard deviation must be greater than zero.";
        }
        return (1 / (x * sd * Math.sqrt(2 * Math.PI))) * 
        Math.exp(-1 * (Math.pow(Math.log(x) - mean, 2) / (2 * Math.pow(sd, 2))));
    }

	/*
	 * Calculate the CDF to x.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x: Value for which the PDF is calculated
	 * Return:
	 * CDF for x
	 */
    static cdf(mean, sd, x) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(x);
        if(sd <= 0.0) {
            throw "Standard deviation must be greater than zero.";
        }
        var erf = function(x) {
            if(0 == x) {
                return 0;
            }
            return Math.sqrt(1 - Math.exp((4 / Math.PI + 0.147 * x * x) / (1 + 0.147 * x * x) * (x * -x))) * (x > 0? 1:-1);
        };
        return 0.5 + (0.5 * erf((Math.log(x) - mean) / (Math.sqrt(2) * sd)));
    }

	/*
	 * Calculate the mean.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * Return:
	 * Mean
	 */
    static mean(mean, sd) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        return Math.exp(mean + (Math.pow(sd, 2) / 2));
    }

	/*
	 * Calculate the median.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * Return:
	 * Median
	 */
    static median(mean, sd) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        return Math.exp(mean);
    }

	/*
	 * Calculate the mode.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * Return:
	 * Mode
	 */
    static mode(mean, sd) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        return Math.exp(mean - Math.pow(sd, 2));
    }

	/*
	 * Calculate the variance.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * Return:
	 * Variance
	 */
    static variance(mean, sd) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        return (Math.exp(Math.pow(sd, 2)) - 1) * Math.exp(2 * mean + Math.pow(sd, 2));
    }

	/*
	 * Calculate the skewness.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * Return:
	 * Skewness
	 */
    static skewness(mean, sd) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        return (Math.pow(Math.E, Math.pow(sd, 2)) + 2) * Math.sqrt(Math.pow(Math.E, Math.pow(sd, 2)) - 1);
    }

	/*
	 * Calculate the kurtosis.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * Return:
	 * Kurtosis
	 */
    static kurtosis(mean, sd) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        return Math.exp(4 * Math.pow(sd, 2)) + 2 * Math.exp(3 * Math.pow(sd, 2)) + 3 * Math.exp(2 * Math.pow(sd, 2)) - 6;
    }

	/*
	 * Calculate the entropy.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * Return:
	 * Entropy
	 */
    static entropy(mean, sd) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        return Math.log2(sd * Math.pow(Math.E, mean + 0.5) * Math.sqrt(2 * Math.PI));
    }
}