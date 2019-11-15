# sMathJs - A Small Statistics Library 
This project was mainly developed for learning purposes, but will also be used in a future planned project. 
The project isn't finished yet. Currently the following tasks are planned:
 - Lib & Demo for Regressions
    - <del>Polynomial-Regression</del>
    - Logarithmic-Regression
    - Exponential-Regression
    - ab-Exponential-Regression
    - Power-Regression
    - Logarithmic-Regression
    - Hyperbolic-Regression
    - Update sub-/main-documentations + Rewrite functions descriptions
- Lib & Demo Distribution
    - <del>Binomial Distribution</del>
    - <del>Z-Distribution / Gaussian Distribution</del>
    - <del>Central + noncentral T-Student Distribution</del>
    - <del>F-Distribution</del>
    - <del>Gamma Distribution</del>
    - <del>Exponential Distribution</del>
    - <del>Poisson Distribution</del>
    - <del>Beta Distribution</del>
    - <del>Arcsine Distribution</del>
    - <del>Log-Normal Distribution</del>
    - <del>Uniform Distribution</del>
    - <del>Weibull Distribution</del>
    - Laplace Distribution
    - Hypergeometric Distribution
    - Create sub-/main-documentations with equations and descriptions + Rewrite function descriptions
 
**If you find a bug or miss an equation, please let me know.**

# Table Of Contents
- [How To Use It](#how_to_use_it)
- [Utils](#utils)
- [Regression](#regression)
- [Distributions](#distributions)
    - [Binomial Distribution](#binomial)
    - [Z-Distribution](#z)
    - [T-Distribution](#t)
    - [F-Distribution](#f)
    - [Gamma-Distribution](#gamma)
    - [Exponential-Distribution](#exponential)
    - [Poisson-Distribution](#poisson)
    - [Beta-Distribution](#beta)
    - [Arcsine-Distribution](#arcsine)
    - [Log-Normal-Distribution](#lnormal)
    - [Uniform-Distribution](#uniform)
    - [Weibull-Distribution](#weibull)
<a name="how_to_use_it"></a>
## How To Use It
Bind the JS scripts as follows. For detailed information for the corresponding distribution, check out the following sections.
For distribution include `utils` and the required `distributions`.
Note that the Gamma-Distribution must also be also included for the T-, F-, Beta- and Weibull-Distributions, since the distributions use the Euler Gamma Function.
```
<script src="src/utils.js"></script>
<script src="src/distributions/binomial_distribution.js"></script>
<script src="src/distributions/gamma_distribution.js"></script>
<script src="src/distributions/f_distribution.js"></script>
<script src="src/distributions/t_distribution.js"></script>
<script src="src/distributions/z_distribution.js"></script>
<script src="src/distributions/exponential_distribution.js"></script>
<script src="src/distributions/poisson_distribution.js"></script>
<script src="src/distributions/log_normal_distribution.js"></script>
<script src="src/distributions/arcsine_distribution.js"></script>
<script src="src/distributions/beta_distribution.js"></script>
<script src="src/distributions/uniform_distribution.js"></script>
```
For data fitting `utils`, `optimizer` and `regression`.
```
<script src="src/utils.js"></script>
<script src="src/regression/optimizer.js"></script>
<script src="src/regression/regression.js"></script>
```
<a name="utils"></a>
## Utils
The utils script contains functions that are used multiple times in different distributions. A description of the functionalities can be found [here](/doc/utils.md).
<a name="regression"></a>
## Regression
This part of the library offers some regressions in combination with different optimizers or with a best fit calculation.
A description of the regression and optimizer functionalities can be found [here](/doc/regression.md).
<p float="middle">
  <img src="/doc/media/regression_illustration/regression_linear.gif" width="48%" />
  <img src="/doc/media/regression_illustration/regression_overview.gif" width="48%" /> 
</p>

<a name="distributions"></a>
## Distributions
This part of the library provides probability distributions for statistical evaluation of data.
<a name="binomial"></a>
### Binomial Distribution
A library to create and use a Binomial Distribution.
A description of the functionalities can be found [here](/doc/binomial_distribution.md).
The corresponding demo for this distribution looks like this.
![Binomial-Distribution](/doc/media/distribution_illustration/binomial_distribution.gif)
<a name="z"></a>
### Z-Distribution / Gaussian distribution
A library to create and use a Z-Distribution.
The corresponding demo for this distribution looks like this.
A description of the functionalities can be found [here](/doc/z_distribution.md).
![Binomial-Distribution](/doc/media/distribution_illustration/z_distribution.gif)
<a name="t"></a>
### Centred + Noncentred T-Distribution
A library to create and use a centred and noncentred T-Distribution.
A description of the functionalities can be found [here](/doc/t_distribution.md).
The corresponding demo for this distribution looks like this.
![Binomial-Distribution](/doc/media/distribution_illustration/t_distribution.gif)
<a name="f"></a>
### F-Distribution
A library to create and use a F-Distribution.
A description of the functionalities can be found [here](/doc/f_distribution.md).
The corresponding demo for this distribution looks like this.
![F-Distribution](/doc/media/distribution_illustration/f_distribution.gif)
<a name="gamma"></a>
### Gamma-Distribution
A library to create and use a Gamma-Distribution.
A description of the functionalities can be found [here](/doc/gamma_distribution.md).
The corresponding demo for this distribution looks like this.
![Gamma-Distribution](/doc/media/distribution_illustration/gamma_distribution.gif)
<a name="exponential"></a>
### Exponential-Distribution
A library to create and use a Exponential-Distribution.
A description of the functionalities can be found [here](/doc/exponential_distribution.md).
The corresponding demo for this distribution looks like this.
![Exponential-Distribution](/doc/media/distribution_illustration/exponential_distribution.gif)
<a name="poisson"></a>
### Poisson-Distribution
A library to create and use a Poisson-Distribution.
A description of the functionalities can be found [here](/doc/poisson_distribution.md).
The corresponding demo for this distribution looks like this.
![Poisson-Distribution](/doc/media/distribution_illustration/poisson_distribution.gif)
<a name="beta"></a>
### Beta-Distribution
A library to create and use a Beta-Distribution.
A description of the functionalities can be found [here](/doc/beta_distribution.md).
The corresponding demo for this distribution looks like this.
![Beta-Distribution](/doc/media/distribution_illustration/beta_distribution.gif)
<a name="arcsine"></a>
### Arcsine-Distribution
A library to create and use a Arcsine-Distribution with or without bounded support.
A description of the functionalities can be found [here](/doc/arcsine_distribution.md).
The corresponding demo for this distribution looks like this.
![Arcsine-Distribution](/doc/media/distribution_illustration/arcsine_distribution.gif)
<a name="lnormal"></a>
### Log-Normal-Distribution
A library to create and use a Log-Normal-Distribution.
A description of the functionalities can be found [here](/doc/log_normal_distribution.md).
The corresponding demo for this distribution looks like this.
![Log-Normal-Distribution](/doc/media/distribution_illustration/log_normal_distribution.gif)
<a name="uniform"></a>
### Uniform-Distribution
A library to create and use a Uniform-Distribution which is also known as continuous uniform distribution or rectangular distribution.
A description of the functionalities can be found [here](/doc/uniform_distribution.md).
The corresponding demo for this distribution looks like this.
![Log-Normal-Distribution](/doc/media/distribution_illustration/uniform_distribution.gif)
<a name="weibull"></a>
### Weibull-Distribution
A library to create and use a Weibull-Distribution.
A description of the functionalities can be found [here](/doc/weibull_distribution.md).
The corresponding demo for this distribution looks like this.
![Weibull-Distribution](/doc/media/distribution_illustration/weibull_distribution.gif)

