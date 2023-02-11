import { Entity, System } from "../Globals/ECS";

import INPUTS from "../Constants/InputsNames";
import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";
import { inputManager } from "../Globals/Initialize";

class SelectionSystem extends System {
	selectedEntity?: Entity
	constructor() {
		super(SelectableComponent)
	}
	update(entities: Entity[]) {
		this.selectedEntity ??= entities.find(entity => entity.getComponent(SelectableComponent).selected)
		if (!this.selectedEntity) return
		for (let input in INPUTS) {
			const nextEntity: Entity | undefined = this.selectedEntity!.getComponent(SelectableComponent).next[input]
			if (nextEntity) {
				if (inputManager.getInput(input)?.once) {
					const currentSelectable = this.selectedEntity.getComponent(SelectableComponent)
					const currentSprite = this.selectedEntity.getComponent(SpriteComponent)
					currentSprite.uniforms.uTexture = currentSelectable.unSelectedTile.textures[0]
					currentSelectable.selected = false

					const nextSelectable = nextEntity.getComponent(SelectableComponent)
					const nextSprite = nextEntity.getComponent(SpriteComponent)
					nextSelectable.selected = true
					nextSprite.uniforms.uTexture = currentSelectable.selectedTile.textures[0]
					this.selectedEntity = nextEntity
				}

			}
		}

	}
}
export default SelectionSystem