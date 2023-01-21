import { CanvasTexture } from "three";

import vert from './glsl/main.vert?raw';
import frag from './glsl/offset.frag?raw';
import Shader from "./Shader";

class TileShader extends Shader {
	vert = vert
	frag = frag
	constructor(texture: CanvasTexture, [offsetX, offsetY]: [number, number], [repeatX, repeatY]: [number, number]) {

		super((sprite) => ({
			offsetX,
			offsetY,
			repeatX,
			repeatY,
			uTexture: texture,
			other: sprite.width
		}))
	}
}

export default TileShader