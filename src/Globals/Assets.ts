import type LDTKMap from '../Utils/LDTKMap'
import Tile from '../Utils/Tile'
import AssetLoader, { loadImage } from './../Utils/AssetLoader'
import type { Background, UI, characters, effects, icons, others, weapons } from './../../assets/images/images'

import type { Arenas } from './../../assets/map/Map'
import type { sounds } from './../../assets/sounds/sounds'

const getFileName = (path: string) => path.split(/[./]/g).at(-2) ?? ''

const loadCharacterTilesFromFolder = new AssetLoader<Tile>(getFileName)
	.chain(async x => await loadImage(x.default))
	.chain(x => Tile.fromImage(x, { frames: 4, padding: true }))
const loadTilesFromFolder = new AssetLoader<Tile>(getFileName)
	.chain(async x => await loadImage(x.default))
	.chain(x => Tile.fromImage(x))
const loadIconsFromFolder = new AssetLoader<Tile>(getFileName)
	.chain(async x => await loadImage(x.default))
	.chain(x => Tile.fromImage(x, { padding: true }))
const loadAudio = new AssetLoader<HTMLAudioElement>(getFileName)
	.chain(x => new Audio(x.default))
const loadJSON = new AssetLoader<LDTKMap>(getFileName)

const framesNb: Record<effects, number> = {
	'Leaf': 6,
	'Spark': 7,
	'smoke': 6,
	'auraCircle': 4,
	'fireProjectile': 15,
	'darkProjectile': 15,
	'lightning': 8,
	'smokeCircular': 8,
	'Rain': 3,
	'RainOnFloor': 3,
	'IceSpike-sheet': 8,
	'Rock': 5,
	'RockBlue': 5,
	'Grass': 6,
	'Hay': 6,
	'Vase': 6,
	'Wood': 6,
	'Clouds': 1,
	'flag': 4,
	'Snow': 7,
	'beam': 4,
	'healing': 4,
	'CanonBall': 5,
	'Ice': 9,
	'EnergyBall': 4,
}
const loadEffects = new AssetLoader<Tile>(getFileName)
	.chain(async x => await loadImage(x.default))
	.chain((image, key) => Tile.fromImage(image, { frames: framesNb[key as effects] }))
// ! Assets
const assets = {
	characters: await loadCharacterTilesFromFolder.load<characters>(import.meta.glob('./../../assets/images/characters/*.png', { eager: true })),
	UI: await loadTilesFromFolder.load<UI>(import.meta.glob('./../../assets/images/UI/*.png', { eager: true })),
	icons: await loadIconsFromFolder.load<icons>(import.meta.glob('./../../assets/images/icons/*.png', { eager: true })),
	weapons: await loadTilesFromFolder.load<weapons>(import.meta.glob('./../../assets/images/weapons/*.png', { eager: true })),
	other: await loadTilesFromFolder.load<others>(import.meta.glob('./../../assets/images/others/*.png', { eager: true })),
	background: await loadTilesFromFolder.load<Background>(import.meta.glob('./../../assets/images/Background/*.png', { eager: true })),
	effects: await loadEffects.load<effects>(import.meta.glob('./../../assets/images/effects/*.png', { eager: true })),
	sounds: await loadAudio.load<sounds>(import.meta.glob('./../../assets/sounds/*.*', { eager: true })),
	mapTiles: await loadTilesFromFolder.load<Arenas>(import.meta.glob('/assets/map/Arenas/**/*.png', { eager: true })),
	mapData: await loadJSON.load<Arenas>(import.meta.glob('/assets/map/Arenas/*.json', { eager: true })),
} as const
export default assets
