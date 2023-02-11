import { Component, ECS, Entity } from "../Globals/ECS";
import ECSEVENTS, { SELECTED } from "../Constants/ECSEvents";
import { MOVELEFT, MOVERIGHT } from "../Constants/InputsNames";

import Tile from "../Utils/Tile";

class SelectableComponent extends Component {
	selectedTile: Tile
	unSelectedTile: Tile
	onValidated: () => void
	next: Partial<{ [key: string]: Entity }> = {}
	parentId?: string
	constructor(selectedTile: Tile, unSelectedTile: Tile, fn: () => void) {
		super()
		this.selectedTile = selectedTile
		this.unSelectedTile = unSelectedTile
		this.onValidated = fn

	}
	static setFromArray(arr: Entity[]) {
		arr.forEach((entity, index) => {
			if (index === 0) {
				ECS.eventBus.publish<SELECTED>(ECSEVENTS.SELECTED, entity)
			}
			const selectable = entity.getComponent(SelectableComponent)
			selectable.next[MOVELEFT] = arr.at(index - 1)
			selectable.next[MOVERIGHT] = arr.at((index + 1) % arr.length)
		})
	}

}




SelectableComponent.register()
export default SelectableComponent