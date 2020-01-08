class KMeansClustering {
    /*
    * Constructor of this class.
    * Parameter:
    * data: Data points
    * k: Number of clusters
    */
    constructor(data, k) {
        SMathJsUtils.isValidNdTupleArray(data, data[0].length);
        if(k < 2) {
            throw "k must be bigger than one";
        }
        if(data.length < k) {
            throw "Number of data points must be at least of size k";
        }
        this.data = data;
        this.centroids = new Array(k).fill(null);
    }

    /*
    * Initialize centroid with the K-Means++ method.
    * Parameter:
    * void
    * Return:
    * void
    */
    plusPlusCentroidInitialization() {
        this.centroids[0] = SMathJsUtils.getRandomFromArray(this.data, 1, true)[0];
        for(var i=1; i<this.centroids.length; i++) {
            var maxDist = -1, maxPoint = null;
            for(var p=0; p<this.data.length; p++) {
                var minDist = Infinity, minPoint = null;
                for(var j=0; j<i; j++) {
                    var tmpDist = SMathJsUtils.euclidianDistance(this.data[p], this.centroids[j]);
                    if(tmpDist < minDist) {
                        minDist = tmpDist;
                        minPoint = this.data[p];
                    }
                }
                if(minDist > maxDist) {
                    maxDist = minDist;
                    maxPoint = minPoint;
                }
            }
            this.centroids[i] = maxPoint;
        }
    }

    /*
    * Initialize centroid with random numbers.
    * Parameter:
    * void
    * Return:
    * void
    */
    randomCentroidInitialization() {
        var data = [];
        for(var i=0; i<this.data.length; i++) {
            data.push(this.data[i]);
        }
        this.centroids = SMathJsUtils.getRandomFromArray(data, this.centroids.length, false);
    }

    /*
    * Classify a data point.
    * Parameter:
    * point: Point to classify 
    * Return:
    * [class, distance to centroid]
    */
    classify(point) {
        SMathJsUtils.isValidNdTuple(point, 2);
        var centroidClass = -1, minDist = Infinity;
        for(var i=0; i<this.centroids.length; i++) {
            var distance = SMathJsUtils.euclidianDistance(point, this.centroids[i]);
            if(distance < minDist) {
                minDist = distance;
                centroidClass = i;
            }
        }
        return [centroidClass, minDist];
    }

    /*
    * Perform optimization step.
    * Parameter:
    * void
    * Return:
    * void
    */
    performStep() {
        var summedPoints = new Array(this.centroids.length).fill([0,0,0]);
        for(var i=0; i<this.data.length; i++) {
            var centroidClass = this.classify(this.data[i])[0];
            summedPoints[centroidClass] = [
                summedPoints[centroidClass][0] + this.data[i][0], 
                summedPoints[centroidClass][1] + this.data[i][1], 
                summedPoints[centroidClass][2] + 1
            ];
        }
        for(var i=0; i<this.centroids.length; i++) {
            this.centroids[i] = [summedPoints[i][0] / summedPoints[i][2], summedPoints[i][1] / summedPoints[i][2]];
        }
    }
}