import { Vector2 } from 'three'
import type { Entity } from '../Globals/ECS'
import { Component } from '../Globals/ECS'

interface AIOption {
	seeking?: number[]
	seekingDistance?: number
	follower?: Entity
	followingDistance?: number
	followingFactor?: number
	charger?: boolean
	avoidWalls?: boolean
}

class AIMovementComponent extends Component {
	enabled = true
	seeking?: number[]
	seekingDistance?: number
	follower?: Entity
	followingDistance: number
	followingFactor: Vector2
	charger: boolean
	chargingDirection: Vector2 | null = null
	chargingTimer = 0
	chargingResetTimer = 0
	avoidWalls: boolean
	constructor(options: AIOption) {
		super()
		this.seeking = options.seeking
		this.seekingDistance = options.seekingDistance
		this.follower = options.follower
		this.followingDistance = options.followingDistance ?? 50
		this.followingFactor = new Vector2(options.followingFactor ?? 1, options.followingFactor ?? 1)
		this.charger = options.charger ?? false
		this.avoidWalls = options.avoidWalls ?? true
	}
}
AIMovementComponent.register()
export default AIMovementComponent
