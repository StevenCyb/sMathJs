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
	 * Calculate quantile of random number.
	 * Parameter:
	 * lambda: Distribution lambda
	 * x: To with calculate the probability density
     * stepSize: Step-size for this calculation (optional, default:0.01)
	 * Return:
	 * Quantile for x
	 */
	static quantile(lambda, x, stepSize=0.01) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(stepSize);
		return -1 * (Math.log(1 - this.cdf(lambda, x, stepSize)) / lambda);
	}

	/*
	 * Calculate the coefficient of variation.
	 * Parameter:
	 * sd: Standard deviation of distribution
	 * lambda: Distribution lambda
	 * x: To with calculate the probability density
	 * Return:
	 * Coefficient for x
	 */
    static variationCoefficient(sd, lambda, x) {
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(x);
        return Math.sqrt(Math.pow(sd, 2) * x) / this.expectedValue(lambda);
    }

	/*
	 * Calculate the standard deviation.
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
	 * Calculate the expected value.
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
	 * Calculate the mean.
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
	 * Calculate the median.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Median
	 */
    static median(lambda) {
        SMathJsUtils.isValidNumber(lambda);
        return Math.log(2) / lambda;
	}
	
	/*
	 * Return the mode of exponential distribution.
	 * Return:
	 * Always zero
	 */
	static mode() {
		return 0;
	}

	/*
	 * Calculate the variance.
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
	 * Get the skewness of this distribution.
	 * Return:
	 * Always 2
	 */
	static skewness() {
		return 2;
	}

	/*
	 * Get the kurtosis of this distribution.
	 * Return:
	 * Always 6
	 */
	static kurtosis() {
		return 6
	}

	/*
	 * Calculate the entropy.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Entropy
	 */
	static entropy(lambda) {
		SMathJsUtils.isValidNumber(lambda);
		return 1 - Math.log(lambda);
	}
	
	/*
	 * Calculate the moment-generating function.
	 * Parameter:
	 * lambda: Distribution lambda
	 * t: Fixed vector
	 * Return:
	 * MGF for t
	 */
	static mgf(lambda, t) {
		SMathJsUtils.isValidNumber(lambda);
		SMathJsUtils.isValidNumber(t);
		if(t >= lambda) {
			return NaN;
		}
		return lambda / (lambda - t);
	}
	
	/*
	 * Calculate the fisher information.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Fisher information
	 */
	static fisherInformation(lambda) {
		SMathJsUtils.isValidNumber(lambda);
		return 1 / Math.pow(lambda, 2);
	}
	
	/*
	 * Calculate the Kullback-Leibler divergence.
	 * Parameter:
	 * lambda1: Lambda of first distribution
	 * lambda2: Lambda of second distribution
	 * Return:
	 * Kullback-Leibler divergence
	 */
	static kld(lambda1, lambda2) {
		SMathJsUtils.isValidNumber(lambda1);
		SMathJsUtils.isValidNumber(lambda2);
		return Math.log(lambda2 / lambda1) + (lambda1 / lambda2) - 1;
	}
}