class WeibullDistribution {
	/*
	 * Calculate the probability for x.
	 * Parameter:
	 * lambda: Distribution lambda
	 * k: Modulus (k<1 => Failure rate decreases, k=1 => Failure rate is constant, k>1 => Failure rate increases)
	 * x: To with calculate the probability density
	 * Return:
	 * PDF for x
	 */
    static pdf(lambda, k, x) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(x);
        if(lambda < 0.0) {
            throw "Lambda must be greater than 0.";
        }
        if(k < 0.0) {
            throw "k must be greater than 0.";
        }
        if(x < 0) {
            return 0;
        }
        return (k / lambda) * Math.pow(x / lambda, k - 1) * Math.pow(Math.E, -1 * Math.pow(x / lambda, k));
    }

	/*
	 * Calculate the CDF to x.
	 * Parameter:
	 * lambda: Distribution lambda
	 * k: Modulus (k<1 => Failure rate decreases, k=1 => Failure rate is constant, k>1 => Failure rate increases)
	 * x: To with calculate the probability density
	 * Return:
	 * CDF for x
	 */
    static cdf(lambda, k, x) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(x);
        if(lambda < 0.0) {
            throw "Lambda must be greater than 0.";
        }
        if(k < 0.0) {
            throw "k must be greater than 0.";
        }
        if(x < 0) {
            return 0;
        }
        return 1 - Math.pow(Math.E, -1 * Math.pow(x / lambda, k));
    }

	/*
	 * Calculate the mean.
	 * Parameter:
	 * lambda: Distribution lambda
	 * k: Modulus (k<1 => Failure rate decreases, k=1 => Failure rate is constant, k>1 => Failure rate increases)
	 * stepSize: Step-size for this calculation (optional, default:0.01)
     * integralLowerBound: Lower bound for integral because js can not use infinity (optional, default:0)
     * integralUpperBound: Upper bound for integral because js can not use infinity (optional, default:100)
	 * Return:
	 * Mean
	 */
    static mean(lambda, k, stepSize=0.01, integralLowerBound=0, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralLowerBound);
        SMathJsUtils.isValidNumber(integralUpperBound);
        return lambda * GammaDistribution.eulerGammaFunction(1 + (1 / k), stepSize, integralLowerBound, integralUpperBound);
    }

	/*
	 * Calculate the median.
	 * Parameter:
	 * lambda: Distribution lambda
	 * k: Modulus (k<1 => Failure rate decreases, k=1 => Failure rate is constant, k>1 => Failure rate increases)
	 * Return:
	 * Median
	 */
    static median(lambda, k) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(k);
        return lambda * Math.pow(Math.log(2), 1 / k);
    }

	/*
	 * Calculate the mode.
	 * Parameter:
	 * lambda: Distribution lambda
	 * k: Modulus (k<1 => Failure rate decreases, k=1 => Failure rate is constant, k>1 => Failure rate increases)
	 * Return:
	 * Mode
	 */
    static mode(lambda, k) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(k);
        if(k <= 1) {
            return 0;
        }
        return lambda * Math.pow((k - 1) / k, 1 / k);
    }

	/*
	 * Calculate the inflexion point.
	 * Parameter:
	 * k: Modulus (k<1 => Failure rate decreases, k=1 => Failure rate is constant, k>1 => Failure rate increases)
	 * Return:
	 * Inflexion point
	 */
    static inflexionPoint(k) {
        SMathJsUtils.isValidNumber(k);
        if(k <= 1.0) {
            throw "k must be greater than 1 to calculate the inflexion point.";
        }
        return (Math.pow(Math.E, 1 / k) - 1) / Math.pow(Math.E, 1 / k);
    }

	/*
	 * Calculate the variance.
	 * Parameter:
	 * lambda: Distribution lambda
	 * k: Modulus (k<1 => Failure rate decreases, k=1 => Failure rate is constant, k>1 => Failure rate increases)
	 * stepSize: Step-size for this calculation (optional, default:0.01)
     * integralLowerBound: Lower bound for integral because js can not use infinity (optional, default:0)
     * integralUpperBound: Upper bound for integral because js can not use infinity (optional, default:100)
	 * Return:
	 * Variance
	 */
    static variance(lambda, k, stepSize=0.01, integralLowerBound=0, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralLowerBound);
        SMathJsUtils.isValidNumber(integralUpperBound);
        return Math.pow(lambda, 2) * (GammaDistribution.eulerGammaFunction(1 + (2 / k), stepSize, integralLowerBound, integralUpperBound) - Math.pow(GammaDistribution.eulerGammaFunction(1 + (1 / k), stepSize, integralLowerBound, integralUpperBound), 2));
    }

	/*
	 * Calculate the skewness.
	 * Parameter:
	 * lambda: Distribution lambda
	 * k: Modulus (k<1 => Failure rate decreases, k=1 => Failure rate is constant, k>1 => Failure rate increases)
	 * stepSize: Step-size for this calculation (optional, default:0.01)
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution 
     * integralLowerBound: Lower bound for integral because js can not use infinity (optional, default:0)
     * integralUpperBound: Upper bound for integral because js can not use infinity (optional, default:100)
	 * Return:
	 * Skewness
	 */
    static skewness(lambda, k, mean, sd, stepSize=0.01, integralLowerBound=0, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralLowerBound);
        SMathJsUtils.isValidNumber(integralUpperBound);
        return (GammaDistribution.eulerGammaFunction(1 + (3 / k), stepSize, integralLowerBound, integralUpperBound) * Math.pow(lambda, 3) - (3 * mean * Math.pow(sd, 2)) - Math.pow(mean, 3)) / Math.pow(sd, 3);
    }

	/*
	 * Calculate the entropy.
	 * Parameter:
	 * lambda: Distribution lambda
	 * k: Modulus (k<1 => Failure rate decreases, k=1 => Failure rate is constant, k>1 => Failure rate increases)
     * gamma: Euler–Mascheroni constant ~0.577215...
	 * Return:
	 * Entropy
	 */
    static entropy(lambda, k, gamma=0.57721566490153286060651209008240243104215933593992) { // gamma = Euler–Mascheroni constant
        SMathJsUtils.isValidNumber(lambda);
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(gamma);
        return gamma * (1 - (1 / k)) + Math.log(lambda / k) + 1;
    }
}