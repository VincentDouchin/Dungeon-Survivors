import Sprite from "./Sprite";

class Scene {
	sprites: Sprite[] = []
	constructor(...sprites: Sprite[]) {
		this.sprites = sprites
	}
	add(...sprites: Sprite[]) {
		sprites.forEach(sprite => {
			this.sprites.push(sprite)
		})
	}
}
export default Scene