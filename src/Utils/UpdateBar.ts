import MeshComponent from '../Components/MeshComponent'
import Tile from './Tile'
const updateBar = (mesh: MeshComponent, from: Tile, to: Tile, percent: number) => {
	const image: HTMLCanvasElement = mesh.texture.image
	const fullWidth = Math.max(0, percent * mesh.texture.image.width)
	const ctx = image.getContext('2d')!
	ctx.clearRect(0, 0, mesh.width, mesh.height)
	ctx.drawImage(from.buffer.canvas, 0, 0,)
	ctx.drawImage(to.buffer.canvas, 0, 0, fullWidth, mesh.height, 0, 0, fullWidth, mesh.height)
	mesh.texture.needsUpdate = true
}
export default updateBar