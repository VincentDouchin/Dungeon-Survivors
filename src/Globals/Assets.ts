import AssetLoader from "./../Utils/AssetLoader"
import { BACKGROUND } from "../Constants/BackGrounds"
import GUIData from './../../assets/GUI.json'
import GUISource from './../../assets/GUI.png'
import LDTKMap from "../Utils/LDTKMap"
import MagicSpellsAllSpritesData from './../../assets/MagicSpellsAllSprites.json'
import MagicSpellsAllSpritesSource from './../../assets/MagicSpellsAllSprites.png'
import Tile from "../Utils/Tile"
import auraSource from './../../assets/NinjaAdventure/FX/Magic/Circle/SpriteSheetOrange.png'
import fireProjectileSource from './../../assets/magic projectiles/orangefire.png'
import flagSource from './../../assets/map/flag.png'
import grassParticlesSource from './../../assets/NinjaAdventure/FX/Particle/Grass.png'
import hayParticlesSource from './../../assets/NinjaAdventure/FX/Particle/Hay.png'
import iceSpikeSource from './../../assets/NinjaAdventure/FX/Projectile/IceSpike-sheet.png'
import iconsData from './../../assets/icons.json'
import iconsSource from './../../assets/icons.png'
import inputsData from './../../assets/inputs/tilemap_white_packed.json'
import inputsSource from './../../assets/inputs/tilemap_white_packed.png'
import leafSource from './../../assets/NinjaAdventure/FX/Particle/Leaf.png'
import lightningSource from './../../assets/NinjaAdventure/FX/Elemental/Thunder/SpriteSheet.png'
import rainDropSource from './../../assets/NinjaAdventure/FX/Particle/Rain.png'
import rainFloorSource from './../../assets/NinjaAdventure/FX/Particle/RainOnFloor.png'
import rockBlueParticlesSource from './../../assets/NinjaAdventure/FX/Particle/RockBlue.png'
import rockParticlesSource from './../../assets/NinjaAdventure/FX/Particle/Rock.png'
import smokeCircularSource from './../../assets/NinjaAdventure/FX/Smoke/SmokeCircular/SpriteSheet.png'
import smokeSource from './../../assets/NinjaAdventure/FX/Smoke/Smoke/SpriteSheet.png'
import sparkSource from './../../assets/NinjaAdventure/FX/Particle/Spark.png'
import tilesList from './../../assets/tiles_list_v1.4.txt?raw'
import tilesSource from './../../assets/0x72_DungeonTilesetII_v1.4.png'
import tilesetElementData from './../../assets/NinjaAdventure/Backgrounds/Tilesets/TilesetElement.json'
import tilesetElementSource from './../../assets/NinjaAdventure/Backgrounds/Tilesets/TilesetElement.png'
import tilesetFloorDetailData from './../../assets/NinjaAdventure/Backgrounds/Tilesets/TilesetFloorDetail.json'
import tilesetFloorDetailSource from './../../assets/NinjaAdventure/Backgrounds/Tilesets/TilesetFloorDetail.png'
import tilesetHoleData from './../../assets/NinjaAdventure/Backgrounds/Tilesets/TilesetHole.json'
import tilesetHoleSource from './../../assets/NinjaAdventure/Backgrounds/Tilesets/TilesetHole.png'
import tilesetHouseData from './../../assets/NinjaAdventure/Backgrounds/Tilesets/TilesetHouse.json'
import tilesetHouseSource from './../../assets/NinjaAdventure/Backgrounds/Tilesets/TilesetHouse.png'
import tilesetNatureData from './../../assets/NinjaAdventure/Backgrounds/Tilesets/TilesetNature.json'
import tilesetNatureSource from './../../assets/NinjaAdventure/Backgrounds/Tilesets/TilesetNature.png'
import titleSource from './../../assets/title.png'
import vaseParticlesSource from './../../assets/NinjaAdventure/FX/Particle/Vase.png'
import woodParticlesSource from './../../assets/NinjaAdventure/FX/Particle/Wood.png'

//! Assets
const assets: {
	UI: Record<string, Tile>
	icons: Record<string, Tile>
	magic: Record<string, Tile>
	tiles: Record<tileName, Tile>
	skills: Record<skillName, Tile>
	blood: Record<string, Tile>
	npc: Record<npcTileName, Tile>
	nature: Record<string, Tile>
	elements: Record<string, Tile>
	house: Record<string, Tile>
	effects: Record<string, Tile>
	hole: Record<string, Tile>
	details: Record<string, Tile>
	inputs: Record<string, Tile>
	maps: Record<BACKGROUND, LDTKMap>
	flag: Tile
	title: Tile
} = {
	UI: await AssetLoader.loadFromSlices(GUIData, GUISource),
	icons: await AssetLoader.loadFromSlices(iconsData, iconsSource,
		({ buffer }) => ({ buffer, padding: true })
	),
	magic: await AssetLoader.loadFromSlices(MagicSpellsAllSpritesData, MagicSpellsAllSpritesSource,
		({ buffer }) => ({ buffer, frames: buffer.canvas.width / 24, width: 24 })
	),
	tiles: await AssetLoader.loadFromTileList(tilesList, tilesSource),
	skills: await AssetLoader.loadFromGlob(import.meta.glob('./../../assets/icons/*.png', { eager: true })) as Record<skillName, Tile>,
	blood: await AssetLoader.loadFromGlob(import.meta.glob('./../../assets/blood/*.png', { eager: true }), ({ buffer }) => {
		const frames = buffer.canvas.width / buffer.canvas.height
		return { buffer, frames, width: buffer.canvas.height }
	}),
	flag: await Tile.fromImage(await AssetLoader.loadImage(flagSource), ({ buffer }) => ({ buffer, width: 16, frames: 4 })),
	npc: await AssetLoader.loadFromGlob(import.meta.glob('./../../assets/npc/*.png', { eager: true }), ({ buffer }) => ({ buffer, frames: 4, width: 32 })) as Record<npcTileName, Tile>,
	maps: await LDTKMap.load(import.meta.glob(['/assets/**/_composite.png', '/assets/map/Arenas/*.json'], { eager: true })),
	nature: await AssetLoader.loadFromSlices(tilesetNatureData, tilesetNatureSource),
	elements: await AssetLoader.loadFromSlices(tilesetElementData, tilesetElementSource),
	house: await AssetLoader.loadFromSlices(tilesetHouseData, tilesetHouseSource),
	effects: {
		Leaf: Tile.fromImage(await AssetLoader.loadImage(leafSource), ({ buffer }) => ({ buffer, width: 12, frames: 6 })),
		Spark: Tile.fromImage(await AssetLoader.loadImage(sparkSource), ({ buffer }) => ({ buffer, width: 10, frames: 7 })),
		Smoke: Tile.fromImage(await AssetLoader.loadImage(smokeSource), ({ buffer }) => ({ buffer, width: 32, frames: 6 })),
		Aura: Tile.fromImage(await AssetLoader.loadImage(auraSource), ({ buffer }) => ({ buffer, width: 32, frames: 4 })),
		FireProjectile: Tile.fromImage(await AssetLoader.loadImage(fireProjectileSource), ({ buffer }) => ({ buffer, width: 16, frames: 15 })),
		Lightning: Tile.fromImage(await AssetLoader.loadImage(lightningSource), ({ buffer }) => ({ buffer, width: 20, frames: 8 })),
		SmokeCircular: Tile.fromImage(await AssetLoader.loadImage(smokeCircularSource), ({ buffer }) => ({ buffer, width: 30, frames: 8 })),
		rainDrop: Tile.fromImage(await AssetLoader.loadImage(rainDropSource), ({ buffer }) => ({ buffer, width: 8, frames: 3 })),
		rainFloor: Tile.fromImage(await AssetLoader.loadImage(rainFloorSource), ({ buffer }) => ({ buffer, width: 8, frames: 3 })),
		iceSpike: Tile.fromImage(await AssetLoader.loadImage(iceSpikeSource), ({ buffer }) => ({ buffer, width: 10, frames: 8 })),
		rockParticle: Tile.fromImage(await AssetLoader.loadImage(rockParticlesSource), ({ buffer }) => ({ buffer, width: 16, frames: 5 })),
		rockBlueParticle: Tile.fromImage(await AssetLoader.loadImage(rockBlueParticlesSource), ({ buffer }) => ({ buffer, width: 16, frames: 5 })),
		grassParticle: Tile.fromImage(await AssetLoader.loadImage(grassParticlesSource), ({ buffer }) => ({ buffer, width: 12, frames: 6 })),
		hayParticle: Tile.fromImage(await AssetLoader.loadImage(hayParticlesSource), ({ buffer }) => ({ buffer, width: 12, frames: 6 })),
		vaseParticle: Tile.fromImage(await AssetLoader.loadImage(vaseParticlesSource), ({ buffer }) => ({ buffer, width: 12, frames: 6 })),
		woodParticle: Tile.fromImage(await AssetLoader.loadImage(woodParticlesSource), ({ buffer }) => ({ buffer, width: 12, frames: 6 })),


	},
	hole: await AssetLoader.loadFromSlices(tilesetHoleData, tilesetHoleSource),
	details: await AssetLoader.loadFromSlices(tilesetFloorDetailData, tilesetFloorDetailSource),
	title: Tile.fromImage(await AssetLoader.loadImage(titleSource)),
	inputs: await AssetLoader.loadFromSlices(inputsData, inputsSource),
} as const
export default assets