import { CanvasTexture, NearestFilter } from 'three'

import getBuffer from './Buffer'

interface tileOptions {
	buffer: CanvasRenderingContext2D
	width?: number
	height?: number
	frames?: number
	padding?: boolean
}
class Tile {
	buffer: CanvasRenderingContext2D
	width: number
	height: number
	frames: number
	texture: CanvasTexture
	textures: CanvasTexture[] = []
	buffers: CanvasRenderingContext2D[] = []
	constructor({ buffer, width, height, frames = 1, padding = false }: tileOptions) {
		this.buffer = buffer
		this.texture = new CanvasTexture(buffer.canvas)
		this.texture.minFilter = NearestFilter
		this.texture.magFilter = NearestFilter
		const realWidth = (width ?? buffer.canvas.width) / frames
		const realHeight = (height ?? buffer.canvas.height)
		this.width = padding ? realWidth + 2 : realWidth
		this.height = padding ? realHeight + 2 : realHeight
		this.frames = frames
		for (let i = 0; i < frames; i++) {
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
			this.buffers.push(frameBuffer)
			this.textures.push(texture)
		}
	}

	static fromImage(image: HTMLImageElement, tileOptions: Partial<tileOptions> = {}): Tile {
		const buffer = getBuffer(image.width, image.height)
		buffer.drawImage(image, 0, 0)

		return new Tile(({ buffer, ...tileOptions }))
	}

	static empty(x = 16, y = 16) {
		const buffer = getBuffer(x, y)
		return new Tile({ buffer })
	}

	clone() {
		const options: tileOptions = {
			buffer: getBuffer(this.buffer.canvas.width, this.buffer.canvas.height),
			width: this.width,
			height: this.height,
			frames: this.frames,
		}
		options.buffer.drawImage(this.buffer.canvas, 0, 0)
		return new Tile(options)
	}

	overwrite(props: { height?: number; width?: number; frames?: number }) {
		Object.assign(this, props)
		return this
	}

	framed(margin: number | { x: number | { left: number; right: number }; y: number | { top: number; bottom: number } }, width: number, height: number) {
		const marginTop = typeof margin == 'number'
			? margin
			: typeof margin.y == 'number'
				? margin.y
				: margin.y.top
		const marginBottom = typeof margin == 'number'
			? margin
			: typeof margin.y == 'number'
				? margin.y
				: margin.y.bottom
		const marginLeft = typeof margin == 'number'
			? margin
			: typeof margin.x == 'number'
				? margin.x
				: margin.x.left
		const marginRight = typeof margin == 'number'
			? margin
			: typeof margin.x == 'number'
				? margin.x
				: margin.x.right
		const totalWidth = width + marginLeft + marginRight
		const totalHeight = height + marginBottom + marginTop
		const thisCenterWidth = this.width - marginLeft - marginRight
		const thisCenterHeight = this.height - marginBottom - marginTop
		const buffer = getBuffer(totalWidth, totalHeight)
		// Top Left
		buffer.drawImage(
			this.buffer.canvas,
			0, 0, marginLeft, marginTop,
			0, 0, marginLeft, marginTop,
		)
		// Top Right
		buffer.drawImage(
			this.buffer.canvas,
			this.width - marginRight, 0, marginRight, marginTop,
			totalWidth - marginRight, 0, marginRight, marginTop,
		)
		// Bottom Left
		buffer.drawImage(
			this.buffer.canvas,
			0, this.height - marginBottom, marginLeft, marginBottom,
			0, totalHeight - marginBottom, marginLeft, marginBottom,
		)
		// Bottom Right
		buffer.drawImage(
			this.buffer.canvas,
			this.width - marginRight, this.height - marginBottom, marginRight, marginBottom,
			totalWidth - marginRight, totalHeight - marginBottom, marginRight, marginBottom,
		)
		// Center
		const thissX = Math.ceil(width / thisCenterWidth)
		const thissY = Math.ceil(height / thisCenterHeight)
		for (let x = 0; x < thissX; x++) {
			const w = x === thissX - 1 ? (width % thisCenterWidth || thisCenterWidth) : thisCenterWidth
			buffer.drawImage(
				this.buffer.canvas,
				marginLeft, 0, thisCenterWidth, marginTop,
				marginLeft + x * thisCenterWidth, 0, w, marginTop,
			)
			// Bottom
			buffer.drawImage(
				this.buffer.canvas,
				marginLeft, marginTop + thisCenterHeight, thisCenterWidth, marginTop,
				marginLeft + x * thisCenterWidth, height + marginTop, w, marginTop,
			)
			for (let y = 0; y < thissY; y++) {
				const h = y === thissY - 1 ? (height % thisCenterHeight || thisCenterHeight) : thisCenterHeight
				if (x === 0) {
					// Left
					buffer.drawImage(
						this.buffer.canvas,
						0, marginTop, marginLeft, thisCenterHeight,
						0, marginTop + y * thisCenterHeight, marginLeft, h,
					)
					// Right
					buffer.drawImage(
						this.buffer.canvas,
						thisCenterWidth + marginLeft, marginTop, marginRight, thisCenterHeight,
						width + marginLeft, marginTop + y * thisCenterHeight, marginRight, h,
					)
				}
				// Center
				buffer.drawImage(
					this.buffer.canvas,
					marginLeft, marginTop, w, h,
					marginLeft + x * thisCenterWidth, marginTop + y * thisCenterHeight, w, h,
				)
			}
		}

		return new Tile({ buffer })
	}
}
export default Tile
