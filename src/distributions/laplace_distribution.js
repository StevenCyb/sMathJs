class LaplaceDistribution {
    // mean = location parameter
    // 
	/*
	 * Calculate the probability for x.
	 * Parameter:
	 * mean: Location parameter
	 * b: Scale parameter (diversity)
	 * x: To with calculate the probability density
	 * Return:
	 * PDF for x
	 */
    static pdf(mean, b, x) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(b);
        SMathJsUtils.isValidNumber(x);
        if(b <= 0.0) {
            throw "b must be greater than 0.";
        }
        return (1 / (2 * b)) * Math.exp(-1 * (Math.abs(x - mean) / b));
    }

	/*
	 * Calculate the CDF to x.
	 * Parameter:
	 * mean: Location parameter
	 * b: Scale parameter (diversity)
	 * x: To with calculate the probability density
	 * Return:
	 * CDF for x
	 */
    static cdf(mean, b, x) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(b);
        SMathJsUtils.isValidNumber(x);
        if(x <= mean) {
            return 0.5 * Math.exp((x - mean) / b);
        }
        if(x > mean) {
            return 1 - (0.5 * Math.exp(-1 * ((x - mean) / b)));
        }
    }

	/*
	 * Calculate the quantile.
	 * Parameter:
	 * mean: Location parameter
	 * b: Scale parameter (diversity)
	 * x: To with calculate the probability density
	 * Return:
	 * Quantile
	 */
    static quantile(mean, b, x) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(b);
        SMathJsUtils.isValidNumber(x);
        var F = LaplaceDistribution.pdf(mean, b, x);
        if(F <= 0.5) {
            return mean + b * Math.log(2 * F);
        } else {
            return mean - b * Math.log(2 - 2 * F);
        }
    }

	/*
	 * Return the mean.
	 * Parameter:
	 * mean: Location parameter
	 * Return:
	 * Always equal to location parameter
	 */
    static mean(mean) {
        SMathJsUtils.isValidNumber(mean);
        return mean;
    }

	/*
	 * Return the median.
	 * Parameter:
	 * mean: Location parameter
	 * Return:
	 * Always equal to location parameter
	 */
    static median(mean) {
        SMathJsUtils.isValidNumber(mean);
        return mean;
    }

	/*
	 * Return the mode.
	 * Parameter:
	 * mean: Location parameter
	 * Return:
	 * Always equal to location parameter
	 */
    static mode(mean) {
        SMathJsUtils.isValidNumber(mean);
        return mean;
    }

	/*
	 * Calculate the variance.
	 * Parameter:
	 * b: Scale parameter (diversity)
	 * Return:
	 * Variance
	 */
    static variance(b) {
        SMathJsUtils.isValidNumber(b);
        return 2 * Math.pow(b, 2);
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
	 * Return the kurtosis.
	 * Return:
	 * Always 3
	 */
    static kurtosis() {
        return 3;
    }

	/*
	 * Calculate the entropy.
	 * Parameter:
	 * b: Scale parameter (diversity)
	 * Return:
	 * Entropy
	 */
    static entropy(b) {
        SMathJsUtils.isValidNumber(b);
        return Math.log(2 * b * Math.E);
    }
}