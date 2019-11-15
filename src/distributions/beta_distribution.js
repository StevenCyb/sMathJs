class BetaDistribution {
	/*
	 * Calculate the probability for x using the shapes alpha and beta.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * x: To with calculate the probability density
     * stepSize: Step-size for this calculation (optional, default:0.01)
     * integralLowerBound: Lower bound for gamma integral because js can not use infinity (optional, default:0)
     * integralUpperBound: Upper bound for gamma integral because js can not use infinity (optional, default:100)
	 * Return:
	 * PDF for x
	 */
    static pdf(alpha, beta, x, stepSize=0.01, integralLowerBound=0, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(integralLowerBound);
        SMathJsUtils.isValidNumber(integralUpperBound);
        if(alpha < 1.0 || beta < 1.0) {
            throw "For alpha or beta smaller 1.0 use the Arcsine Distribution.";
        }
        var betaFunction = function(alpha, beta, stepSize, integralUpperBound) {
            return (GammaDistribution.eulerGammaFunction(alpha, stepSize, integralLowerBound, integralUpperBound) * GammaDistribution.eulerGammaFunction(beta, stepSize, integralLowerBound, integralUpperBound)) / GammaDistribution.eulerGammaFunction(alpha + beta, stepSize, integralLowerBound, integralUpperBound);
        };
        return (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) / betaFunction(alpha, beta, stepSize, integralUpperBound);
    }

	/*
	 * Calculate the CDF to x.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * x: To with calculate the probability density
     * stepSize: Step-size for this calculation (optional, default:0.01)
	 * Return:
	 * CDF for x
	 */
    static cdf(alpha, beta, x, stepSize=0.01) {
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        SMathJsUtils.isValidNumber(x);
        if(alpha < 1.0 || beta < 1.0) {
            throw "For alpha or beta smaller 1.0 use the Arcsine Distribution.";
        }
        var ibf = function(alpha, beta, x, stepSize) { // Incomplete Beta Function
                var area = 0.0;
                for (var t=0; t<=x; t+=stepSize) {
                    var l = Math.pow(t, alpha - 1) * Math.pow(1 - t, beta - 1),
                        h = Math.pow(t, alpha - 1) * Math.pow(1 - t, beta - 1);
                    area += ((l + h) / 2) * stepSize;
                }
                return area;
            },
            cbf = function(x, y, stepSize) { // Complete Beta Function
                var area = 0.0;
                for (var t=0; t<=1.0; t+=stepSize) {
                    var l = Math.pow(t, x - 1) * Math.pow(1 - t, y - 1),
                        h = Math.pow(t, x - 1) * Math.pow(1 - t, y - 1);
                    area += ((l + h) / 2) * stepSize;
                }
                return area;
            };
        return ibf(alpha, beta, x, stepSize) / cbf(alpha, beta, stepSize); // Regularized Incomplete Beta Function
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
        return alpha / (alpha + beta);
    }

	/*
	 * Calculate the median.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * Return:
	 * Median
	 */
    static median(alpha, beta) {// ~
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        return (alpha - (1 / 3)) / (alpha + beta - (2 / 3));
    }

	/*
	 * Calculate the mode.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * Return:
	 * Mode
	 */
    static mode(alpha, beta) {
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        return (alpha - 1) / (alpha + beta - 2);
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
        return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
    }

	/*
	 * Calculate the skewness.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * Return:
	 * Skewness
	 */
    static skewness(alpha, beta) {
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        return (2 * (beta - alpha) * Math.sqrt(alpha + beta + 1)) / ((alpha + beta + 2) * Math.sqrt(alpha * beta));
    }

	/*
	 * Calculate the excess kurtosis.
	 * Parameter:
	 * alpha: Alpha shape
	 * beta: Beta shape
	 * Return:
	 * Excess Kurtosis
	 */
    static kurtosis(alpha, beta) {
        SMathJsUtils.isValidNumber(alpha);
        SMathJsUtils.isValidNumber(beta);
        return (6 * (Math.pow(alpha - beta, 2) * (alpha + beta + 1) - alpha * beta * (alpha + beta + 2))) / (alpha * beta * (alpha + beta + 2) * (alpha + beta + 3));
    }
}