class FuzzyClustering {
    /*
    * Constructor of this class.
    * Parameter:
    * data: Data points
    * k: Number of clusters
    * fuzzyParameter: Fuzzy parameter generally taken as 2
    */
    constructor(data, k, fuzzyParameter=2) {
        SMathJsUtils.isValidNdTupleArray(data, data[0].length);
        if(k < 2) {
            throw "k must be bigger than one";
        }
        if(data.length < k) {
            throw "Number of data points must be at least of size k";
        }
        this.data = data;
        this.fuzzyParameter = fuzzyParameter;
        this.centroids = new Array(k).fill([0,0]);
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
        var centroidClass = -1, minDist = Infinity, gammas = [], distances = [];
        for(var i=0; i<this.centroids.length; i++) {
            var distance = SMathJsUtils.euclidianDistance(point, this.centroids[i]);
            distances.push(distance);
            if(distance < minDist) {
                minDist = distance;
                centroidClass = i;
            }
        }
        for(var k=0; k<this.centroids.length; k++) {
            var tmp = 0;
            for(var d=0; d<distances.length; d++) {
                if(distances[k] == 0 || distances[d] == 0) {
                    tmp += 1;
                } else {
                    tmp += Math.pow(distances[k], 2) / Math.pow(distances[d], 2);
                }
            }
            gammas.push(Math.pow(Math.pow(tmp, 1 / (this.fuzzyParameter - 1)), -1));
        }
        return [centroidClass, minDist, gammas];
    }

    /*
    * Perform optimization step.
    * Parameter:
    * void
    * Return:
    * void
    */
   performStep() {
       var gammas = new Array(this.data.length);
       for(var p=0; p<this.data.length; p++) {
           gammas[p] = new Array(this.centroids.length);
           var distances = new Array(this.centroids.length);
           for(var k=0; k<this.centroids.length; k++) {
               distances[k] = SMathJsUtils.euclidianDistance(this.data[p], this.centroids[k]);
           }
           for(var k=0; k<this.centroids.length; k++) {
               var tmp = 0;
               for(var d=0; d<distances.length; d++) {
                   if(distances[k] == 0 || distances[d] == 0) {
                       tmp += 1;
                   } else {
                       tmp += Math.pow(distances[k], 2) / Math.pow(distances[d], 2);
                   }
               }
               gammas[p][k] = Math.pow(Math.pow(tmp, 1 / (this.fuzzyParameter - 1)), -1);
           }
       }
       for(var k=0; k<this.centroids.length; k++) {
           var base = 0, features = new Array(this.data[0].length).fill(0);
           for(var p=0; p<this.data.length; p++) {
               base += gammas[p][k];
               for(var f=0; f<features.length; f++) {
                   features[f] += gammas[p][k] * this.data[p][f];
               }
           }
           this.centroids[k] = new Array(features.length);
           for(var f=0; f<features.length; f++) {
               this.centroids[k][f] = features[f] / base;
           }
       }
   }
}