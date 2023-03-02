import ArrowVolleySpell from "../Entities/ArrowVolleySpell"
import DivineProtectionEntity from "../Entities/DivineProtectionEntity"
import { Entity } from "../Globals/ECS"
import LightningSpellEntity from "../Entities/LightningSpellEntity"
import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"

export interface Spell {
	icon: Tile,
	spell: (entity: Entity) => void
}
const SPELLS: Record<string, Spell> = {
	LIGHTNING: {
		icon: assets.skills.lightning_spell,
		spell: LightningSpellEntity
	},
	DIVINE_PROTECTION: {
		icon: assets.skills.divine_protection_spell,
		spell: DivineProtectionEntity
	},
	ARROW_VOLLEY: {
		icon: assets.skills.divine_protection_spell,
		spell: ArrowVolleySpell
	}

}
export default SPELLS