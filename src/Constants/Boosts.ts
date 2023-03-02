import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"

export interface Boost {
	tile: Tile
}
const BOOSTS: Record<string, Boost> = {
	CLAW: {
		tile: assets.icons.claw
	}
}
export default BOOSTS