import { Component } from "../Globals/ECS";
import Tile from "../Utils/Tile";

class SelectableComponent extends Component {
	selectedTile: Tile
	unSelectedTile: Tile
	constructor(selectedTile: Tile, unSelectedTile: Tile) {
		super()
		this.selectedTile = selectedTile
		this.unSelectedTile = unSelectedTile
	}
}
SelectableComponent.register()
export default SelectableComponent