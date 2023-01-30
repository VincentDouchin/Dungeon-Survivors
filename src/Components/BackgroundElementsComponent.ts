import { Component, Entity } from "../Globals/ECS";

import { makeNoise2D } from 'open-simplex-noise'

class BackgroundElementsComponent extends Component {
	entities: Record<string, Entity> = {}
	noise = makeNoise2D(Date.now())
	elements: ((x: number, y: number, noise: number) => Entity)[] = []
	size: number
	constructor(size: number, elements: ((x: number, y: number, noise: number) => Entity)[]) {
		super()
		this.elements = elements
		this.size = size

	}
}
BackgroundElementsComponent.register()
export default BackgroundElementsComponent