import { AXISX, AXISY, INTERACT, MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP, PAUSE } from "../Constants/InputsNames"
import { AmbientLight, Clock, Color, OrthographicCamera, Scene, WebGLRenderer } from "three"
import RAPIER, { World } from "@dimforge/rapier2d-compat"

import AssetLoader from "./AssetLoader"
import GUIData from './../../assets/GUI.json'
import GUISource from './../../assets/GUI.png'
import InputManager from "./InputManager"
import KeyboardController from "../InputControllers/KeyboardController"
import MagicSpellsAllSpritesData from './../../assets/MagicSpellsAllSprites.json'
import MagicSpellsAllSpritesSource from './../../assets/MagicSpellsAllSprites.png'
import Tile from "../Utils/Tile"
import TiledMap from "../Utils/TiledMap"
import TouchController from "../InputControllers/TouchController"
import iconsData from './../../assets/icons.json'
import iconsSource from './../../assets/icons.png'
import tilesList from './../../assets/tiles_list_v1.4.txt?raw'
import tilesSource from './../../assets/0x72_DungeonTilesetII_v1.4.png'

//! Assets
const assetLoader = new AssetLoader()
const assets: {
	UI: Record<string, Tile>
	icons: Record<string, Tile>
	magic: Record<string, Tile>
	tiles: Record<tileName, Tile>
	overWorld: TiledMap
	skills: Record<skillName, Tile>
} = {
	UI: await assetLoader.loadFromSlices(GUIData, GUISource),
	icons: await assetLoader.loadFromSlices(iconsData, iconsSource),
	magic: await assetLoader.loadFromSlices(MagicSpellsAllSpritesData, MagicSpellsAllSpritesSource,
		({ buffer }) => ({ buffer, frames: buffer.canvas.width / 24, width: 24 })
	),
	tiles: await assetLoader.loadFromTileList(tilesList, tilesSource),
	overWorld: await TiledMap.load('/Dungeon-Survivor/assets/map/overWorld.json'),
	skills: await assetLoader.loadFromGlob(import.meta.glob('./../../assets/icons/*.png', { eager: true })) as Record<skillName, Tile>
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
//! Scenes
const UIScene = new Scene()
const scene = new Scene()
scene.background = new Color(0x444444)
const backgroundScene = new Scene()

//! Cameras
const UICamera = createCamera()
const camera = createCamera()

//! Lights
const UILight = new AmbientLight(0xffffff)
UIScene.add(UILight)
const light = new AmbientLight(new Color('hsl(0,0%,4%)'))

scene.add(light)

//! Render
const render = () => {
	renderer.render(scene, camera)
	renderer.render(UIScene, UICamera)
}

//! Inputs
const inputManager = new InputManager(renderer.domElement, [MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, AXISX, AXISY, INTERACT, PAUSE])
inputManager.registerControllers(KeyboardController)
//@ts-ignore
if (navigator.userAgentData.mobile) {
	inputManager.registerControllers(TouchController)
}

export { render, scene, inputManager, world, camera, UIScene, UICamera, backgroundScene, renderer, assets, clock }

