import AssetLoader, { AssetLoaderChain } from "./../Utils/AssetLoader"
import { Background, UI, characters, effects, icons } from './../../assets/images/images'

import { BACKGROUND } from "../Constants/BackGrounds"
import Tile from "../Utils/Tile"
import {sounds} from './../../assets/sounds/sounds'

const loadCharacterTilesFromFolder = new AssetLoaderChain<Tile>()
	.chain(async x => await AssetLoader.loadImage(x.default))
	.chain(x => Tile.fromImage(x, { frames: 4 }))
const loadTilesFromFolder = new AssetLoaderChain<Tile>()
	.chain(async x => await AssetLoader.loadImage(x.default))
	.chain(x => Tile.fromImage(x))
const loadAudio = new AssetLoaderChain<HTMLAudioElement>()
	.chain(x => new Audio(x.default))
const loadJSON = new AssetLoaderChain()

const framesNb: Record<effects, number> = {
	"Leaf": 6,
	"Spark": 7,
	"smoke": 7,
	"auraCircle": 4,
	"fireProjectile": 15,
	"lightning": 8,
	"smokeCircular": 8,
	"Rain": 3,
	"RainOnFloor": 3,
	"IceSpike-sheet": 8,
	"Rock": 5,
	"RockBlue": 5,
	"Grass": 6,
	"Hay": 6,
	"Vase": 6,
	"Wood": 6,
	"Clouds": 1,
	"flag": 4,
	"Snow": 7
}
const loadEffects = new AssetLoaderChain<Tile>()
	.chain(async x => await AssetLoader.loadImage(x.default))
	.chain((image, key) => Tile.fromImage(image, { frames: framesNb[key as effects] }))

//! Assets
const assets = {
	characters: await loadCharacterTilesFromFolder.load<characters>(import.meta.glob('./../../assets/characters/*.png', { eager: true })),
	UI: await loadTilesFromFolder.load<UI>(import.meta.glob('./../../assets/UI/*.png', { eager: true })),
	icons: await loadTilesFromFolder.load<icons>(import.meta.glob('./../../assets/icons/*.png', { eager: true })),
	background: await loadTilesFromFolder.load<Background>(import.meta.glob('./../../assets/Background/*.png', { eager: true })),
	effects: await loadEffects.load<effects>(import.meta.glob('./../../assets/effects/*.png', { eager: true })),
	sounds: await loadAudio.load<sounds>(import.meta.glob('./../../assets/sounds/*.*')),
	mapTiles: await loadTilesFromFolder.load<BACKGROUND>(import.meta.glob('/assets/**/_composite.png', { eager: true })),
	mapData: await loadJSON.load<BACKGROUND>(import.meta.glob('/assets/map/Arenas/*.json', { eager: true }))
} as const
debugger
export default assets