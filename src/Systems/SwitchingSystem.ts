import { ECS, Entity, System } from "../Globals/ECS";

import AIMovementComponent from "../Components/AIMovementComponent";
import COLLISIONGROUPS from "../Constants/CollisionGroups";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import { ECSEVENTS } from "../Constants/Events";
import INPUTS from "../Constants/InputsNames";
import OutlineShader from "../Shaders/OutlineShader";
import PlayerControllerComponent from "../Components/PlayerControllerComponent";
import SpellComponent from "../Components/SpellComponent";
import SpriteComponent from "../Components/SpriteComponent";
import SwitchingComponent from "../Components/SwitchingComponent";
import TargeterComponent from "../Components/TargeterComponent";
import { inputManager } from "../Globals/Initialize";

class SwitchingSystem extends System {
	// main?: Entity
	setFollower: Entity | null = null
	constructor() {
		super(SwitchingComponent)
	}
	update(entities: Entity[]) {
		const toSwitch = inputManager.getInput(INPUTS.SWITCH)!.once
		const canSwitch = entities.length > 1
		const needsSwitch = !entities.some(entity => {
			const switcher = entity.getComponent(SwitchingComponent)
			return switcher.initiated && !switcher.main
		})
		if (this.setFollower) {
			this.setFollower.getComponent(AIMovementComponent).follower = entities.find(other => other !== this.setFollower && other.getComponent(SwitchingComponent).main)
			console.log(this.setFollower.getComponent(AIMovementComponent).follower)
			this.setFollower = null
		}

		if (!canSwitch && !needsSwitch) return
		entities.forEach(entity => {
			const switcher = entity.getComponent(SwitchingComponent)
			if (toSwitch || !switcher.initiated || (!canSwitch && needsSwitch)) {
				if (!switcher.initiated) {
					switcher.initiated = true
				} else {
					switcher.main = !switcher.main
				}
				const spell = entity.getComponent(SpellComponent)
				if (switcher.main) {
					ECS.eventBus.publish(ECSEVENTS.SPELL_ICON, spell.icon)
					entity.addComponent(new PlayerControllerComponent())
					entity.removeComponent(TargeterComponent)
					entity.getComponent(SpriteComponent).addShader(new OutlineShader([1, 1, 1, 1]))
					entity.addComponent(new CameraTargetComponent())
					entity.removeComponent(AIMovementComponent)
				} else {
					entity.addComponent(new AIMovementComponent({ seeking: COLLISIONGROUPS.ENEMY, seekingDistance: 50, followingDistance: 70 }))
					this.setFollower = entity
					entity.getComponent(SpriteComponent).removeShader(OutlineShader)
					entity.removeComponent(CameraTargetComponent)
					entity.removeComponent(PlayerControllerComponent)
				}
			}

		})

	}
}
export default SwitchingSystem