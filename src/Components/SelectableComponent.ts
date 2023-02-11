import { Component, Entity } from "../Globals/ECS";

import INPUTS from "../Constants/InputsNames";
import Tile from "../Utils/Tile";

class SelectableComponent extends Component {
	selectedTile: Tile
	unSelectedTile: Tile
	selected: boolean = false
	next: Partial<{ [key in keyof typeof INPUTS]: Entity }> = {}
	constructor(selectedTile: Tile, unSelectedTile: Tile, selected = false) {
		super()
		this.selected = selected
		this.selectedTile = selectedTile
		this.unSelectedTile = unSelectedTile
	}
}
SelectableComponent.register()
export default SelectableComponent