import { CanvasTexture, NearestFilter } from "three"
import getBuffer from "./Buffer"

interface tileOptions {
	buffer: CanvasRenderingContext2D
	normalMap?: CanvasRenderingContext2D
	hurt?: CanvasRenderingContext2D
	outline?: CanvasRenderingContext2D
	width?: number
	height?: number
	frames?: number
}
class Tile {
	buffer: CanvasRenderingContext2D
	normalMap?: CanvasRenderingContext2D
	hurt?: CanvasRenderingContext2D
	outline?: CanvasRenderingContext2D
	width: number
	height: number
	frames: number
	texture: CanvasTexture
	constructor({ buffer, width, height, frames = 1 }: tileOptions) {
		this.buffer = buffer
		this.texture = new CanvasTexture(buffer.canvas)
		this.texture.minFilter = NearestFilter
		this.texture.magFilter = NearestFilter
		this.width = width ?? buffer.canvas.width
		this.height = height ?? buffer.canvas.height
		this.frames = frames
	}
	static fromImage(image: HTMLImageElement) {
		const buffer = getBuffer(image.width, image.height)
		buffer.drawImage(image, 0, 0)
		return new Tile({ buffer })
	}
	clone() {
		const options: tileOptions = {
			buffer: getBuffer(this.buffer.canvas.width, this.buffer.canvas.height),
			width: this.width,
			height: this.height,
			frames: this.frames
		}
		options.buffer.drawImage(this.buffer.canvas, 0, 0)
		if (this.normalMap) {
			options.normalMap = getBuffer(this.normalMap.canvas.width, this.normalMap.canvas.height)
			options.normalMap.drawImage(this.normalMap.canvas, 0, 0)
		}
		return new Tile(options)
	}

}
export default Tile