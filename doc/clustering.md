## Clustering
This part of the library provides some basic clustering concepts. 
These include K-Means, K-Median and K-Medoids clustering.
<p float="middle">
  <img src="/doc/media/clustering_illustration/k_means_clustering.gif" width="32%" />
  <img src="/doc/media/clustering_illustration/k_median_clustering.gif" width="32%" /> 
  <img src="/doc/media/clustering_illustration/k_medoids_clustering.gif" width="32%" /> 
</p>

## Clustering Classes
Currently there are the clustering classes `KMeansClustering`, `KMedianClustering`, `KMedoids` and `FuzzyClustering`. These classes have the same functions and constructors with corresponding prameters.
### Constructor
Constructor of this class to instanciate a object.
```
/*
* Parameter:
* data: Data points
* k: Number of clusters
*/
var obj = new {{ClusteringClassName}}(data, k);
```
### Centroid Initialization
After instantiating the classes, the centroids can be initialized manually or via a function.
If they are to be set manually, the dimensionality of the individual centroids must correspond to that of the data points.
Otherwise they can be initialized randomly or via the K-Means++ algorithm.
```
/*
* Setting centroids manually
*/
obj.centroids = [[...],...];
/*
* Parameter:
* void
* Return:
* void
*/
obj.randomCentroidInitialization();
```
```
/*
* Parameter:
* void
* Return:
* void
*/
obj.plusPlusCentroidInitialization();
```
### Classify
Classify a data point (to which centroid does this point belong and what distance does it have from it).
```
/*
* Parameter:
* point: Point to classify 
* Return:
* [class, distance to centroid]
*/
var classification = obj.classify(point);
```
### Perform Step
Perform optimization step / training iteration.
```
/*
* Parameter:
* void
* Return:
* void
*/
obj.performStep();
```