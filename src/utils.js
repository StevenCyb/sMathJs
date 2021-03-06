class SMathJsUtils {
    /*
    * Check if the given value is a valid number.
     * Parameter:
     * x: Value to check
     * Return:
     * Nothing (throw a exception if check failed)
     */
    static isValidNumber(x) {
        if(isNaN(parseFloat(x)) || typeof x != 'number' || x.length == 0) { throw "'" + x + "' is not a valid number."; }
    }

    /*
    * Check if the given value is a valid function.
    * Parameter:
    * x: Value to check
    * Return:
    * Nothing (throw a exception if check failed)
    */
    static isValidFunction(f) {
        if(f == undefined || typeof f != 'function') {throw "'" + f + "' is not a valid function array.";}
    }

    /*
    * Check if the given value is a valid array with numbers.
    * Parameter:
    * x: Value to check
    * Return:
    * Nothing (throw a exception if check failed)
    */
    static isValidNumberArray(arr) {
        if(!Array.isArray(arr)) { throw "'" + arr + "' is not a valid number array."; }
        try {
            arr.forEach(x => { this.isValidNumber(x); });
        } catch(e) { throw "'" + arr + "' is not a valid number array."; }
    }

    /*
    * Check if the given value is a valid N-D tuple.
    * Parameter:
    * x: Value to check
    * dimensions: Target tuple dimensions
    * Return:
    * Nothing (throw a exception if check failed)
    */
    static isValidNdTuple(x, dimensions) {
        if(!Array.isArray(x)) { throw "'" + x + "' is not a valid " + dimensions + "D tuple."; }
        if(x.length != dimensions) {
            throw "'" + x + "' is not a valid " + dimensions + "D tuple.";
        }
    }

    /*
    * Check if the given value is a valid array with numeric N-D tuples.
    * Parameter:
    * x: Value to check
    * Return:
    * Nothing (throw a exception if check failed)
    */
    static isValidNdTupleArray(arr, dimensions) {
        if(!Array.isArray(arr)) { throw "'" + arr + "' is not a valid number array."; }
        try {
            arr.forEach(x => { this.isValidNdTuple(x, dimensions); });
        } catch(e) { throw "'" + arr + "' is not a valid number array."; }
    }

    /* 
    * Check if the given value is a valid boolean.
    * Parameter:
    * x: Value to check
    * Return:
    * Nothing (throw a exception if check failed)
    */
    static isValidBoolean(b) {
        if(! (typeof b == 'boolean')) { throw "'" + b + "' is not a valid boolean."; }
    }

    /* 
    * Give n random numbers from array.
    * Parameter:
    * arr: Array with datapoints
    * n: Number of random draws
    * replacement: With or wihtout replacement (default: true(With replacement))
    * Return:
    * Sample array with n random datapoints 
    */
    static getRandomFromArray(arr, n, replacement=true) {
        if(!Array.isArray(arr)) { throw "'" + arr + "' is not a valid number array."; }
        this.isValidNumber(n);
        var data = [], index = 0;
        for(var i=0; i<n; i++) {
            index = Math.floor(Math.random() * arr.length);
            data.push(arr[index]);
            if(!replacement) {
                arr.splice(index, 1);
            }
        }
        return data;
    }

    /*
    * Create a matrix out of an array with given rows, columns.
    * Parameter:
    * arr: Array for which to generate the modus
    * rows: Number of rows
    * columns: Number of columns
    * Return:
    * [min, max]
    */
    static arrayToMatrix(arr, rows, columns) {
        if(!Array.isArray(arr)) { throw "'" + arr + "' is not a valid number array."; }
        this.isValidNumber(rows);
        this.isValidNumber(columns);
        var matrix = [];
        for(var r=0; r<rows; r++) {
            matrix.push(SMathJsUtils.getRandomFromArray(arr, columns));
        }
        return matrix;
    }

    /*
    * Calculate the euclidian distance between two points
    * Parameter:
    * a: Fist point
    * b: second point
    * Return
    * Distance
    */
    static euclidianDistance(a, b) {
        SMathJsUtils.isValidNdTuple(a, a.length);
        SMathJsUtils.isValidNdTuple(b, a.length);
        var sum = 0;
        for(var n=0; n<a.length; n++) {
            sum += Math.pow(a[n] - b[n], 2);
        }
        return Math.sqrt(sum);
    }

    /*
    * Calculate the manhattan distance between two points
    * Parameter:
    * a: Fist point
    * b: second point
    * Return
    * Distance
    */
    static manhattanDistance(a, b) {
        SMathJsUtils.isValidNdTuple(a, a.length);
        SMathJsUtils.isValidNdTuple(b, a.length);
        var sum = 0.0;
        for(var n=0; n<a.length; n++) {
            sum += Math.abs(a[n] - b[n]);
        }
        return sum;
    }

    /*
    * Calculate the faculty of n (!n).
    * Parameter:
    * n: Number for which the faculty should be calculated
    * Return:
    * Faculty of n
    */
    static faculty(n) {
        this.isValidNumber(n);
        var result = 1;
        for(var i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    /*
    * Calculate the binomial coefficient n over k (nCk|nCr).
    * ╔   ╗
    * ║ n ║
    * ║ k ║
    * ╚   ╝
    * Parameter:
    * n: Total of objects
    * k: Ways to draw
    * Return:
    * Binomial coefficient
    */
    static binomialCoefficient(n, k) {
        this.isValidNumber(n);
        this.isValidNumber(k);
        return this.faculty(n) / (this.faculty(k) * this.faculty(n - k));
    }
    
    /*
    * Calculate the sum of an number array.
    * Parameter:
    * arr: Array to sum
    * Return:
    * Sum of array
    */
    static sum(arr) {
        this.isValidNumberArray(arr);
        var sum = 0;
        arr.forEach(x => {
            sum += x;
        });
        return sum;
    }

    /*
    * Calculate the mean of an number array.
    * Parameter:
    * arr: Array for which the mean should be determined 
    * Return:
    * Mean of array
    */
    static mean(arr) {
        this.isValidNumberArray(arr);
        return this.sum(arr) / arr.length;
    }

    /*
     * Calculate the mean of from sample-size and probability.
     * Parameter:
     * n: Sample-size
     * p: Probability
     * Return:
     * Mean
     */
    static meanFromSampleSizeProbability(n, p) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(p);
        return n * p;
    }

    /*
    * Calculate the variance of an number array.
    * Parameter:
    * mean: Mean of array
    * arr: Array for which the variance should be calculated
    * Return:
    * Variance
    */
    static variance(mean, arr) {
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumberArray(arr);
        var s = 0.0;
        arr.forEach(x => {
            s += Math.pow(Math.abs(x - mean), 2);
        });
        return s / arr.length;
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
        SMathJsUtils.isValidNumber(mean);
        SMathJsUtils.isValidNumberArray(arr);
        return Math.sqrt(this.variance(mean, arr));
    }

    /*
    * Calculate the standard deviation from sample-size and probability.
    * Parameter:
    * n: Sample-size
    * p: Probability
    * Return:
    * SD
    */
    static standardDeviationFromSampleSizeProbability(n, p) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(p);
        return Math.sqrt(n * p * (1 - p));
    }

    /*
    * Calculate the standard error from sample-size and standard deviation.
    * Parameter:
    * n: Sample-size
    * sd: Standard deviation
    * Return:
    * Standard error
    */
    static standardError(n, sd) {
        SMathJsUtils.isValidNumber(n);
        SMathJsUtils.isValidNumber(sd);
        return sd / Math.sqrt(n);
    }

    /*
    * Give the median of an array (featurewise).
    * Parameter:
    * arr: Array for which to search median
    * Return:
    * Median as single value or array (featurewise)
    */
    static median(arr, features=0) {
        if(features == 0) {
            this.isValidNumberArray(arr);
            arr = this.timsortASC(arr);
            var center = arr.length / 2;
            if(arr.length % 2 != 0) {
                return arr[parseInt(center)];
            }
            return (arr[center] + arr[center - 1]) / 2;
        } else {
            this.isValidNdTupleArray(arr, features);
            var medianAxis = [], axis = new Array(features).fill(null);
            for(var i=0; i<arr.length; i++) {
                for(var j=0; j<features; j++) {
                    if(axis[j] == null) {
                        axis[j] = [arr[i][j]];
                    } else {
                        axis[j].push(arr[i][j]);
                    }
                }
            }
            for(var i=0; i<features; i++) {
                axis[i] = this.timsortASC(axis[i]);
                var center = axis[i].length / 2;
                if (axis[i].length % 2 != 0) {
                    medianAxis.push(axis[i][parseInt(center)]);
                } else {
                    medianAxis.push((axis[i][center] + axis[i][center - 1]) / 2);
                }
            }
            return medianAxis;
        }
    }

    /*
    * Give the modus of an array.
    * Parameter:
    * arr: Array for which to generate the modus
    * Return:
    * Modus-Object
    */
    static modus(arr) {
        SMathJsUtils.isValidNumberArray(arr);
        var modus = {},
            max = 0;
        arr.forEach(x => {
            if(modus[x] == undefined) {
                modus[x] = 1;
            } else {
                modus[x] += 1;
            }
            if(modus[x] > max) {
                max = modus[x];
            }
        });
        for (var key in modus) {
            if(modus[key] < max) {
                delete modus[key];
            }
        }
        return modus;
    }

    /*
    * Give the min. and max. value of an array.
    * Parameter:
    * arr: Array for which to generate the modus
    * Return:
    * [min, max]
    */
    static minmax(arr) {
        this.isValidNumberArray(arr);
        var min = Infinity,
            max = -Infinity;
        arr.forEach(x => {
            if(x < min) {
                min = x;
            } else if(x > max) {
                max = x;
            }
        });
        return [min, max];
    }

    /*
    * Sort an array with Timsort sorting algorithm in ASC order.
    * Parameter:
    * arr: Array to sort
    * sortFeature: Indes to sort (optional) in case of tuple array
    * Return:
    * Sorted array
    */
    static timsortASC(arr, sortFeature=0) {
        if(sortFeature > 0) {
            this.isValidNdTupleArray(arr, arr[0].length);
        } else {
            this.isValidNumberArray(arr);
        }
        var n = arr.length,
            subArraySize = 32;
        for(var i = 0; i < n; i += subArraySize){
            // Insert sort
            var left = i, right = Math.min((i + 31), (n - 1));
            for(var i = (left + 1); i <= right; i++){
                var temp = arr[i],
                j = i - 1; 
                if(sortFeature==0) {
                    while (j >= left && arr[j] > temp) {
                        arr[j + 1] = arr[j]; 
                        j--; 
                    }  
                } else {
                    while (j >= left && arr[j][sortFeature] > temp[sortFeature]) {
                        arr[j + 1] = arr[j]; 
                        j--; 
                    }  
                }
                arr[j + 1] = temp; 
            }
        }
        for(var size = subArraySize; size < n; size *= 2){
            for(var left = 0; left < n; left += (2 * size)){
                var middle = left + size - 1, right = Math.min((left + 2 * size - 1), (n - 1));
                // Merge
                var len1 = middle - left + 1, 
                    len2 = right - middle,
                    left1 = [],
                    right1 = [],
                    i = 0,
                    j = 0, 
                    k = left;
                for (var x = 0; x < len1; x++){ 
                    left1[x] = arr[left + x]; 
                } 
                for (var x = 0; x < len2; x++){ 
                    right1[x] = arr[middle + 1 + x]; 
                }  
                while (i < len1 && j < len2){ 
                    if ((sortFeature==0?left1[i]:left1[i][sortFeature]) <= (sortFeature==0?right1[j]:right1[j][sortFeature])){ 
                        arr[k] = left1[i]; 
                        i++; 
                    } else { 
                        arr[k] = right1[j]; 
                        j++; 
                    } 
                    k++; 
                } 
                while (i < len1){ 
                    arr[k] = left1[i]; 
                    k++; 
                    i++; 
                } 
                while (j < len2){ 
                    arr[k] = right1[j]; 
                    k++; 
                    j++; 
                } 
            }
        }
        return arr;
    }

    /*
    * Sort an array with Timsort sorting algorithm in DESC order.
    * Parameter:
    * arr: Array to sort
    * Return:
    * Sorted array
    */
    static timsortDESC(arr) {
        this.isValidNumberArray(arr);
        var nArr = [];
        this.timsortASC(arr).forEach(x => {
            nArr.unshift(x);
        });
        return nArr;
    }
}