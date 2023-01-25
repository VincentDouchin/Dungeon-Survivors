import { AXISX, AXISY, INTERACT, MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP, PAUSE, SWITCH } from "../Constants/InputsNames"
import { Clock, Color, Mesh, MeshBasicMaterial, MeshStandardMaterial, MultiplyBlending, NearestFilter, NearestMipMapNearestFilter, OrthographicCamera, PlaneGeometry, Scene, WebGLRenderTarget, WebGLRenderer } from "three"
import RAPIER, { World } from "@dimforge/rapier2d-compat"

import AssetLoader from "./../Utils/AssetLoader"
import { FullScreenQuad } from "three/examples/jsm/postprocessing/Pass"
import GUIData from './../../assets/GUI.json'
import GUISource from './../../assets/GUI.png'
import InputManager from "./InputManager"
import KeyboardController from "../InputControllers/KeyboardController"
import LDTKMap from "../Utils/LDTKMap"
import MagicSpellsAllSpritesData from './../../assets/MagicSpellsAllSprites.json'
import MagicSpellsAllSpritesSource from './../../assets/MagicSpellsAllSprites.png'
import Tile from "../Utils/Tile"
import TouchController from "../InputControllers/TouchController"
import arenasSource from './../../assets/map/Arenas.jon?url'
import iconsData from './../../assets/icons.json'
import iconsSource from './../../assets/icons.png'
import ldtkmapSource from './../../assets/map/ldtkOverworld.json?url'
import tilesList from './../../assets/tiles_list_v1.4.txt?raw'
import tilesSource from './../../assets/0x72_DungeonTilesetII_v1.4.png'

//! Assets
const assets: {
	UI: Record<string, Tile>
	icons: Record<string, Tile>
	magic: Record<string, Tile>
	tiles: Record<tileName, Tile>
	skills: Record<skillName, Tile>,
	blood: Record<string, Tile>
	map: LDTKMap
	arenas: LDTKMap
} = {
	UI: await AssetLoader.loadFromSlices(GUIData, GUISource),
	icons: await AssetLoader.loadFromSlices(iconsData, iconsSource),
	magic: await AssetLoader.loadFromSlices(MagicSpellsAllSpritesData, MagicSpellsAllSpritesSource,
		({ buffer }) => ({ buffer, frames: buffer.canvas.width / 24, width: 24 })
	),
	tiles: await AssetLoader.loadFromTileList(tilesList, tilesSource),
	skills: await AssetLoader.loadFromGlob(import.meta.glob('./../../assets/icons/*.png', { eager: true })) as Record<skillName, Tile>,
	blood: await AssetLoader.loadFromGlob(import.meta.glob('./../../assets/blood/*.png', { eager: true }), ({ buffer }) => {
		const frames = buffer.canvas.width / buffer.canvas.height
		return { buffer, frames, width: buffer.canvas.height }
	}),
	map: await LDTKMap.load(ldtkmapSource),
	arenas: await LDTKMap.load(arenasSource)
}
// ! Clock
const clock = new Clock()

//! World 
await RAPIER.init()
const world = new World({ x: 0, y: 0 })

//! Camera
const createCamera = () => {
	const aspect = window.innerWidth / window.innerHeight
	const frustumSize = 300
	const camera = new OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000000)
	// window.addEventListener('resize', () => {
	// 	const aspect = window.innerWidth / window.innerHeight;
	// 	camera.left = - frustumSize * aspect / 2
	// 	camera.right = frustumSize * aspect / 2
	// 	camera.top = frustumSize / 2
	// 	camera.bottom = - frustumSize / 2
	// 	camera.updateProjectionMatrix()
	// })

	camera.position.set(0, 0, 200)
	return camera
}

//! Renderer
const createRenderer = () => {
	const renderer = new WebGLRenderer({ alpha: true, })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
	})
	renderer.autoClear = false
	return renderer
}
const renderer = createRenderer()


document.body.appendChild(renderer.domElement)

//! Cameras
const UICamera = createCamera()
const camera = createCamera()

//! Scenes
const UIScene = new Scene()
const scene = new Scene()
scene.background = new Color(0x444444)

//! Lights
const lightScene = new Scene()
const getTarget = () => {
	const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight)
	target.texture.minFilter = NearestMipMapNearestFilter
	target.texture.magFilter = NearestFilter
	target.texture.generateMipmaps = true
	return target
}
const lightsTarget = getTarget()
const UITarget = getTarget()
const background = new Mesh(
	new PlaneGeometry(window.innerWidth, window.innerHeight),
	new MeshStandardMaterial({ color: 0xffffff })
)
background.position.set(0, 0, 0)
lightScene.add(background)
const lightsMaterial = new MeshBasicMaterial({ map: lightsTarget.texture, blending: MultiplyBlending, transparent: true })
const UIMaterial = new MeshBasicMaterial({ map: UITarget.texture, transparent: true })
const quad = new FullScreenQuad(lightsMaterial)
const quad2 = new FullScreenQuad(UIMaterial)


//! Render
const render = () => {
	background.position.set(camera.position.x, camera.position.y, 0)
	renderer.clear()
	renderer.setRenderTarget(lightsTarget)
	renderer.clear()
	renderer.render(lightScene, camera)
	renderer.setRenderTarget(UITarget)
	renderer.clear()
	renderer.render(UIScene, UICamera)
	renderer.setRenderTarget(null)
	renderer.render(scene, camera)
	quad.render(renderer)
	quad2.render(renderer)
}

//! Inputs
const inputManager = new InputManager(renderer.domElement, [MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, AXISX, AXISY, INTERACT, PAUSE, SWITCH])
inputManager.registerControllers(KeyboardController)
//@ts-ignore
if (navigator.userAgentData.mobile) {
	inputManager.registerControllers(TouchController)
}

export { render, scene, inputManager, world, camera, UIScene, UICamera, renderer, assets, clock, lightScene }

