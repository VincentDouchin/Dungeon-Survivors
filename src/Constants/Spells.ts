import ArrowVolleySpell from "../Entities/ArrowVolleySpell"
import CannonSpellEntity from "../Entities/CannonSpellEntity"
import CharmSpellEntity from "../Entities/CharmSpellEntity"
import DivineProtectionEntity from "../Entities/DivineProtectionEntity"
import { Entity } from "../Globals/ECS"
import LightningSpellEntity from "../Entities/LightningSpellEntity"
import ShurikenSpellEntity from "../Entities/ShurikenSpellEntity"
import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"

export interface Spell {
	icon: Tile,
	spell: (entity: Entity) => void
	damage: number
}
const SPELLS: Record<string, Spell> = {
	LIGHTNING: {
		icon: assets.icons.lightning_spell,
		spell: LightningSpellEntity,
		damage: 5
	},
	DIVINE_PROTECTION: {
		icon: assets.icons.divine_protection_spell,
		spell: DivineProtectionEntity,
		damage: 5
	},
	ARROW_VOLLEY: {
		icon: assets.icons.arrowVolley,
		spell: ArrowVolleySpell,
		damage: 10
	},
	SHURIKEN: {
		icon: assets.icons.shurikenSpell,
		spell: ShurikenSpellEntity,
		damage: 10
	},
	CANNON: {
		icon: assets.icons.cannon,
		spell: CannonSpellEntity,
		damage: 20
	},
	CHARM: {
		icon: assets.icons.charm,
		spell: CharmSpellEntity,
		damage: 50
	}

}
export default SPELLS