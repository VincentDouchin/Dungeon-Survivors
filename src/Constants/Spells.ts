import DivineProtectionEntity from "../Entities/DivineProtectionEntity"
import LightningSpellEntity from "../Entities/LightningSpellEntity"
import StatsComponent from "../Components/StatsComponent"
import Tile from "../Utils/Tile"
import { Vector2 } from "three"
import assets from "../Globals/Assets"

export interface Spell {
	icon: Tile,
	spell: (position: Vector2, stats: StatsComponent) => void
}
const SPELLS: Record<string, Spell> = {
	LIGHTNING: {
		icon: assets.skills.lightning_spell,
		spell: LightningSpellEntity
	},
	DIVINE_PROTECTION: {
		icon: assets.skills.divine_protection_spell,
		spell: DivineProtectionEntity
	}

}
export default SPELLS