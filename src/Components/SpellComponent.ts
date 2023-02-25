import { Component } from "../Globals/ECS";
import { Spell } from "../Constants/Spells";
import StatsComponent from "./StatsComponent";
import Tile from "../Utils/Tile";
import { Vector2 } from "three";

class SpellComponent extends Component {
	spell: (position: Vector2, stats: StatsComponent) => void
	icon: Tile
	constructor(spell: Spell) {
		super()
		this.icon = spell.icon
		this.spell = spell.spell
	}
}
SpellComponent.register()
export default SpellComponent