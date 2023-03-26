type tweenFunction = (time: number, start: number, end: number, delay: number, s?: number) => number
export const linear: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return c * t / d + b
}
export const easeInQuad: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return c * (t /= d) * t + b
}
export const easeOutQuad: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return -c * (t /= d) * (t - 2) + b
}
export const easeInOutQuad: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	if ((t /= d / 2) < 1) {
		return c / 2 * t * t + b
	}
	else {
		return -c / 2 * ((--t) * (t - 2) - 1) + b
	}
}
export const easeInCubic: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return c * (t /= d) * t * t + b
}
export const easeOutCubic: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return c * ((t = t / d - 1) * t * t + 1) + b
}
export const easeInOutCubic: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	if ((t /= d / 2) < 1) {
		return c / 2 * t * t * t + b
	}
	else {
		return c / 2 * ((t -= 2) * t * t + 2) + b
	}
}
export const easeInQuart: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return c * (t /= d) * t * t * t + b
}
export const easeOutQuart: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return -c * ((t = t / d - 1) * t * t * t - 1) + b
}
export const easeInOutQuart: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	if ((t /= d / 2) < 1) {
		return c / 2 * t * t * t * t + b
	}
	else {
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b
	}
}
export const easeInQuint: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return c * (t /= d) * t * t * t * t + b
}
export const easeOutQuint: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return c * ((t = t / d - 1) * t * t * t * t + 1) + b
}
export const easeInOutQuint: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	if ((t /= d / 2) < 1) {
		return c / 2 * t * t * t * t * t + b
	}
	else {
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
	}
}
export const easeInSine: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
}
export const easeOutSine: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return c * Math.sin(t / d * (Math.PI / 2)) + b
}
export const easeInOutSine: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
}
export const easeInExpo: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return (t == 0) ? b : c * 2 ** (10 * (t / d - 1)) + b
}
export const easeOutExpo: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return (t == d) ? b + c : c * (-(2 ** (-10 * t / d)) + 1) + b
}
export const easeInOutExpo: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	if (t === 0) {
		return b
	}
	if (t === d) {
		return b + c
	}
	if ((t /= d / 2) < 1) {
		return c / 2 * 2 ** (10 * (t - 1)) + b
	}
	else {
		return c / 2 * (-(2 ** (-10 * --t)) + 2) + b
	}
}
export const easeInCirc: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
}
export const easeOutCirc: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
}
export const easeInOutCirc: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	if ((t /= d / 2) < 1) {
		return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
	}
	else {
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
	}
}
export const easeInElastic: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	let a, p, s
	s = 1.70158
	p = 0
	a = c
	if (t === 0) {
		return b
	}
	else if ((t /= d) === 1) {
		return b + c
	}
	if (!p) {
		p = d * 0.3
	}
	if (a < Math.abs(c)) {
		a = c
		s = p / 4
	}
	else {
		s = p / (2 * Math.PI) * Math.asin(c / a)
	}
	return -(a * 2 ** (10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
}
export const easeOutElastic: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	let a, p, s
	s = 1.70158
	p = 0
	a = c
	if (t === 0) {
		return b
	}
	else if ((t /= d) === 1) {
		return b + c
	}
	if (!p) {
		p = d * 0.3
	}
	if (a < Math.abs(c)) {
		a = c
		s = p / 4
	}
	else {
		s = p / (2 * Math.PI) * Math.asin(c / a)
	}
	return a * 2 ** (-10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
}
export const easeInOutElastic: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	let a, p, s
	s = 1.70158
	p = 0
	a = c
	if (t === 0) {
		return b
	}
	else if ((t /= d / 2) === 2) {
		return b + c
	}
	if (!p) {
		p = d * (0.3 * 1.5)
	}
	if (a < Math.abs(c)) {
		a = c
		s = p / 4
	}
	else {
		s = p / (2 * Math.PI) * Math.asin(c / a)
	}
	if (t < 1) {
		return -0.5 * (a * 2 ** (10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
	}
	else {
		return a * 2 ** (-10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b
	}
}
export const easeInBack: tweenFunction = function (t, b, _c, d, s) {
	const c = _c - b
	if (s === void 0) {
		s = 1.70158
	}
	return c * (t /= d) * t * ((s + 1) * t - s) + b
}
export const easeOutBack: tweenFunction = function (t, b, _c, d, s) {
	const c = _c - b
	if (s === void 0) {
		s = 1.70158
	}
	return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
}
export const easeInOutBack: tweenFunction = function (t, b, _c, d, s) {
	const c = _c - b
	if (s === void 0) {
		s = 1.70158
	}
	if ((t /= d / 2) < 1) {
		return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b
	}
	else {
		return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
	}
}
export const easeInBounce: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	const v = easeOutBounce(d - t, 0, c, d)
	return c - v + b
}
export const easeOutBounce: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	if ((t /= d) < 1 / 2.75) {
		return c * (7.5625 * t * t) + b
	}
	else if (t < 2 / 2.75) {
		return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
	}
	else if (t < 2.5 / 2.75) {
		return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
	}
	else {
		return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
	}
}
export const easeInOutBounce: tweenFunction = function (t, b, _c, d) {
	const c = _c - b
	let v
	if (t < d / 2) {
		v = easeInBounce(t * 2, 0, c, d)
		return v * 0.5 + b
	}
	else {
		v = easeOutBounce(t * 2 - d, 0, c, d)
		return v * 0.5 + c * 0.5 + b
	}
}
