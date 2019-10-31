class BinomialDistribution {
	/*
	 * Probability density for k `P(X = x)`.
	 * Parameter:
	 * p: Percentage
	 * n: Sample-size
	 * k: To to position k
	 * Return:
	 * Probability
	 */
    static pdf(p, n, k) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(p);
        SMathJsUtils.isValidNumber(k);
        return this.binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1.0 - p, n - k);
	}

	/*
	 * Cumulative probability density between k1 and k2 `P(X <= x)`.
	 * Parameter:
	 * p: Percentage
	 * n: Sample-size
	 * k1: Value from which calculate the CDF
	 * k2: Value to which calculate the CDF
	 * Return:
	 * Probability less than k(included)
	 */
    static cdf(p, n, k1, k2) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(p);
        SMathJsUtils.isValidNumber(k1);
        SMathJsUtils.isValidNumber(k2);
        var result = 0;
        for(var i=k1; i<=k2; i++) {
            result += this.pdf(p, n, i);
        }
        return result;
    }
	
	/*
	 * Calculate n over k.
	 * Parameter:
	 * n + k: Should be clear
	 * Return:
	 * Binomial coefficient
	 */
    static binomialCoefficient(n, k) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(k);
        return SMathJsUtils.faculty(n) / ((SMathJsUtils.faculty(k) * SMathJsUtils.faculty(n - k)));
    }

	/*
	 * Calculate the expected value `E`.
	 * Parameter:
	 * n: Sample-size
	 * p: Percentage
	 * Return:
	 * Expected value
	 */
    static expectedValue(p, n) {
        SMathJsUtils.isValidNumber(p);
        SMathJsUtils.isValidNumber(n);
        return n * p;
    }
}