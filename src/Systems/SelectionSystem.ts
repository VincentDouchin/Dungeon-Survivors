import { ECS, Entity, System } from "../Globals/ECS";
import { inputManager, soundManager } from "../Globals/Initialize";

import { ALLSOUNDS } from "../Globals/Sounds";
import { ECSEVENTS } from "../Constants/Events";
import INPUTS from "../Constants/InputsNames";
import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";

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
		ECS.eventBus.subscribe(ECSEVENTS.SELECTED, entity => {
			if (this.selectedEntity) {
				ECS.eventBus.publish(ECSEVENTS.DESELECTED, this.selectedEntity)
			}
			this.selectedEntity = entity
		})
	}
	update(entities: Entity[]) {
		for (const entity of entities) {
			const selectable = entity.getComponent(SelectableComponent)
			const sprite = entity.getComponent(SpriteComponent)
			if (this.hovered.includes(sprite?.mesh.id) || this.clicked.includes(sprite?.mesh.id)) {
				ECS.eventBus.publish(ECSEVENTS.SELECTED, entity)
				this.hovered.splice(this.hovered.indexOf(sprite.mesh.id), 1)
			}
			if (entity.id === this.selectedEntity?.id) {
				if (this.clicked.includes(sprite.mesh.id)) {
					inputManager.eventBus.publish(INPUTS.VALIDATE, true)
					this.clicked.splice(this.clicked.indexOf(sprite.mesh.id), 1)
				}
				if (inputManager.getInput(INPUTS.VALIDATE)?.once) {
					soundManager.play(ALLSOUNDS.Validate)
					if (selectable.onValidated) selectable.onValidated()
				}
				selectable.selectedTile && sprite.changeTexture(selectable.selectedTile.texture)
				for (let input of Object.values(INPUTS)) {
					if (inputManager.getInput(input)?.once) {
						const nextEntity = selectable.next[input]
						if (nextEntity) {
							soundManager.play(ALLSOUNDS.Select)
							ECS.eventBus.publish(ECSEVENTS.SELECTED, nextEntity)
						}

					}
				}
			} else {
				selectable?.unSelectedTile && sprite.changeTexture(selectable.unSelectedTile.texture)
			}
		}
		this.clicked = []





	}
}
export default SelectionSystem