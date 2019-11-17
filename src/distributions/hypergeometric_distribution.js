class HypergeometricDistribution {
    /*
	 * Calculate the probability mass for k.
	 * Parameter:
     * N: Size of the final population (population size)
     * K: Number of successes states in the population 
     * n: Number of draws without replacement (sample size)
	 * k: Number of observed successes states in the draws
	 * Return:
	 * PMF for k
	 */
    static pmf(N, K, n, k) {
        SMathJsUtils.isValidNumber(N);
        SMathJsUtils.isValidNumber(K);
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(k);
        return (SMathJsUtils.binomialCoefficient(K, k) * SMathJsUtils.binomialCoefficient(N - K, n - k)) / SMathJsUtils.binomialCoefficient(N, n);
    }

	/*
     * Calculate the CDF to k.
     * Equation derived from https://stattrek.com/probability-distributions/hypergeometric.aspx
	 * Parameter:
     * N: Size of the final population (population size)
     * K: Number of successes states in the population 
     * n: Number of draws without replacement (sample size)
	 * k: Number of observed successes states in the draws
	 * sumUpperBound: Upper bound for sum because js can not use infinity (optional, default:100)
	 * Return:
	 * CDF to k
	 */
    static cdf(N, K, n, k, sumUpperBound=100) {
        SMathJsUtils.isValidNumber(N);
        SMathJsUtils.isValidNumber(K);
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(k);
        var result = 0.0;
        for(var i=0; i<=k; i++) {
            result += (SMathJsUtils.binomialCoefficient(K, i) * SMathJsUtils.binomialCoefficient(N - K, n - i)) / SMathJsUtils.binomialCoefficient(N, n);
        }
        return result;
    }

	/*
	 * Calculate the mean.
	 * Parameter:
     * N: Size of the final population (population size)
     * K: Number of successes states in the population 
     * n: Number of draws without replacement (sample size)
	 * Return:
	 * Mean
	 */
    static mean(N, K, n) {
        SMathJsUtils.isValidNumber(N);
        SMathJsUtils.isValidNumber(K);
        SMathJsUtils.isValidNumber(n);
        return n * (K / N);
    }

	/*
	 * Calculate the mode.
	 * Parameter:
     * N: Size of the final population (population size)
     * K: Number of successes states in the population 
     * n: Number of draws without replacement (sample size)
	 * Return:
	 * Mode
	 */
    static mode(N, K, n) {
        SMathJsUtils.isValidNumber(N);
        SMathJsUtils.isValidNumber(K);
        SMathJsUtils.isValidNumber(n);
        return [(((n + 1) * (K + 1)) / (N + 2)) - 1, ((n + 1) * (K + 1)) / (N + 2)];
    }

	/*
	 * Calculate the variance.
	 * Parameter:
     * N: Size of the final population (population size)
     * K: Number of successes states in the population 
     * n: Number of draws without replacement (sample size)
	 * Return:
	 * Variance
	 */
    static variance(N, K, n) {
        SMathJsUtils.isValidNumber(N);
        SMathJsUtils.isValidNumber(K);
        SMathJsUtils.isValidNumber(n);
        return n * (K / N) * ((N - K) / N) * ((N - n) / (N - 1));
    }

	/*
	 * Calculate the skewness.
	 * Parameter:
     * N: Size of the final population (population size)
     * K: Number of successes states in the population 
     * n: Number of draws without replacement (sample size)
	 * Return:
	 * Skewness
	 */
    static skewness(N, K, n) {
        SMathJsUtils.isValidNumber(N);
        SMathJsUtils.isValidNumber(K);
        SMathJsUtils.isValidNumber(n);
        return ((N - 2 * K) * Math.pow(N - 1, 0.5) * (N - 2 * n)) / (Math.pow(n * K * (N - K) * (N - n), 0.5) * (N - 2));
    }

	/*
	 * Calculate the kurtosis.
	 * Parameter:
     * N: Size of the final population (population size)
     * K: Number of successes states in the population 
     * n: Number of draws without replacement (sample size)
	 * Return:
	 * Kurtosis
	 */
    static kurtosis(N, K, n) {
        SMathJsUtils.isValidNumber(N);
        SMathJsUtils.isValidNumber(K);
        SMathJsUtils.isValidNumber(n);
        return (1 / (n * K * (N - K) * (N - n) * (N - 2) * (N - 3))) * ((N - 1) * Math.pow(N, 2) * (N * (N + 1) - 6 * K * (N - K) - 6 * n * (N - n)) + 6 * n * K * (N - K) * (N - n) * (5 * N - 6));
    }
}