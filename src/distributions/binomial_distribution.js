class BinomialDistribution {
	/*
	 * Probability density for exactly k `P(X = x)`.
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
	 * Cumulative probability for less than k `P(X < x)`.
	 * Parameter:
	 * p: Percentage
	 * n: Sample-size
	 * k1: From position k
	 * k2: To position k
	 * Return:
	 * Probability less than k
	 */
    static cumulativeProbabilityBelow(p, n, k1, k2) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(p);
        SMathJsUtils.isValidNumber(k1);
        SMathJsUtils.isValidNumber(k2);
        var result = 0;
        for(var i = k1; i <= k2; i++ ) {
            result += this.pdf(p, n, i);
        }
        return result;
    }

	/*
	 * Cumulative probability for less than k(included) `P(X <= x)`.
	 * Parameter:
	 * p: Percentage
	 * n: Sample-size
	 * k1: From position k
	 * k2: To position k
	 * Return:
	 * Probability less than k(included)
	 */
    static cumulativeProbabilityBelowEqual(p, n, k1, k2) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(p);
        SMathJsUtils.isValidNumber(k1);
        SMathJsUtils.isValidNumber(k2);
        var result = 0;
        for(var i = k1; i <= k2; i++ ) {
            result += this.pdf(p, n, i);
        }
        return result;
    }

	/*
	 * Cumulative probability for above k`(X > x)`.
	 * Parameter:
	 * p: Percentage
	 * n: Sample-size
	 * k1: From position k
	 * k2: To position k
	 * Return:
	 * Probability above k 
	 */
    static cumulativeProbabilityAbove(p, n, k1, k2) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(p);
        SMathJsUtils.isValidNumber(k1);
        SMathJsUtils.isValidNumber(k2);
        return 1 - this.cumulativeProbabilityBelowEqual(p, n, k1, k2);
    }

	/*
	 * Cumulative probability for above k(included) `(X >= x)`.
	 * Parameter:
	 * p: Percentage
	 * n: Sample-size
	 * k1: From position k
	 * k2: To position k
	 * Return:
	 * Probability above k(included)
	 */
    static cumulativeProbabilityAboveEqual(p, n, k1, k2) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(p);
        SMathJsUtils.isValidNumber(k1);
        SMathJsUtils.isValidNumber(k2);
        return 1 - this.cumulativeProbabilityBelow(p, n, k1, k2);
    }

	/*
	 * Cumulative probability between k1(included) and k2(included) `P(k1 <= X => k2)`.
	 * Parameter:
	 * p: Percentage
	 * n: Sample-size
	 * k1: From position k
	 * k2: To position k
	 * Return:
	 * Probability between k1(included) and k2(included)
	 */
    static cumulativeProbabilityInner(p, n, k1, k2) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(p);
        SMathJsUtils.isValidNumber(k1);
        SMathJsUtils.isValidNumber(k2);
        return this.cumulativeProbabilityBelowEqual(p, n, k1, k2) - this.cumulativeProbabilityBelow(p, n, k1, k2);
    }

	/*
	 * Cumulative probability excluding all between k1 and k2 `P(k1 >= X =< k2)`.
	 * Parameter:
	 * p: Percentage
	 * n: Sample-size
	 * k1: From position k
	 * k2: To position k
	 * Return:
	 * Probability excluding all between k1(included) and k2(included)
	 */
    static cumulativeProbabilityOuter(p, n, k1, k2) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(p);
        SMathJsUtils.isValidNumber(k1);
        SMathJsUtils.isValidNumber(k2);
        return 1 - this.cumulativeProbabilityInner(p, n, k1, k2);
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
	 * Calculate the expected value `E` by sample-size and probability.
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