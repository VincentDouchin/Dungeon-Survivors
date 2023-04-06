/* eslint-disable */
// @ts-nocheck

export const linear = function (t, b, _c, d) {
	var c = _c - b;
	return c * t / d + b;
}
export const easeInQuad = function (t, b, _c, d) {
	var c = _c - b;
	return c * (t /= d) * t + b;
}
export const easeOutQuad = function (t, b, _c, d) {
	var c = _c - b;
	return -c * (t /= d) * (t - 2) + b;
}
export const easeInOutQuad = function (t, b, _c, d) {
	var c = _c - b;
	if ((t /= d / 2) < 1) {
		return c / 2 * t * t + b;
	} else {
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	}
}
export const easeInCubic = function (t, b, _c, d) {
	var c = _c - b;
	return c * (t /= d) * t * t + b;
}
export const easeOutCubic = function (t, b, _c, d) {
	var c = _c - b;
	return c * ((t = t / d - 1) * t * t + 1) + b;
}
export const easeInOutCubic = function (t, b, _c, d) {
	var c = _c - b;
	if ((t /= d / 2) < 1) {
		return c / 2 * t * t * t + b;
	} else {
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}
}
export const easeInQuart = function (t, b, _c, d) {
	var c = _c - b;
	return c * (t /= d) * t * t * t + b;
}
export const easeOutQuart = function (t, b, _c, d) {
	var c = _c - b;
	return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}
export const easeInOutQuart = function (t, b, _c, d) {
	var c = _c - b;
	if ((t /= d / 2) < 1) {
		return c / 2 * t * t * t * t + b;
	} else {
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}
}
export const easeInQuint = function (t, b, _c, d) {
	var c = _c - b;
	return c * (t /= d) * t * t * t * t + b;
}
export const easeOutQuint = function (t, b, _c, d) {
	var c = _c - b;
	return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}
export const easeInOutQuint = function (t, b, _c, d) {
	var c = _c - b;
	if ((t /= d / 2) < 1) {
		return c / 2 * t * t * t * t * t + b;
	} else {
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}
}
export const easeInSine = function (t, b, _c, d) {
	var c = _c - b;
	return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}
export const easeOutSine = function (t, b, _c, d) {
	var c = _c - b;
	return c * Math.sin(t / d * (Math.PI / 2)) + b;
}
export const easeInOutSine = function (t, b, _c, d) {
	var c = _c - b;
	return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}
export const easeInExpo = function (t, b, _c, d) {
	var c = _c - b;
	return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}
export const easeOutExpo = function (t, b, _c, d) {
	var c = _c - b;
	return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}
export const easeInOutExpo = function (t, b, _c, d) {
	var c = _c - b;
	if (t === 0) {
		return b;
	}
	if (t === d) {
		return b + c;
	}
	if ((t /= d / 2) < 1) {
		return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	} else {
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
}
export const easeInCirc = function (t, b, _c, d) {
	var c = _c - b;
	return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}
export const easeOutCirc = function (t, b, _c, d) {
	var c = _c - b;
	return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}
export const easeInOutCirc = function (t, b, _c, d) {
	var c = _c - b;
	if ((t /= d / 2) < 1) {
		return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	} else {
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}
}
export const easeInElastic = function (t, b, _c, d) {
	var c = _c - b;
	var a, p, s;
	s = 1.70158;
	p = 0;
	a = c;
	if (t === 0) {
		return b;
	} else if ((t /= d) === 1) {
		return b + c;
	}
	if (!p) {
		p = d * 0.3;
	}
	if (a < Math.abs(c)) {
		a = c;
		s = p / 4;
	} else {
		s = p / (2 * Math.PI) * Math.asin(c / a);
	}
	return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}
export const easeOutElastic = function (t, b, _c, d) {
	var c = _c - b;
	var a, p, s;
	s = 1.70158;
	p = 0;
	a = c;
	if (t === 0) {
		return b;
	} else if ((t /= d) === 1) {
		return b + c;
	}
	if (!p) {
		p = d * 0.3;
	}
	if (a < Math.abs(c)) {
		a = c;
		s = p / 4;
	} else {
		s = p / (2 * Math.PI) * Math.asin(c / a);
	}
	return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
}
export const easeInOutElastic = function (t, b, _c, d) {
	var c = _c - b;
	var a, p, s;
	s = 1.70158;
	p = 0;
	a = c;
	if (t === 0) {
		return b;
	} else if ((t /= d / 2) === 2) {
		return b + c;
	}
	if (!p) {
		p = d * (0.3 * 1.5);
	}
	if (a < Math.abs(c)) {
		a = c;
		s = p / 4;
	} else {
		s = p / (2 * Math.PI) * Math.asin(c / a);
	}
	if (t < 1) {
		return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	} else {
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	}
}
export const easeInBack = function (t, b, _c, d, s) {
	var c = _c - b;
	if (s === void 0) {
		s = 1.70158;
	}
	return c * (t /= d) * t * ((s + 1) * t - s) + b;
}
export const easeOutBack = function (t, b, _c, d, s) {
	var c = _c - b;
	if (s === void 0) {
		s = 1.70158;
	}
	return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}
export const easeInOutBack = function (t, b, _c, d, s) {
	var c = _c - b;
	if (s === void 0) {
		s = 1.70158;
	}
	if ((t /= d / 2) < 1) {
		return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	} else {
		return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	}
}
export const easeInBounce = function (t, b, _c, d) {
	var c = _c - b;
	var v;
	v = easeOutBounce(d - t, 0, c, d);
	return c - v + b;
}
export const easeOutBounce = function (t, b, _c, d) {
	var c = _c - b;
	if ((t /= d) < 1 / 2.75) {
		return c * (7.5625 * t * t) + b;
	} else if (t < 2 / 2.75) {
		return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
	} else if (t < 2.5 / 2.75) {
		return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
	} else {
		return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
	}
}
export const easeInOutBounce = function (t, b, _c, d) {
	var c = _c - b;
	var v;
	if (t < d / 2) {
		v = easeInBounce(t * 2, 0, c, d);
		return v * 0.5 + b;
	} else {
		v = easeOutBounce(t * 2 - d, 0, c, d);
		return v * 0.5 + c * 0.5 + b;
	}
}