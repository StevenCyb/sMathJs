# sMathJs - A Small Statistics Library 
This project was mainly developed for learning purposes, but will also be used in a future planned project. 
The project isn't finished yet. Currently the following tasks are planned:
- Lib & Demo Distribution
    - <del>Binomial Distribution</del>
    - <del>Z-Distribution / Gaussian Distribution</del>
    - <del>Central + noncentral T-Student Distribution</del>
    - <del>F-Distribution</del>
    - <del>Gamma Distribution</del>
    - Beta Distribution <!-- in student t -->
    - Exponential Distribution
    - Continuous Equal Distribution / Rectangular Distribution
    - Weibull Distribution
    - Laplace Distribution
    - Lognormal Distribution
    - Poisson Distribution
    - Hypergeometric Distribution
 - Lib & Demo for Regressions
    - <del>Polynomial-Regression</del>
    - Logarithmic-Regression
    - Exponential-Regression
    - ab-Exponential-Regression
    - Power-Regression
    - Logarithmic-Regression
    - Hyperbolic-Regression
 - In addition, the entire documentation and implementation will be optimized and cleaned.
 
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
    - [Gamma-Distribution](#g)
<a name="how_to_use_it"></a>
## How To Use It
Bind the JS scripts as follows. For detailed information for the corresponding distribution, check out the following sections.
For distribution include `utils` and the required `distributions`.
```
<script src="src/utils.js"></script>
<script src="src/distributions/binomial_distribution.js"></script>
<script src="src/distributions/f_distribution.js"></script>
<script src="src/distributions/t_distribution.js"></script>
<script src="src/distributions/z_distribution.js"></script>
<script src="src/distributions/gamma_distribution.js"></script>
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
  <img src="/doc/media/regression_linear.gif" width="48%" />
  <img src="/doc/media/regression_overview.gif" width="48%" /> 
</p>

<a name="distributions"></a>
## Distributions
This part of the library provides probability distributions for statistical evaluation of data.
<a name="binomial"></a>
### Binomial Distribution
A library to create and use a Binomial Distribution.
The corresponding demo for this distribution looks like this.
A description of the functionalities can be found [here](/doc/binomial_distribution.md).
![Binomial-Distribution](/doc/media/binomial_distribution.gif)
<a name="z"></a>
### Z-Distribution / Gaussian distribution
A library to create and use a Z-Distribution.
The corresponding demo for this distribution looks like this.
A description of the functionalities can be found [here](/doc/z_distribution.md).
![Binomial-Distribution](/doc/media/z_distribution.gif)
<a name="t"></a>
### Centred + Noncentred T-Distribution
A library to create and use a centred and noncentred T-Distribution.
The implementation is rather slow due several integrals, so this distribution can't be recommended.
The corresponding demo for this distribution looks like this.
A description of the functionalities can be found [here](/doc/t_distribution.md).
![Binomial-Distribution](/doc/media/t_distribution.gif)
<a name="f"></a>
### F-Distribution
A library to create and use a F-Distribution.
The implementation contains only the basic functions.
A description of the functionalities can be found [here](/doc/f_distribution.md).
![F-Distribution](/doc/media/f_distribution.gif)
<a name="g"></a>
### Gamma-Distribution
A library to create and use a Gamma-Distribution.
The implementation contains only the basic functions.
A description of the functionalities can be found [here](/doc/gamma_distribution.md).
![Gamma-Distribution](/doc/media/gamma_distribution.gif)
