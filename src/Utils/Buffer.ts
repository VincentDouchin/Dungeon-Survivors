const getBuffer = (width: number, height: number) => {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d', { alpha: true })
	if (!ctx) return
	ctx.canvas.height = height
	ctx.canvas.width = width ?? 16 / 9 * height
	ctx.imageSmoothingEnabled = false
	Object.assign(ctx.canvas.style, { 'image-rendering': 'pixelated' })
	return ctx
}
export default getBuffer
