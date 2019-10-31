class GammaDistribution {
    /*
    * Calculate euler gamma density as integral from lower to upper bound.
    * Parameter:
    * z: To with calculate the density
    * stepSize: Step-size for this calculation (optional, default:0.1)
    * integralUpperBound: Upper bound for gamma integral
    * integralUpperBound: Lower bound for gamma integral
    * Return:
    * Gamma density for z
    */
    static eulerGammaFunction = function(z, stepSize, integralLowerBound, integralUpperBound) {
        SMathJsUtils.isValidNumber(z);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralUpperBound);
        var area = 0.0,
            egf = function(z, x) {
                SMathJsUtils.isValidNumber(z);
                SMathJsUtils.isValidNumber(x);
                return Math.pow(x, z - 1) * Math.pow(Math.E, -1 * x);
            };
        for (var i=integralLowerBound; i<=integralUpperBound; i+=stepSize) {
            var l = egf(z, i),
                h = egf(z, i + stepSize);
            area += ((l + h) / 2) * stepSize;
        }
        return area;
    }

	/*
	 * Calculate the probability for x.
	 * Parameter:
	 * x: To with calculate the probability density
	 * k: Shape of this distribution
	 * theta: Stretching of this distribution
     * stepSize: Step-size for this calculation (optional, default:0.01)
     * integralUpperBound: Upper bound for gamma integral because js can not use infinity (optional, default:100)
	 * Return:
	 * PDF for x
	 */
    static pdf(x, k, theta, stepSize=0.01, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(theta);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralUpperBound);
        if(x <= 0) {
            return 0;
        }
        return (1 / (this.eulerGammaFunction(k, stepSize, 0, integralUpperBound) * Math.pow(theta, k))) * Math.pow(x, k - 1) * Math.pow(Math.E, -1 * (x / theta));
    }

	/*
	 * Calculate the CDF to x.
	 * Parameter:
	 * x: To with calculate the cumulative probability density
	 * k: Shape of this distribution
	 * theta: Stretching of this distribution
     * stepSize: Step-size for this calculation (optional, default:0.01)
     * integralUpperBound: Upper bound for gamma integral because js can not use infinity (optional, default:100)
	 * Return:
	 * CDF for x
	 */
    static cdf(x, k, theta, stepSize=0.001, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(theta);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralUpperBound);
        if(x <= 0) {
            return 0;
        }
        return (1 / this.eulerGammaFunction(k, stepSize, 0, integralUpperBound)) * this.eulerGammaFunction(k, stepSize, 0, x / theta);
    }

	/*
	 * Calculate the expected value.
	 * Parameter:
	 * k: Shape of this distribution
	 * theta: Stretching of this distribution
	 * Return:
	 * Expected value
	 */
    static expectedValue(k, theta) {
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(theta);
        return k * theta;
    }

	/*
	 * Calculate the shape (k).
	 * Parameter:
	 * mean: Mean of this distribution
	 * theta: Stretching of this distribution
	 * Return:
	 * Shape (k)
	 */
    static shape(mean, theta) {
        return mean / theta;
    }

	/*
	 * Calculate the stretching (theta).
	 * Parameter:
     * variance: Variance of the distribution
	 * mean: Mean of this distribution
	 * Return:
	 * Stretching (theta)
	 */
    static stretching(variance, mean) {
        return variance / mean;
    }

	/*
	 * Calculate the mean of this distribution.
	 * Parameter:
	 * k: Shape of this distribution
	 * theta: Stretching of this distribution
	 * Return:
	 * Mean
	 */
    static mean(k, theta) {
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(theta);
        return k * theta;
    }

	/*
	 * Calculate the mode of this distribution.
	 * Parameter:
	 * k: Shape of this distribution
	 * theta: Stretching of this distribution
	 * Return:
	 * Mode
	 */
    static mode(k, theta) {
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(theta);
        if(k < 1) {
            return undefined;
        }
        return (k - 1) * theta;
    }

	/*
	 * Calculate the variance of this distribution.
	 * Parameter:
	 * k: Shape of this distribution
	 * theta: Stretching of this distribution
	 * Return:
	 * Variance
	 */
    static variance(k, theta) {
        SMathJsUtils.isValidNumber(k);
        SMathJsUtils.isValidNumber(theta);
        return k * Math.sqrt(theta, 2);
    }
    
	/*
	 * Calculate the skewness of this distribution.
	 * Parameter:
	 * k: Shape of this distribution
	 * Return:
	 * Skewness
	 */
    static skewness(k) {
        SMathJsUtils.isValidNumber(k);
        return 2 / Math.sqrt(k);
    }

	/*
	 * Calculate the kurtosis of this distribution.
	 * Parameter:
	 * k: Shape of this distribution
	 * Return:
	 * Kurtosis
	 */
    static kurtosis(k) {
        SMathJsUtils.isValidNumber(k);
        return 6 / k;
    }
}