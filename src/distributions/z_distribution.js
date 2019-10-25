class ZDistribution {
	/*
	 * Calculate the probability from x1 to x2.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x1: From position x1
	 * x2: To position x2
	 * stepSize: Step-size for this calculation (optional, default: 0.1)
	 * Return:
	 * Probability for x1 to x2
	 */
    static pdf(mean, sd, x1, x2, stepSize=0.1) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(x1);
        SMathJsUtils.isValidNumber(x2);
		SMathJsUtils.isValidNumber(stepSize);
		var area = 0.0,
			pdf = function(mean, sd, x) {
				SMathJsUtils.isValidNumber(x);
				SMathJsUtils.isValidNumber(mean);
				SMathJsUtils.isValidNumber(sd);
				return Math.pow(Math.E, -0.5 * Math.pow((x - mean) / sd, 2));
			};
        for (var i = (x1 * 1.0); i <= (x2 * 1.0); i += stepSize) {
            var l = pdf(mean, sd, i),
                h = pdf(mean, sd, i + stepSize);
            area += ((l + h) / 2) * stepSize;
        }
        return (1 / (sd * Math.sqrt(2 * Math.PI))) * area;
    }

	/*
	 * Calculate the normal PDF.
	 * Parameter:
	 * x1: From position x1
	 * x2: To position x2
	 * stepSize: Step-size for this calculation (optional, default: 0.1)
	 * Return:
	 * PDF for x
	 */
    static normalPdf(x1, x2, stepSize=0.1) {
        SMathJsUtils.isValidNumber(x1);
        SMathJsUtils.isValidNumber(x2);
		SMathJsUtils.isValidNumber(stepSize);
		var area = 0.0,
			pdf = function(x) {
				return (1 / (Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, -0.5 * Math.pow((x), 2));
			};
		for (var i = (x1 * 1.0); i <= (x2 * 1.0); i += stepSize) {
			var l = pdf(i),
				h = pdf(i + stepSize);
			area += ((l + h) / 2) * stepSize;
		}
		return area;
    }

	/*
	 * Probability below x `P(X < x)`.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x: For with to calculate probability 
	 * stepSize: Step-size for this calculation (optional, default:0.1)
	 * Return:
	 * Probability below x
	 */
    static probabilityBelow(mean, sd, x, stepSize=0.1) {
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(stepSize);
        return this.pdf(mean, sd, this.simpleMinMax(mean, sd)[0], x - 1, stepSize);
    }

	/*
	 * Probability below x (included) `P(X <= x)`.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x: For with to calculate probability 
	 * stepSize: Step-size for this calculation (optional, default:0.1)
	 * Return:
	 * Probability below x (included)
	 */
    static probabilityBelowEqual(mean, sd, x, stepSize=0.1) {
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(stepSize);
        return this.probabilityBelow(mean, sd, x + 1, stepSize);
    }

	/*
	 * Probability for above x `P(X > x)`.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x: For with to calculate probability 
	 * stepSize: Step-size for this calculation (optional, default:0.1)
	 * Return:
	 * Probability for above x
	 */
    static probabilityAbove(mean, sd, x, stepSize=0.1) {
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(stepSize);
        return this.pdf(mean, sd, x - 1, this.simpleMinMax(mean, sd)[1], stepSize);
    }

	/*
	 * Probability for above x(included) `P(X >= x)`.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x: For with to calculate probability 
	 * stepSize: Step-size for this calculation (optional, default:0.1)
	 * Return:
	 * Probability for above x(included)
	 */
    static probabilityAboveEqual(mean, sd, x, stepSize=0.1) {
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(stepSize);
        return this.probabilityAbove(mean, sd, x + 1, stepSize);
    }

	/*
	 * Probability between k1(included) and k2(included) `P(k1 <= X => k2)`.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x1: Calculate probability from
	 * x2: Calculate probability to
	 * stepSize: Step-size for this calculation (optional, default:0.1)
	 * Return:
	 * Probability between k1(included) and k2(included) 
	 */
    static probabilityInner(mean, sd, x1, x2, stepSize=0.1) {
        SMathJsUtils.isValidNumber(x1);
        SMathJsUtils.isValidNumber(x2);
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(stepSize);
        return this.pdf(mean, sd, x1, x2, stepSize);
    }

	/*
	 * Probability excluding all between k1 and k2 `P(k1 > X < k2)`.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x1: Calculate probability excluding from
	 * x2: Calculate probability excluding to
	 * stepSize: Step-size for this calculation (optional, default:0.1)
	 * Return:
	 * Probability excluding all between k1(included) and k2(included) 
	 */
    static probabilityOuter(mean, sd, x1, x2, stepSize=0.1) {
        SMathJsUtils.isValidNumber(x1);
        SMathJsUtils.isValidNumber(x2);
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(stepSize);
        return 1 - this.pdf(mean, sd, x1, x2, stepSize);
    }

	/*
	 * Calculate the normal CDF from x1 to x2.
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * x1: From position x1
	 * x2: To position x2
	 * stepSize: Step-size for this calculation (optional, default:0.0001)
	 * Return:
	 * CDF for x
	 */
    static cdf(mean, sd, x1, x2, stepSize=0.0001) {
		SMathJsUtils.isValidNumber(mean);
		SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(x1);
        SMathJsUtils.isValidNumber(x2);
        SMathJsUtils.isValidNumber(stepSize);
        var erf = function(x1, x2) {
				var area = 0.0;
				for (var i = (x1 * 1.0); i <= (x2 * 1.0); i += stepSize) {
					var l = Math.pow(Math.E, Math.pow(-1 * i, 2) / 2),
						h = Math.pow(Math.E, Math.pow(-1 * (i + stepSize), 2) / 2);
					area += ((l + h) / 2) * stepSize;
				}
				return (1 / Math.sqrt(2 * Math.PI)) * area;
			};
        return 0.5 * (1 + erf(x1, (x - mean) / Math.sqrt(2)));
    }

	/*
	 * Get the min. and max. by mean and standard deviation (dirty solution).
	 * Parameter:
	 * mean: Mean of distribution
	 * sd: Standard deviation of distribution
	 * maxMulti: Multiply factor (optional, default: 5)
	 * Return:
	 * Probability for x1 to x2
	 */
    static simpleMinMax(mean, sd, maxMulti=5) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(maxMulti);
        return [mean - (sd * maxMulti), mean + (sd * maxMulti)];
    }
	
    /*
    * Calculate the standard deviation from an array.
    * Parameter:
    * mean: Mean of array
    * arr: Array for which the variance should be calculated
    * Return:
    * SD
    */
	static standardDeviationFromArray (mean, arr) {
		return SMathJsUtils.standardDeviationFromArray (mean, arr);
	}

	/*
	 * Calculate the margin of error (MOE).
	 * Parameter:
	 * sd: Standard deviation of distribution 
	 * n: Sample-Size of distribution
	 * z: Z for which to calculate
	 * Return:
	 * MOE
	 */
    static marginOfError(sd, n, z) {
        SMathJsUtils.isValidNumber(z);
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(sd);
        return z * this.standardErrorOfMean(sd, n);
	}

	/*
	 * Calculate the standard error of mean (SEM).
	 * Parameter:
	 * sd: Standard deviation of distribution 
	 * n: Sample-Size of distribution
	 * Return:
	 * SEM
	 */
    static standardErrorOfMean(sd, n) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(sd);
        return (sd / Math.sqrt(n));
    }

	/*
	 * Calculate the standard error of two means (SEMs).
	 * Parameter:
	 * sd1: Standard deviation of distribution of dataset 1
	 * n1: Sample-Size of distribution of datasset 1
	 * sd2: Standard deviation of distribution of dataset 2
	 * n2: Sample-Size of distribution of datasset 2
	 * Return:
	 * SEMs
	 */
    static standardOfErrorOfTwoMeans(sd1, n1, sd2, n2) {
        SMathJsUtils.isValidNumber(n1);
        SMathJsUtils.isValidNumber(sd1);
        SMathJsUtils.isValidNumber(n2);
        SMathJsUtils.isValidNumber(sd2);
        return Math.sqrt((Math.pow(sd1, 2)  / n1) + (Math.pow(sd2, 2)  / n2));
    }
    
	/*
	 * Calculate the confidence interval with known standard deviation.
	 * Parameter:
	 * Mean: Mean of distribution
	 * sd: Standard deviation of distribution 
	 * n: Sample-Size of distribution
	 * z: Z for which to calculate
	 * Return:
	 * [bottom_ce, top_ce]
	 */
    static confidenceIntervalWithKnownSD(mean, sd, n, z) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(z);
        var cl = z * (sd / Math.sqrt(n));
        return [mean - cl, mean + cl];
    }

	/*
	 * Calculate z-score for x.
	 * Parameter:
	 * Mean: Mean of distribution
	 * sd: Standard deviation of distribution 
	 * x: For which to calculate the z-score
	 * Return:
	 * Z-Score
	 */
    static zScore(mean, sd, x) {
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(sd);
        return (x - mean) / sd;
    }
}