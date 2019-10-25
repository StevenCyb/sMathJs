/*
 * Class providing the Adagrad optimizer
 */
class AdagradOptimizer {
    /*
    * Constructor.
    * Parameter:
    * learningRate: The learning rate
    */
    constructor(learningRate=0.001) {
        SMathJsUtils.isValidNumber(learningRate);
        this.learningRate = learningRate;
        this.adagrad = 0;
    }
    /*
    * Clone the optimizer.
    * Parameter:
    * void
    * Return:
    * Clone-Object
    */
    clone() {
        return new AdagradOptimizer(this.learningRate);
    }
    /*
    * Perform an optimization step with given parameters.
    * Parameter:
    * iteration: Current iteration - 1 e.g. [0, 1, 2, ...]
    * currentValue: Current coefficient value which need to be optimized
    * gradient: The gradient of current coefficient value
    * Return:
    * The optimized value
    */
    optimize(iteration, currentValue, gradient) {
        SMathJsUtils.isValidNumber(iteration);
        SMathJsUtils.isValidNumber(currentValue);
        SMathJsUtils.isValidNumber(gradient);
        this.adagrad += Math.pow(gradient, 2);
        gradient = (this.learningRate / (Math.pow(this.adagrad, 0.5) + 1e-8)) * gradient;
        return currentValue - gradient;
    }
}
/*
 * Class providing the Adam optimizer
 */
class AdamOptimizer {
    /*
    * Constructor.
    * Parameter:
    * learningRate: The learning rate
    * beta1: First beta parameter
    * beta2: Second beta parameter
    */
    constructor(learningRate=0.001, beta1=0.9, beta2=0.999) {
        SMathJsUtils.isValidNumber(learningRate);
        SMathJsUtils.isValidNumber(beta1);
        SMathJsUtils.isValidNumber(beta2);
        this.learningRate = learningRate;
        this.beta1 = beta1;
        this.beta2 = beta2;
		this.mT = 0;
		this.vT = 0;
    }
    /*
    * Clone the optimizer.
    * Parameter:
    * void
    * Return:
    * Clone-Object
    */
    clone() {
        return new AdamOptimizer(this.learningRate, this.beta1, this.beta2);
    }
    /*
    * Perform an optimization step with given parameters.
    * Parameter:
    * iteration: Current iteration - 1 e.g. [0, 1, 2, ...]
    * currentValue: Current coefficient value which need to be optimized
    * gradient: The gradient of current coefficient value
    * Return:
    * The optimized value
    */
    optimize(iteration, currentValue, gradient) {
        SMathJsUtils.isValidNumber(iteration);
        SMathJsUtils.isValidNumber(currentValue);
        SMathJsUtils.isValidNumber(gradient);
        this.mT = this.beta1 * this.mT + (1.0 - this.beta1) * gradient;
		this.vT = this.beta2 * this.vT + (1.0 - this.beta2) * Math.pow(gradient, 2);
		gradient = (this.learningRate * (this.mT / (1.0 - Math.pow(this.beta1, iteration + 1)))) / (Math.pow((this.vT / (1.0 - Math.pow(this.beta2, iteration + 1))), 0.5) + 1e-8);
		return currentValue - gradient;
	}
}
/*
 * Class providing the Adamx optimizer
 */
class AdamxOptimizer {
    /*
    * Constructor.
    * Parameter:
    * learningRate: The learning rate
    * beta1: First beta parameter
    * beta2: Second beta parameter
    */
    constructor(learningRate=0.001, beta1=0.9, beta2=0.999) {
        SMathJsUtils.isValidNumber(learningRate);
        SMathJsUtils.isValidNumber(beta1);
        SMathJsUtils.isValidNumber(beta2);
        this.learningRate = learningRate;
        this.beta1 = beta1;
        this.beta2 = beta2;
		this.mT = 0;
		this.uT = 0;
    }
    /*
    * Clone the optimizer.
    * Parameter:
    * void
    * Return:
    * Clone-Object
    */
    clone() {
        return new AdamxOptimizer(this.learningRate, this.beta1, this.beta2);
    }
    /*
    * Perform an optimization step with given parameters.
    * Parameter:
    * iteration: Current iteration - 1 e.g. [0, 1, 2, ...]
    * currentValue: Current coefficient value which need to be optimized
    * gradient: The gradient of current coefficient value
    * Return:
    * The optimized value
    */
    optimize(iteration, currentValue, gradient) {
        SMathJsUtils.isValidNumber(iteration);
        SMathJsUtils.isValidNumber(currentValue);
        SMathJsUtils.isValidNumber(gradient);
		this.mT = this.beta1 * this.mT + (1.0 - this.beta1) * gradient;
        this.uT = Math.max(this.beta2 * this.uT, Math.abs(gradient));
        gradient = (this.learningRate / (1.0 - Math.pow(this.beta1, iteration + 1))) * (this.mT / this.uT);
		return currentValue - gradient;
	}
}
/*
 * Class providing the Adadelta optimizer
 */
class AdadeltaOptimizer {
    /*
    * Constructor.
    * Parameter:
    * gamma: Gamma parameter
    */
    constructor(gamma=0.9) {
        SMathJsUtils.isValidNumber(gamma);
        this.gamma = gamma;
		this.gradientSquared = 0;
		this.delta = 0;
		this.rms = 0;
    }
    /*
    * Clone the optimizer.
    * Parameter:
    * void
    * Return:
    * Clone-Object
    */
    clone() {
        return new AdadeltaOptimizer(this.gamma);
    }
    /*
    * Perform an optimization step with given parameters.
    * Parameter:
    * iteration: Current iteration - 1 e.g. [0, 1, 2, ...]
    * currentValue: Current coefficient value which need to be optimized
    * gradient: The gradient of current coefficient value
    * Return:
    * The optimized value
    */
    optimize(iteration, currentValue, gradient) {
        SMathJsUtils.isValidNumber(iteration);
        SMathJsUtils.isValidNumber(currentValue);
        SMathJsUtils.isValidNumber(gradient);
        this.gradientSquared = this.gamma * this.gradientSquared + (1.0 - this.gamma) * Math.pow(gradient, 2);
        var v = -1 * (this.rms / Math.sqrt(this.gradientSquared + 1e-8)) * gradient;
        this.delta = this.gamma * this.delta + (1.0 - this.gamma) * Math.pow(v, 2);
        this.rms = Math.sqrt(this.delta + 1e-8);
		return currentValue + v;
	}
}
/*
 * Class providing the Momentum optimizer
 */
class MomentumOptimizer {
    /*
    * Constructor.
    * Parameter:
    * learningRate: The learning rate
    * momentum: Momentum parameter
    */
    constructor(learningRate=0.001, momentum=0.9) {
        SMathJsUtils.isValidNumber(learningRate);
        SMathJsUtils.isValidNumber(momentum);
		this.learningRate = learningRate;
		this.momentum = momentum;
		this.previous_gradient = 0;
	}
    /*
    * Clone the optimizer.
    * Parameter:
    * void
    * Return:
    * Clone-Object
    */
    clone() {
        return new MomentumOptimizer(this.learningRate, this.momentum);
    }
    /*
    * Perform an optimization step with given parameters.
    * Parameter:
    * iteration: Current iteration - 1 e.g. [0, 1, 2, ...]
    * currentValue: Current coefficient value which need to be optimized
    * gradient: The gradient of current coefficient value
    * Return:
    * The optimized value
    */
    optimize(iteration, currentValue, gradient) {
        SMathJsUtils.isValidNumber(iteration);
        SMathJsUtils.isValidNumber(currentValue);
        SMathJsUtils.isValidNumber(gradient);
        this.previous_gradient = this.learningRate * gradient + momentum * this.previous_gradient;
		return currentValue - this.previous_gradient;
	}
}
/*
 * Class providing the Nadam optimizer
 */
class NadamOptimizer {
    /*
    * Constructor.
    * Parameter:
    * learningRate: The learning rate
    * beta1: First beta parameter
    * beta2: second beta parameter
    */
    constructor(learningRate=0.001, beta1=0.9, beta2=0.999) {
        SMathJsUtils.isValidNumber(learningRate);
        SMathJsUtils.isValidNumber(beta1);
        SMathJsUtils.isValidNumber(beta2);
        this.learningRate = learningRate;
        this.beta1 = beta1;
        this.beta2 = beta2;
		this.mT = 0;
		this.vT = 0;
    }
    /*
    * Clone the optimizer.
    * Parameter:
    * void
    * Return:
    * Clone-Object
    */
    clone() {
        return new NadamOptimizer(this.learningRate, this.beta1, this.beta2);
    }
    /*
    * Perform an optimization step with given parameters.
    * Parameter:
    * iteration: Current iteration - 1 e.g. [0, 1, 2, ...]
    * currentValue: Current coefficient value which need to be optimized
    * gradient: The gradient of current coefficient value
    * Return:
    * The optimized value
    */
    optimize(iteration, currentValue, gradient) {
        SMathJsUtils.isValidNumber(iteration);
        SMathJsUtils.isValidNumber(currentValue);
        SMathJsUtils.isValidNumber(gradient);
        this.mT = this.beta1 * this.mT + (1.0 - this.beta1) * gradient;
        this.vT = this.beta2 * this.vT + (1.0 - this.beta2) * Math.pow(gradient, 2);
        var n = (this.learningRate / Math.pow((this.vT / (1.0 - Math.pow(this.beta2, iteration + 1))), 0.5) + 1e-8) * (this.beta1 * (this.mT / (1.0 - Math.pow(this.beta1, iteration + 1))) + (1.0 - this.beta1) * gradient / (1.0 - Math.pow(this.beta1, iteration + 1)));
		return currentValue - n;
	}
}
/*
 * Class providing the Nesterov optimizer
 */
class NesterovOptimizer {
    /*
    * Constructor.
    * Parameter:
    * learningRate: The learning rate
    * gamma: Gamma parameter
    */
    constructor(learningRate=0.001, gamma=0.9) {
        SMathJsUtils.isValidNumber(learningRate);
        SMathJsUtils.isValidNumber(gamma);
        this.learningRate = learningRate;
        this.gamma = gamma;
		this.v = 0;
    }
    /*
    * Clone the optimizer.
    * Parameter:
    * void
    * Return:
    * Clone-Object
    */
    clone() {
        return new NesterovOptimizer(this.learningRate, this.gamma);
    }
    /*
    * Perform an pre-optimization.
    * Parameter:
    * currentValue: Current coefficient value which need to be pre-optimized
    * Return:
    * The pre-optimized value
    */
	gradientPreCalculation(currentValue) {
        SMathJsUtils.isValidNumber(currentValue);
		return currentValue - (this.gamma * this.v);
	}
    /*
    * Perform an optimization step with given parameters.
    * Parameter:
    * iteration: Current iteration - 1 e.g. [0, 1, 2, ...]
    * currentValue: Current coefficient value which need to be optimized
    * gradient: The gradient of current coefficient value
    * Return:
    * The optimized value
    */
    optimize(iteration, currentValue, gradient) {
        SMathJsUtils.isValidNumber(iteration);
        SMathJsUtils.isValidNumber(currentValue);
        SMathJsUtils.isValidNumber(gradient);
		this.v = this.learningRate * gradient;
		return currentValue - this.v;
	}
}
/*
 * Class providing the Rmsprop optimizer
 */
class RmspropOptimizer {
    /*
    * Constructor.
    * Parameter:
    * learningRate: The learning rate
    * gamma: Gamma parameter
    */
    constructor(learningRate=0.001, gamma=0.9) {
        SMathJsUtils.isValidNumber(learningRate);
        SMathJsUtils.isValidNumber(gamma);
        this.learningRate = learningRate;
        this.gamma = gamma;
		this.rmsprop = 0;
    }
    /*
    * Clone the optimizer.
    * Parameter:
    * void
    * Return:
    * Clone-Object
    */
    clone() {
        return new RmspropOptimizer(this.learningRate, this.gamma);
    }
    /*
    * Perform an optimization step with given parameters.
    * Parameter:
    * iteration: Current iteration - 1 e.g. [0, 1, 2, ...]
    * currentValue: Current coefficient value which need to be optimized
    * gradient: The gradient of current coefficient value
    * Return:
    * The optimized value
    */
    optimize(iteration, currentValue, gradient) {
        SMathJsUtils.isValidNumber(iteration);
        SMathJsUtils.isValidNumber(currentValue);
        SMathJsUtils.isValidNumber(gradient);
        this.rmsprop = this.gamma * this.rmsprop + (1.0 - this.gamma) * Math.pow(gradient, 2);
        gradient = (this.learningRate / (Math.pow(this.rmsprop, 0.5) + 1e-8)) * gradient;
		return currentValue - gradient;
	}
}
/*
 * Class providing the Vanilla optimizer
 */
class VanillaOptimizer {
    /*
    * Constructor.
    * Parameter:
    * learningRate: The learning rate
    */
    constructor(learningRate=0.001) {
        SMathJsUtils.isValidNumber(learningRate);
        this.learningRate = learningRate;
    }
    /*
    * Clone the optimizer.
    * Parameter:
    * void
    * Return:
    * Clone-Object
    */
    clone() {
        return new VanillaOptimizer(this.learningRate);
    }
    /*
    * Perform an optimization step with given parameters.
    * Parameter:
    * iteration: Current iteration - 1 e.g. [0, 1, 2, ...]
    * currentValue: Current coefficient value which need to be optimized
    * gradient: The gradient of current coefficient value
    * Return:
    * The optimized value
    */
    optimize(iteration, currentValue, gradient) {
        SMathJsUtils.isValidNumber(iteration);
        SMathJsUtils.isValidNumber(currentValue);
        SMathJsUtils.isValidNumber(gradient);
        return currentValue - (gradient * this.learningRate);
    }
}