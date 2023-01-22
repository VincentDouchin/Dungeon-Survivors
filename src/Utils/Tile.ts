import { CanvasTexture, NearestFilter } from "three"

import getBuffer from "./Buffer"

class Tile {
	buffer: CanvasRenderingContext2D
	width: number
	height: number
	frames: number
	texture: CanvasTexture
	textures: CanvasTexture[] = []
	constructor({ buffer, width, height, frames = 1, padding = false }: tileOptions) {
		this.buffer = buffer
		this.texture = new CanvasTexture(buffer.canvas)
		this.texture.minFilter = NearestFilter
		this.texture.magFilter = NearestFilter
		const realWidth = width ?? buffer.canvas.width
		const realHeight = height ?? buffer.canvas.height
		this.width = padding ? realWidth + 2 : realWidth
		this.height = padding ? realHeight + 2 : realHeight
		this.frames = frames
		for (let i = 0; i <= frames - 1; i++) {
			const frameBuffer = getBuffer(this.width, this.height)
			const offset = padding ? 1 : 0
			frameBuffer.drawImage(
				buffer.canvas,
				i * (realWidth), 0, realWidth, realHeight,
				offset, offset, realWidth, realHeight,
			)
			const texture = new CanvasTexture(frameBuffer.canvas)
			texture.minFilter = NearestFilter
			texture.magFilter = NearestFilter

			this.textures.push(texture)

		}
	}
	static fromImage(image: HTMLImageElement, fn = (tileOptions: tileOptions) => tileOptions) {
		const buffer = getBuffer(image.width, image.height)
		buffer.drawImage(image, 0, 0)
		return new Tile(fn({ buffer }))
	}
	clone() {
		const options: tileOptions = {
			buffer: getBuffer(this.buffer.canvas.width, this.buffer.canvas.height),
			width: this.width,
			height: this.height,
			frames: this.frames
		}
		options.buffer.drawImage(this.buffer.canvas, 0, 0)
		return new Tile(options)
	}

}
export default Tile