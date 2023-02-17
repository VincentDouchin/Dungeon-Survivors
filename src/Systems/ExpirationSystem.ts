import { Entity, System } from "../Globals/ECS";

import ExpirationComponent from "../Components/ExpirationComponent";

class ExpirationSystem extends System {
	constructor() {
		super(ExpirationComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const timer = entity.getComponent(ExpirationComponent)
			timer.timer--
			if (timer.timer === 0) {
				entity.destroy()
			}
		})
	}
}
export default ExpirationSystem