import { JointData } from "@dimforge/rapier2d-compat";
import BodyComponent from "../Components/BodyComponent";
import PositionComponent from "../Components/PositionComponent";
import WeaponControllerComponent from "../Components/WeaponControllerComponent";
import { System, Entity } from "../Globals/ECS";
import { world } from "../Globals/Initialize";

class BodyCreationSystem extends System {
	constructor() {
		super(BodyComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const body = entity.getComponent(BodyComponent)
			const position = entity.getComponent(PositionComponent)
			const weaponController = entity.getComponent(WeaponControllerComponent)
			if (!body.body && position) {
				body.bodyDescription.setTranslation(position.x, position.y)
				body.body = world.createRigidBody(body.bodyDescription)
			}
			if (!body.collider && body.body) [
				body.collider = world.createCollider(body.colliderDescription, body.body)
			]
			if (weaponController?.owner && !body.body) {
				const ownerPosition = weaponController.owner.getComponent(PositionComponent)
				entity.addComponent(new PositionComponent(ownerPosition.x, ownerPosition.y))
			}
			if (!weaponController?.joint && body.body && weaponController?.owner) {
				const ownerBody = weaponController.owner.getComponent(BodyComponent)
				if (!ownerBody.body) return
				const params = JointData.revolute({ x: 0.0, y: 0.0 }, { x: body.height / 2 + ownerBody.height / 2, y: 0 })
				weaponController.joint = world.createImpulseJoint(params, ownerBody.body, body.body, true)

			}


		})
	}
}
export default BodyCreationSystem