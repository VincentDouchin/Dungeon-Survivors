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
	constructor({ buffer, width, height, frames = 1, normalMap, hurt, outline }: tileOptions) {
		this.buffer = buffer
		this.normalMap = normalMap
		this.width = width ?? buffer.canvas.width
		this.height = height ?? buffer.canvas.height
		this.frames = frames
		this.hurt = hurt
		this.outline = outline
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