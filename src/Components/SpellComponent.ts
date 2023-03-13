import { Component, Entity } from "../Globals/ECS";

import { STATS } from "./StatsComponent";
import { Spell } from "../Constants/Spells";
import { Stat } from "../Game/Stat";
import Tile from "../Utils/Tile";

class SpellComponent extends Component {
	spell: (entity: Entity) => void
	icon: Tile
	spellDamage: Stat
	constructor(spell: Spell) {
		super()
		this.icon = spell.icon
		this.spell = spell.spell
		this.spellDamage = new Stat(spell.damage, STATS.SPELL_DAMAGE)
	}
}
SpellComponent.register()
export default SpellComponent