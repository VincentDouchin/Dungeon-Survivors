import { Component, ECS, Entity } from "../Globals/ECS";

import { ECSEVENTS } from "../Constants/Events";
import INPUTS from "../Constants/InputsNames";
import Tile from "../Utils/Tile";

class SelectableComponent extends Component {
	selectedTile?: Tile
	unSelectedTile?: Tile
	onValidated?: () => void
	onSelected?: () => void
	next: Partial<{ [key: string]: Entity }> = {}
	parentId?: string
	constructor(selectedTile?: Tile, unSelectedTile?: Tile, fn?: () => void) {
		super()
		this.selectedTile = selectedTile
		this.unSelectedTile = unSelectedTile
		this.onValidated = fn

	}
	static setFromArray(arr: Entity[], topDown: boolean = false) {
		arr.forEach((entity, index) => {
			if (index === 0) {
				ECS.eventBus.publish(ECSEVENTS.SELECTED, entity)
			}
			const selectable = entity.getComponent(SelectableComponent)
			selectable.next[topDown ? INPUTS.MOVEDOWN : INPUTS.MOVELEFT] = arr.at(index - 1)
			selectable.next[topDown ? INPUTS.MOVEUP : INPUTS.MOVERIGHT] = arr.at((index + 1) % arr.length)
		})
	}
	static setFromGrid(grid: Entity[][]) {
		for (let x = 0; x < grid.length; x++) {
			const line = grid[x]
			for (let y = 0; y < line.length; y++) {
				const entity = line[y]
				if (x === 0 && y === 0) {
					ECS.eventBus.publish(ECSEVENTS.SELECTED, entity)
				}
				const selectable = entity.getComponent(SelectableComponent)
				selectable.next[INPUTS.MOVELEFT] = line.at(y - 1)
				selectable.next[INPUTS.MOVERIGHT] = line.at((y + 1) % line.length)
				selectable.next[INPUTS.MOVEUP] = grid.at(x - 1)?.at(y)
				selectable.next[INPUTS.MOVEDOWN] = grid.at((x + 1) % grid.length)?.at(y)
			}
		}
	}

}




SelectableComponent.register()
export default SelectableComponent