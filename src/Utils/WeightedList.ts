class WeightedList<T>{
	elements: T[] = []
	weights: number[] = []
	add(element: T, weight: number = 1) {
		this.weights.push(...new Array(weight).fill(this.elements.length))
		this.elements.push(element)
		return this
	}
	pick() {
		const randomIndex = this.weights[Math.floor(Math.random() * this.weights.length)]
		return this.elements[randomIndex]
	}
	get length() {
		return this.elements.length
	}
}

export default WeightedList