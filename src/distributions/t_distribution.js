class TDistribution {
	/*
	 * Calculate the central probability for x.
	 * Parameter:
	 * degreeOfFreedom: Degrees of freedom of this distribution
	 * x: Value to which calculate the PDF
     * stepSize: Step-size for this calculation (optional, default:0.1)
     * integralLowerBound: Lower bound for gamma integral because js can not use infinity (optional, default:0)
     * integralUpperBound: Upper bound for gamma integral because js can not use infinity (optional, default:100)
	 * Return:
	 * PDF for x
	 */
    static centralPDF = function(degreeOfFreedom, x, stepSize=0.1, integralLowerBound=0, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(degreeOfFreedom);
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralLowerBound);
        SMathJsUtils.isValidNumber(integralUpperBound);
        return (GammaDistribution.eulerGammaFunction((degreeOfFreedom + 1) / 2, stepSize, integralLowerBound, integralUpperBound) / (Math.sqrt(degreeOfFreedom * Math.PI) * GammaDistribution.eulerGammaFunction(degreeOfFreedom / 2, stepSize, integralLowerBound, integralUpperBound))) * Math.pow(1 + (Math.pow(x, 2) / degreeOfFreedom), -1 * ((degreeOfFreedom + 1) / 2))
    }

	/*
	 * Calculate the cental CDF to x.
	 * Parameter:
	 * degreeOfFreedom: Degrees of freedom of this distribution
	 * x1: Value from which calculate the CDF
	 * x2: Value to which calculate the CDF
     * stepSize: Step-size for this calculation (optional, default:0.1)
     * integralLowerBound: Lower bound for gamma integral because js can not use infinity (optional, default:0)
     * integralUpperBound: Upper bound for gamma integral because js can not use infinity (optional, default:100)
	 * Return:
	 * CDF from x1 to x2
	 */
    static centralCDF(degreeOfFreedom, x1, x2, stepSize=0.1, integralLowerBound=0, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(degreeOfFreedom);
        SMathJsUtils.isValidNumber(x1);
        SMathJsUtils.isValidNumber(x2);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralLowerBound);
        SMathJsUtils.isValidNumber(integralUpperBound);
        var area = 0.0;
        for (var i = (x1 * 1.0); i <= (x2 * 1.0); i += stepSize) {
            var l = this.centralPDF(degreeOfFreedom, i, stepSize, integralLowerBound, integralUpperBound),
                h = this.centralPDF(degreeOfFreedom, i + stepSize, stepSize, integralLowerBound, integralUpperBound);
            area += ((l + h) / 2) * stepSize;
        }
        return area;
    }

	/*
	 * Calculate the noncentral probability for x.
	 * Parameter:
	 * mean: Mean of distribution
	 * degreeOfFreedom: Degrees of freedom of this distribution
	 * x1: From position x1
	 * x2: To position x2
     * stepSize: Step-size for this calculation (optional, default:0.1)
     * integralLowerBound: Lower bound for gamma integral because js can not use infinity (optional, default:0)
     * integralUpperBound: Upper bound for gamma integral because js can not use infinity (optional, default:100)
	 * Return:
	 * Probability for x1 to x2
	 */
    static noncentralPDF = function(mean, degreeOfFreedom, x, stepSize=0.1, integralLowerBound=0, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(degreeOfFreedom);
        SMathJsUtils.isValidNumber(x);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralLowerBound);
        SMathJsUtils.isValidNumber(integralUpperBound);
        var tmp = 0;
        for (var i = 0; i <= integralUpperBound; i += stepSize) {
            var l = Math.pow(i, degreeOfFreedom) * Math.exp(-0.5 * Math.pow(i - ((mean * x) / Math.sqrt(Math.pow(x, 2) + degreeOfFreedom)), 2)),
                h = Math.pow(i + stepSize, degreeOfFreedom) * Math.exp(-0.5 * Math.pow((i + stepSize) - ((mean * x) / Math.sqrt(Math.pow(x, 2) + degreeOfFreedom)), 2));
            tmp += ((l + h) / 2) * stepSize;
        }
        return ((Math.pow(degreeOfFreedom, degreeOfFreedom / 2) * Math.exp(-1 * ((degreeOfFreedom * Math.pow(mean, 2)) / (2 * (Math.pow(x,2) + degreeOfFreedom))))) / (Math.sqrt(Math.PI) * GammaDistribution.eulerGammaFunction(degreeOfFreedom / 2, stepSize, integralLowerBound, integralUpperBound) * Math.pow(2, (degreeOfFreedom - 1) / 2) * Math.pow(Math.pow(x, 2) + degreeOfFreedom, (degreeOfFreedom + 1) / 2))) * tmp;
    }

	/*
	 * Calculate the noncental CDF to x.
	 * Parameter:
	 * degreeOfFreedom: Degrees of freedom of this distribution
	 * x1: Value from which calculate the CDF
	 * x2: Value to which calculate the CDF
     * stepSize: Step-size for this calculation (optional, default:0.1)
     * integralLowerBound: Lower bound for gamma integral because js can not use infinity (optional, default:0)
     * integralUpperBound: Upper bound for gamma integral because js can not use infinity (optional, default:100)
	 * Return:
	 * CDF from x1 to x2
	 */
    static noncentralCDF(mean, degreeOfFreedom, x1, x2, stepSize=0.1, integralLowerBound=0, integralUpperBound=100) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumber(degreeOfFreedom);
        SMathJsUtils.isValidNumber(x1);
        SMathJsUtils.isValidNumber(x2);
        SMathJsUtils.isValidNumber(stepSize);
        SMathJsUtils.isValidNumber(integralLowerBound);
        SMathJsUtils.isValidNumber(integralUpperBound);
        var area = 0.0;
        for (var i = (x1 * 1.0); i <= (x2 * 1.0); i += stepSize) {
            var l = this.noncentralPDF(mean, degreeOfFreedom, i, stepSize, integralLowerBound, integralUpperBound),
                h = this.noncentralPDF(mean, degreeOfFreedom, i + stepSize, stepSize, integralLowerBound, integralUpperBound);
            area += ((l + h) / 2) * stepSize;
        }
        return area;
    }

    /*
    * Calculate the degree of freedom.
    * Parameter:
    * n: Sample-size 
    * Return:
    * DOF
    */
    static degreeOfFreedom(n) {
        SMathJsUtils.isValidNumber(n);
        if(n < 2) {
            return NaN;
        } 
        return n - 1;
    }

    /*
    * Calculate the variance.
    * Parameter:
    * df: Degrees of freedom
    * Return:
    * Variance
    */
    static variance(df) {
        SMathJsUtils.isValidNumber(df);
        if(df > 2) {
            return df / (df - 2);
        } else if(this.degreeOfFreedom > 1) {
            return Infinity;
        }
        return NaN;
    }

    /*
    * Calculate the inflection points from ammount of samples.
    * Parameter:
    * n: Ammount of samples
    * Return:
    * [Positive-Inflection-Point, Negative-Inflection-Point]
    */
    static inflectionPoints(n) {
        SMathJsUtils.isValidNumber(n);
        var n = Math.sqrt(n / (n + 2))
        return [n, -1 * n];
    }

    /*
    * Calculate the t-statistic of two samples.
    * Parameter:
    * sample1Mean: Sample-mean of sample 1 
    * sample2Mean: Sample-mean of sample 2
    * sample1Variance: Sample-variance of sample 1
    * sample2Variance: Sample-variance of sample 2
    * sample1Size: Sample-size of sample 1
    * sample2Size: Sample-size of sample 2
    * Return:
    * T-statistic of two samples
    */
    static tStatistic(sample1Mean, sample2Mean, sample1Variance, sample2Variance, sample1Size, sample2Size) {
        SMathJsUtils.isValidNumber(sample1Mean);
        SMathJsUtils.isValidNumber(sample2Mean);
        SMathJsUtils.isValidNumber(sample1Variance);
        SMathJsUtils.isValidNumber(sample2Variance);
        SMathJsUtils.isValidNumber(sample1Size);
        SMathJsUtils.isValidNumber(sample2Size);
        return (sample1Mean - sample2Mean) / Math.sqrt((Math.pow(sample1Variance, 2) / sample1Size) + (Math.pow(sample2Variance, 2) / sample2Size));
    }

    /*
    * Calculate the t-score of x.
    * Parameter:
	* Mean: Mean of distribution
	* sd: Standard deviation of distribution 
    * n: Sample-size 
    * x: To which calculate the score
    * Return:
    * T-score of x
    */
    static tScore(populationMean, sampleMean, sd, n) {
        SMathJsUtils.isValidNumber(populationMean);
        SMathJsUtils.isValidNumber(sampleMean);
        SMathJsUtils.isValidNumber(sd);
        SMathJsUtils.isValidNumber(n);
        return (sampleMean - populationMean) / (sd / Math.sqrt(n))
    }
}