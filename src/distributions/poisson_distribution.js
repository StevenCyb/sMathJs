class PoissonDistribution {
	/*
	 * Calculate the probability mass function for k.
	 * Parameter:
	 * lambda: Avg. events per interval
	 * k: To with calculate the PMF
	 * Return:
	 * PMF for k
	 */
    static pmf(lambda, k) { 
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(k);
        return (Math.pow(lambda, k) * Math.pow(Math.E, -1 * lambda)) / SMathJsUtils.faculty(k);
    }

	/*
	 * Calculate the CDF to k.
	 * Parameter:
	 * lambda: Distribution lambda
	 * k: To with calculate the probability density
     * stepSize: Step-size for this calculation (optional, default:0.01)
	 * Return:
	 * CDF for k
	 */
    static cdf(lambda, k) { 
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(k);
		var sum = 0.0;
		for(var i=0; i<=k; i++) {
			sum += Math.pow(lambda, i) / SMathJsUtils.faculty(i);
		}
		return Math.pow(Math.E, -1 * lambda) * sum;
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
        return lambda;
    }

	/*
	 * Calculate the median.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * ~Median
	 */
    static median(lambda) {
        SMathJsUtils.isValidNumber(lambda);
        return lambda + (1 / 3) - (0.02 / lambda);
    }

	/*
	 * Calculate the mode.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Mode
	 */
    static mode(lambda) {
        SMathJsUtils.isValidNumber(lambda);
        return [lambda - 1, lambda];
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
        return lambda;
    }

	/*
	 * Calculate the skewness.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Skewness
	 */
    static skewness(lambda) {
        SMathJsUtils.isValidNumber(lambda);
        return Math.pow(lambda, -0.5);
    }

	/*
	 * Calculate the kurtosis.
	 * Parameter:
	 * lambda: Distribution lambda
	 * Return:
	 * Kurtosis
	 */
    static kurtosis(lambda) {
        SMathJsUtils.isValidNumber(lambda);
        return Math.pow(lambda, -1);
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
        return Math.exp(lambda * (Math.pow(Math.E, t) - 1));
    }

	/*
	 * Calculate the probability-generating function.
	 * Parameter:
	 * lambda: Distribution lambda
	 * z: Complex numbers
	 * Return:
	 * PGF for z
	 */
    static pgf(lambda, z) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(t);
        if(Math.abs(z) > 1) {
            return NaN;
        }
        return Math.exp(lambda * (z - 1));
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
		return 1 / lambda;
	}
}