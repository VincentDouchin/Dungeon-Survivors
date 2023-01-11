const loadImage = async (source: string) => {
	const img = new Image()
	img.src = source
	await new Promise(resolve => {
		img.onload = resolve
	})
	return img

}
export default loadImage