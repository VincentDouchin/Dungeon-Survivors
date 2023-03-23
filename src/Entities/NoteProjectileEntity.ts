import BodyComponent from '../Components/BodyComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import ColorShader from '../Shaders/ColorShader'
import Coroutine from '../Globals/Coroutine'
import DamageComponent from '../Components/DamageComponent'
import { Entity } from '../Globals/ECS'
import ExpirationComponent from '../Components/ExpirationComponent'
import LevelComponent from '../Components/LevelComponent'
import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import StatsComponent from '../Components/StatsComponent'
import assets from '../Globals/Assets'

const NoteProjectileEntity = (parent: Entity) => {
	const note = new Entity('note')
	const possibleTiles = [assets.weapons.note1, assets.weapons.note2, assets.weapons.note3, assets.weapons.note4]
	const tile = possibleTiles[Math.floor(Math.random() * possibleTiles.length)]
	note.addComponent(new SpriteComponent(tile, { shaders: [new ColorShader(1, 1, 1, 0.6)] }))
	note.addComponent(parent.getComponent(PositionComponent).clone())
	const projectileBody = note.addComponent(new BodyComponent(
		{ moveForce: 200 },
		[
			{ group: COLLISIONGROUPS.WEAPON, canCollideWith: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.LOOT], mass: 0.1, contact: false, sensor: true, width: tile.width, height: tile.height }
		]
	))
	const noteRotation = Math.random() * Math.PI * 2
	note.addComponent(new ExpirationComponent(400))
	note.addComponent(new DamageComponent(10, [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.LOOT], 5, 5))
	const coroutine = new Coroutine(function* (i) {
		yield
		const offset = Math.sin(i / 10)
		const offsetAngle = (noteRotation + Math.PI / 2)
		projectileBody.velocity.x = -Math.cos(noteRotation) + Math.cos(offsetAngle) * offset
		projectileBody.velocity.y = -Math.sin(noteRotation) + Math.sin(offsetAngle) * offset
	}, Infinity)
	note.addComponent(parent.getComponent(StatsComponent))
	note.addComponent(parent.getComponent(LevelComponent))
	note.onDestroy(() => coroutine.stop())
	return note
}
export default NoteProjectileEntity