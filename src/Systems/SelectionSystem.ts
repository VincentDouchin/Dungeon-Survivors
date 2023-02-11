import { ECS, Entity, System } from "../Globals/ECS";
import ECSEVENTS, { SELECTED } from "../Constants/ECSEvents";
import INPUTS, { VALIDATE } from "../Constants/InputsNames";

import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";
import { inputManager } from "../Globals/Initialize";

class SelectionSystem extends System {
	selectedEntity?: Entity
	hovered: number[] = []
	clicked: number[] = []
	constructor() {
		super(SelectableComponent)
		inputManager.eventBus.subscribe('move', ({ uiObjects, objects }: TouchCoord) => {
			this.hovered = [...uiObjects, ...objects]
		})
		inputManager.eventBus.subscribe('down', ({ uiObjects, objects }: TouchCoord) => {
			this.clicked = [...uiObjects, ...objects]
		})
		ECS.eventBus.subscribe<SELECTED>(ECSEVENTS.SELECTED, entity => {
			this.selectedEntity = entity
		})
	}
	update(entities: Entity[]) {
		for (const entity of entities) {
			const selectable = entity.getComponent(SelectableComponent)
			const sprite = entity.getComponent(SpriteComponent)

			if (this.hovered.includes(sprite?.mesh.id)) {
				this.selectedEntity = entity
			}
			if (entity.id === this.selectedEntity?.id) {
				if (this.clicked.includes(sprite.mesh.id) || inputManager.getInput(VALIDATE)?.once) {
					selectable.onValidated()
					this.clicked = []
					break
				}
				sprite.uniforms.uTexture = selectable.selectedTile.texture
				for (let input of INPUTS) {
					if (inputManager.getInput(input)?.once) {
						const nextEntity = selectable.next[input]
						if (nextEntity) {
							this.selectedEntity = nextEntity
						}

					}
				}
			} else {
				sprite.uniforms.uTexture = selectable.unSelectedTile.texture
			}
		}





	}
}
export default SelectionSystem