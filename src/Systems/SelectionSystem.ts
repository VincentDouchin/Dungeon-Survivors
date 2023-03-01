import { ECS, Entity, System } from "../Globals/ECS";
import ECSEVENTS, { DESELECTED, SELECTED } from "../Constants/ECSEvents";
import INPUTS, { VALIDATE } from "../Constants/InputsNames";
import { inputManager, soundManager } from "../Globals/Initialize";

import { ALLSOUNDS } from "../Globals/Sounds";
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
		ECS.eventBus.subscribe<SELECTED>(ECSEVENTS.SELECTED, entity => {
			if (this.selectedEntity) {
				ECS.eventBus.publish<DESELECTED>(ECSEVENTS.DESELECTED, this.selectedEntity)
			}
			this.selectedEntity = entity
		})
	}
	update(entities: Entity[]) {
		for (const entity of entities) {
			const selectable = entity.getComponent(SelectableComponent)
			const sprite = entity.getComponent(SpriteComponent)
			if (this.hovered.includes(sprite?.mesh.id)) {
				ECS.eventBus.publish<SELECTED>(ECSEVENTS.SELECTED, entity)
				this.hovered.splice(this.hovered.indexOf(sprite.mesh.id), 1)
			}
			if (entity.id === this.selectedEntity?.id) {
				if (this.clicked.includes(sprite.mesh.id) || inputManager.getInput(VALIDATE)?.once) {
					soundManager.play(ALLSOUNDS.Validate)
					if (selectable.onValidated) selectable.onValidated()
				}
				selectable.selectedTile && sprite.changeTexture(selectable.selectedTile.texture)
				for (let input of INPUTS) {
					if (inputManager.getInput(input)?.once) {
						const nextEntity = selectable.next[input]
						if (nextEntity) {
							soundManager.play(ALLSOUNDS.Select)
							ECS.eventBus.publish<SELECTED>(ECSEVENTS.SELECTED, nextEntity)
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