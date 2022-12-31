import getBuffer from "./Buffer";
import Tile from "./Tile";

const framedTile = (tile: Tile, margin: number | { x: number | { left: number, right: number }, y: number | { top: number, bottom: number } }, width: number, height: number) => {
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
	const tileCenterWidth = tile.width - marginLeft - marginRight
	const tileCenterHeight = tile.height - marginBottom - marginTop
	const buffer = getBuffer(totalWidth, totalHeight)
	// Top Left
	buffer.drawImage(
		tile.buffer.canvas,
		0, 0, marginLeft, marginTop,
		0, 0, marginLeft, marginTop
	)
	// Top Right
	buffer.drawImage(
		tile.buffer.canvas,
		tile.width - marginRight, 0, marginRight, marginTop,
		totalWidth - marginRight, 0, marginRight, marginTop
	)
	// Bottom Left
	buffer.drawImage(
		tile.buffer.canvas,
		0, tile.height - marginBottom, marginLeft, marginBottom,
		0, totalHeight - marginBottom, marginLeft, marginBottom
	)
	// Bottom Right
	buffer.drawImage(
		tile.buffer.canvas,
		tile.width - marginRight, tile.height - marginBottom, marginRight, marginBottom,
		totalWidth - marginRight, totalHeight - marginBottom, marginRight, marginBottom,
	)
	// Center
	const tilesX = Math.ceil(width / tileCenterWidth)
	const tilesY = Math.ceil(height / tileCenterHeight)
	for (let x = 0; x < tilesX; x++) {
		const w = x == tilesX - 1 ? (width % tileCenterWidth || tileCenterWidth) : tileCenterWidth
		buffer.drawImage(
			tile.buffer.canvas,
			marginLeft, 0, tileCenterWidth, marginTop,
			marginLeft + x * tileCenterWidth, 0, w, marginTop
		)
		// Bottom
		buffer.drawImage(
			tile.buffer.canvas,
			marginLeft, marginTop + tileCenterHeight, tileCenterWidth, marginTop,
			marginLeft + x * tileCenterWidth, height + marginTop, w, marginTop
		)
		for (let y = 0; y < tilesY; y++) {
			const h = y == tilesY - 1 ? (height % tileCenterHeight || tileCenterHeight) : tileCenterHeight
			if (x == 0) {
				// Left
				buffer.drawImage(
					tile.buffer.canvas,
					0, marginTop, marginLeft, tileCenterHeight,
					0, marginTop + y * tileCenterHeight, marginLeft, h
				)
				// Right
				buffer.drawImage(
					tile.buffer.canvas,
					tileCenterWidth + marginLeft, marginTop, marginRight, tileCenterHeight,
					width + marginLeft, marginTop + y * tileCenterHeight, marginRight, h
				)
			}
			//Center
			buffer.drawImage(
				tile.buffer.canvas,
				marginLeft, marginTop, w, h,
				marginLeft + x * tileCenterWidth, marginTop + y * tileCenterHeight, w, h,
			)
		}
	}

	return new Tile({ buffer })
}
export default framedTile