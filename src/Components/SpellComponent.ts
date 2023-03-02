import { Component, Entity } from "../Globals/ECS";

import { Spell } from "../Constants/Spells";
import Tile from "../Utils/Tile";

class SpellComponent extends Component {
	spell: (entity: Entity) => void
	icon: Tile
	constructor(spell: Spell) {
		super()
		this.icon = spell.icon
		this.spell = spell.spell
	}
}
SpellComponent.register()
export default SpellComponent