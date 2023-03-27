import { ECS, System } from '../Globals/ECS'

import AIMovementComponent from '../Components/AIMovementComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import CameraTargetComponent from '../Components/CameraTargetComponent'
import { ECSEVENTS } from '../Constants/Events'
import type { Entity } from '../Globals/ECS'
import INPUTS from '../Constants/InputsNames'
import OutlineShader from '../Shaders/OutlineShader'
import PlayerControllerComponent from '../Components/PlayerControllerComponent'
import RangedComponent from '../Components/RangedComponent'
import SpellComponent from '../Components/SpellComponent'
import SpriteComponent from '../Components/SpriteComponent'
import State from '../Globals/State'
import SwitchingComponent from '../Components/SwitchingComponent'
import { inputManager } from '../Globals/Initialize'

class SwitchingSystem extends System {
	// main?: Entity
	setFollower: Entity | null = null
	constructor() {
		super(SwitchingComponent)
	}

	update(entities: Entity[]) {
		const toSwitch = inputManager.getInput(INPUTS.SWITCH)?.once && entities.length > 1 && !State.multiplayer

		const needsSwitch = entities.every((entity) => {
			const switcher = entity.getComponent(SwitchingComponent)
			return switcher.initiated && !switcher.main
		})
		if (this.setFollower) {
			this.setFollower.getComponent(AIMovementComponent).follower = entities.find(other => other !== this.setFollower && other.getComponent(SwitchingComponent).main)
			this.setFollower = null
		}
		entities.forEach((entity) => {
			const switcher = entity.getComponent(SwitchingComponent)
			if (!switcher.initiated) {
				this.addComponents(entity, switcher.main, switcher.index)
				switcher.initiated = true
			}
			if (toSwitch) {
				switcher.main = !switcher.main
				this.addComponents(entity, switcher.main, switcher.index)
			}
			if (needsSwitch && !switcher.main) {
				this.addComponents(entity, true, switcher.index)
				switcher.main = true
			}
		})
	}

	addComponents(entity: Entity, main: boolean, index: number) {
		if (main) {
			const spell = entity.getComponent(SpellComponent)
			ECS.eventBus.publish(ECSEVENTS.SPELL_ICON, spell.icon)
			entity.addComponent(new PlayerControllerComponent(State.multiplayer ? index : undefined))
			entity.getComponent(SpriteComponent).addShader(new OutlineShader([1, 1, 1, 1]))
			entity.addComponent(new CameraTargetComponent())
			entity.removeComponent(AIMovementComponent)
		}
		else {
			const ranged = entity.getComponent(RangedComponent)
			entity.addComponent(new AIMovementComponent({ seeking: [COLLISIONGROUPS.ENEMY], seekingDistance: ranged ? 50 : 30, followingDistance: 70 }))
			this.setFollower = entity
			entity.getComponent(SpriteComponent).removeShader(OutlineShader)
			entity.removeComponent(CameraTargetComponent)
			entity.removeComponent(PlayerControllerComponent)
		}
	}
}
export default SwitchingSystem
