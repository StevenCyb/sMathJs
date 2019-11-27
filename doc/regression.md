## Regression
This part of the library offers different regressions in combination with different optimizers.
## Table Of Contents
- [Regressions](#regressions)
- [Regression Classes](#regression_classes)
- [Optimizers](#optimizers)
- [Example](#example)
<a name="regressions"></a>
### Regressions
The regression class `PolynomialRegression` offers the possibility to perform linear (zero-slope), linear, quadratic, cubic and regressions with higher degree (see below).
Additionally there is the logarithmic regression.
<p float="middle">
<table>
	<tr>
		<th>Description</th>
		<th>Instantiation</th>
		<th>Illustration</th>
	</tr>
	<tr>
		<td>Degree 0<br>(Linear-zero-Slope)</td>
		<td>new PolynomialRegression(0);</td>
		<td><img src="/doc/media/regression_illustration/polynomial_0.jpg" width="100%" /></td>
	</tr>
	<tr>
		<td>Degree 1<br>(Linear)</td>
		<td>new PolynomialRegression(1);</td>
		<td><img src="/doc/media/regression_illustration/polynomial_1.jpg" width="100%" /></td>
	</tr>
	<tr>
		<td>Degree 2<br>(Quadratic)</td>
		<td>new PolynomialRegression(2);</td>
		<td><img src="/doc/media/regression_illustration/polynomial_2.jpg" width="100%" /></td>
	</tr>
	<tr>
		<td>Degree 3<br>(Cubic)</td>
		<td>new PolynomialRegression(3);</td>
		<td><img src="/doc/media/regression_illustration/polynomial_3.jpg" width="100%" /></td>
	</tr>
	<tr>
		<td>Degree 4</td>
		<td>new PolynomialRegression(4);</td>
		<td><img src="/doc/media/regression_illustration/polynomial_4.jpg" width="100%" /></td>
	</tr>
	<tr>
		<td>Degree 5</td>
		<td>new PolynomialRegression(5);</td>
		<td><img src="/doc/media/regression_illustration/polynomial_5.jpg" width="100%" /></td>
	</tr>
	<tr>
		<td>Degree 6</td>
		<td>new PolynomialRegression(6);</td>
		<td><img src="/doc/media/regression_illustration/polynomial_6.jpg" width="100%" /></td>
	</tr>
	<tr>
		<td>Degree 7</td>
		<td>new PolynomialRegression(7);</td>
		<td><img src="/doc/media/regression_illustration/polynomial_7.jpg" width="100%" /></td>
	</tr>
	<tr>
		<td>Logarithmic</td>
		<td>new LogarithmicRegression();</td>
		<td><img src="/doc/media/regression_illustration/logarithmic.jpg" width="100%" /></td>
	</tr>
</table>
</p>

<a name="regression_classes"></a>
### Regression Classes
All regression classes mentioned above have the same functions, which are explained in the following.
#### Constructor
Create a class as follow.
```
/*
* Parameter:
* degree: Degree of this polynomial regression
* optimizer: Optimizer to train (optional)
*/
var obj = new PolynomialRegression(degree, optimizery);
```
#### Predict
Calculate the y-value for the corresponding x-value.
```
/*
* Parameter:
* x: X-Value 
* Return:
* Y-Value
*/
regressionObj.predict(x);
```
#### Summed Mean Squared Error
Calculates the summed mean square error (MSE) loss.
```
/*
* Parameter:
* data: Data in format [[x_1,y_1],[x_2,y_2],...] 
* Return:
* Summed MSE
*/
regressionObj.summedMeanSquaredError(data);
```
#### Gradient
Calculates the gradient with current regression parameters.
```
/*
* Parameter:
* data: Data in format [[x_1,y_1],[x_2,y_2],...] 
* Return:
* Gradients [c0, c1, ..., cn]
*/
regressionObj.gradient(data);
```
#### Gradient With Given
Calculates the gradient with given coefficients.
```
/*
* Parameter:
* data: Data in format [[x_1,y_1],[x_2,y_2],...] 
* coefficients: Coefficients to use [c0, c1, ..., cn]
* Return:
* Gradients [c0, c1, ..., cn]
*/
regressionObj.gradientWithGiven(data, coefficients);
```
#### Train
Perform a training step with the setted optimizer.
```
/*
* Parameter:
* data: Data in format [[x_1,y_1],[x_2,y_2],...] 
* Return:
* Loss after training step.
*/
regressionObj.train(data);
```
#### Best Fit
Calculate the best fit to the given data points.
```
/*
* Parameter:
* data: Data in format [[x_1,y_1],[x_2,y_2],...] 
* Return:
* Nothing, but set the coefficients
*/
regressionObj.bestFit(data);
```
<a name="optimizers"></a>
### Optimizers
This library includes the following optimizers:
- Adagrad
- Adam
- Adamx
- Adadelta
- Momentum
- Nadam
- Nesterov
- Rmsprop
- Vanilla

All these optimizers have the same functions, which are explained below. 
#### Constructor
The constructor is the only point where the optimizers differ.
The following example shows how to instantiate the optimizers.
```
var o1 = new AdagradOptimizer(learningRate);
var o2 = new AdamOptimizer(learningRate, beta1, beta2);
var o3 = new AdamxOptimizer(learningRate, beta1, beta2);
var o4 = new AdadeltaOptimizer(gamma);
var o5 = new MomentumOptimizer(learningRate, momentum);
var o6 = new NadamOptimizer(learningRate, beta1, beta2);
var o7 = new NesterovOptimizer(learningRate, gamma);
var o8 = new RmspropOptimizer(learningRate, gamma);
var o9 = new VanillaOptimizer(learningRate);
```
#### Clone
Clone the optimizer. This function is used by the regression classes.
```
var objectToClone = new {{OptimizersClassName}}(...);
var clonedObject = objectToClone.clone();
```
#### Optimize
Perform an optimization step for the given iteration (-1) and the current coefficient value to perform the optimization around the given gradient.
```
{{OptimizersClassName}}.optimize(iteration, currentValue, gradient);
```
The `NesterovOptimizer` also has a pre-optimization function that is performed before the gradient is calculated (see below).
```
/*
* Parameter:
* current: Current value which need to be pre-optimized
* Return:
* The pre-optimized value
*/
{{NesterovOptimizerObject}}.gradientPreCalculation(currentValue);
//Example
var currentValue = {{SomeValueOfRegressionFunction}};
var opt = NesterovOptimizer(...);
var x = opt.gradientPreCalculation(currentValue)
// Perform gradient calculation
// Perform the actual optimization
```
<a name="example"></a>
### Example
Thus a linear regression with the Rmsprop Optimizer can be applied to a dataset as follows, where the number of iterations is determined by a loop.
You can also calculate the best fit directly.
```
[...]
<script src="src/utils.js"></script>
<script src="src/regression/optimizer.js"></script>
<script src="src/regression/regression.js"></script>
[...]
<script>
	var someData = [[0,0],...]; // [[x_1,y_1],[x_2,y_2],...]
	// Train the regression
	var linearTrained = new PolynomialRegression(1, new RmspropOptimizer(0.0000001, 0.9));
	for(var i=0; i<10; i++) {
		var loss = linearTrained.train(someData);
		console.log("It.:" + i + ", Loss:" + loss);
	}
	// Solve the regression
	var linearDirect = new PolynomialRegression(1, new RmspropOptimizer(0.0000001, 0.9));
	linearDirect.bestFit(someData)
	// Show difference
	console.log("Trained : ", linearTrained.predict(1.5));
	console.log("Directly: ", linearDirect.predict(1.5));
<script>
[...]
```
