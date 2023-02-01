import { Component, Entity } from "../Globals/ECS";

import { makeNoise2D } from 'open-simplex-noise'

class BackgroundElementsComponent extends Component {
	entities: Record<string, Entity> = {}
	noise = makeNoise2D(Date.now())
	elements: ((x: number, y: number) => Entity)[] = []
	size: number
	obstaclesDensity: number
	constructor(size: number, obstaclesDensity: number, elements: ((x: number, y: number) => Entity)[]) {
		super()
		this.elements = elements
		this.size = size
		this.obstaclesDensity = obstaclesDensity

	}
}
BackgroundElementsComponent.register()
export default BackgroundElementsComponent