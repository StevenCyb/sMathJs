class KMedoids {
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
        this.centroids = new Array(k);
        this.groupBelongings = new Array(k);
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
        var currentCost = new Array(this.centroids.length);
        for(var i=0; i<this.centroids.length; i++) {
            this.groupBelongings[i] = [];
            currentCost[i] = 0;
        }
        for(var i=0; i<this.data.length; i++) {
            var classification = this.classify(this.data[i]);
            if(classification[1] != 0.0) {
                this.groupBelongings[classification[0]].push(i);
                currentCost[classification[0]] += classification[1];
            }
        }
        for(var i=0; i<this.centroids.length; i++) {
            if(this.groupBelongings[i].length > 0) {
                var newCost = 0,
                    newCentroid = SMathJsUtils.getRandomFromArray(this.groupBelongings[i], 1)[0];
                for(var j=0; j<this.groupBelongings[i].length; j++) {
                    newCost += SMathJsUtils.euclidianDistance(this.data[this.groupBelongings[i][j]], this.data[newCentroid]);
                }
                if(currentCost[i] > newCost) {
                    this.centroids[i] = this.data[newCentroid];
                }
            }
        }
    }
}