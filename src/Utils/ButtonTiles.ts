import Tile from "./Tile"
import assets from "../Globals/Assets"

const buttonTiles = (x: number, y: number): [Tile, Tile, Tile] => {
	const normal = assets.UI.button.framed(4, x, y)
	const pressed = assets.UI.buttonpressed.framed(4, x, y)
	const disabled = assets.UI.buttondisabled.framed(4, x, y)
	return [normal, pressed, disabled]
}
export default buttonTiles