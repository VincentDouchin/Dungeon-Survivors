import type { Entity } from '../Globals/ECS'
import { Component } from '../Globals/ECS'

import type { Spell } from '../Constants/Spells'
import { Stat } from '../Game/Stat'
import type Tile from '../Utils/Tile'
import { STATS } from '../Constants/Stats'

class SpellComponent extends Component {
	spell: (entity: Entity) => boolean
	icon: Tile
	spellDamage: Stat
	spellActive = false
	constructor(spell: Spell) {
		super()
		this.icon = spell.icon
		this.spell = spell.spell
		this.spellDamage = new Stat(spell.damage, STATS.SPELL_DAMAGE)
	}
}
SpellComponent.register()
export default SpellComponent
