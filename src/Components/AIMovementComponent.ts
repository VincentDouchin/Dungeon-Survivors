import { Component, Entity } from "../Globals/ECS";

import { Vector2 } from "three";

interface AIOption {
	seeking?: number
	seekingDistance?: number
	follower?: Entity
	followingDistance?: number
	followingFactor?: number
}

class AIMovementComponent extends Component {
	enabled = true
	seeking?: number
	seekingDistance?: number
	follower?: Entity
	followingDistance: number
	followingFactor: Vector2
	constructor(options: AIOption) {
		super()
		this.seeking = options.seeking
		this.seekingDistance = options.seekingDistance
		this.follower = options.follower
		this.followingDistance = options.followingDistance ?? 50
		this.followingFactor = new Vector2(options.followingFactor ?? 1, options.followingFactor ?? 1)
	}
}
AIMovementComponent.register()
export default AIMovementComponent