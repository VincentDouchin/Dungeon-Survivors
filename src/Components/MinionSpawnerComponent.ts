import { Component } from '../Globals/ECS'
import { EnemyType } from '../Constants/Enemies'

class MinionSpawnerComponent extends Component {
	minion: EnemyType
	distance: number
	delay: number
	timer = 0
	constructor(minion: EnemyType, distance: number, delay: number) {
		super()
		this.minion = minion
		this.distance = distance
		this.delay = delay
	}
}
MinionSpawnerComponent.register()
export default MinionSpawnerComponent