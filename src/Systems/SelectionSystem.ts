import type { Entity } from '../Globals/ECS'
import { ECS, System } from '../Globals/ECS'
import { inputManager, soundManager } from '../Globals/Initialize'

import { ECSEVENTS } from '../Constants/Events'
import INPUTS from '../Constants/InputsNames'
import { SOUNDS } from '../Constants/Sounds'
import SelectableComponent from '../Components/SelectableComponent'
import SpriteComponent from '../Components/SpriteComponent'

class SelectionSystem extends System {
	selectedEntity: Entity | null = null

	hovered: number[] = []
	clicked: number[] = []
	constructor() {
		super(SelectableComponent)
		this.subscribe('move', ({ uiObjects, objects }: TouchCoord) => {
			this.hovered = [...uiObjects, ...objects]
			this.clicked = []
		})
		this.subscribe('down', ({ uiObjects, objects }: TouchCoord) => {
			this.clicked = [...uiObjects, ...objects]
		})
		this.subscribe(ECSEVENTS.SELECTED, (entity) => {
			const selectable = entity.getComponent(SelectableComponent)
			if (selectable.onSelected) {
				selectable.onSelected()
			}
			if (this.selectedEntity) {
				ECS.eventBus.publish(ECSEVENTS.DESELECTED, this.selectedEntity)
			}
			this.selectedEntity = entity
			const sprite = entity.getComponent(SpriteComponent)
			selectable?.selectedTile && sprite.changeTexture(selectable.selectedTile.texture)
		})
		this.subscribe(ECSEVENTS.DESELECTED, (entity) => {
			if (this.selectedEntity === entity) {
				this.selectedEntity = null
			}
			const selectable = entity.getComponent(SelectableComponent)
			const sprite = entity.getComponent(SpriteComponent)
			selectable?.unSelectedTile && sprite.changeTexture(selectable.unSelectedTile.texture)
		})
	}

	update(entities: Entity[]) {
		let soundplayed = false

		for (const entity of entities) {
			const selectable = entity.getComponent(SelectableComponent)
			const sprite = entity.getComponent(SpriteComponent)
			if (this.hovered.includes(sprite?.mesh.id) || this.clicked.includes(sprite?.mesh.id)) {
				ECS.eventBus.publish(ECSEVENTS.SELECTED, entity)
			}
			if (entity.id === this.selectedEntity?.id) {
				if (this.clicked.includes(sprite.mesh.id)) {
					ECS.eventBus.publish(INPUTS.VALIDATE, 1)
					this.clicked.splice(this.clicked.indexOf(sprite.mesh.id), 1)
				}
				if (inputManager.getInput(INPUTS.VALIDATE)?.once) {
					if (selectable.onValidated) {
						if (!soundplayed) {
							soundManager.play('effect', SOUNDS.Validate)
							soundplayed = true
						}
						selectable.onValidated()
					}
				}

				for (const input of Object.values(INPUTS)) {
					if (inputManager.getInput(input)?.once) {
						const nextEntity = selectable.next[input]
						if (nextEntity) {
							soundManager.play('effect', SOUNDS.Select)
							ECS.eventBus.publish(ECSEVENTS.SELECTED, nextEntity)
							return
						}
					}
				}
			}
		}
		this.clicked = []
	}
}
export default SelectionSystem
