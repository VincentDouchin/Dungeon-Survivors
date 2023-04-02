import { Color } from 'three'
import AnimationComponent from '../Components/AnimationComponent'
import BODYSIZES from '../Constants/BodySizes'
import BodyComponent from '../Components/BodyComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import DIFFICULTY from '../Constants/DIfficulty'
import { Entity } from '../Globals/ECS'
import FlockingComponent from '../Components/FlockingComponent'
import HealthComponent from '../Components/HealthComponent'
import type { HeroDefinition } from '../Constants/Heros'
import type LevelComponent from '../Components/LevelComponent'
import LightComponent from '../Components/LightComponent'
import ManaComponent from '../Components/ManaComponent'
import PositionComponent from '../Components/PositionComponent'
import RangedComponent from '../Components/RangedComponent'
import { SOUNDS } from '../Constants/Sounds'
import type { STATS } from '../Components/StatsComponent'
import SpellComponent from '../Components/SpellComponent'
import SpriteComponent from '../Components/SpriteComponent'
import State from '../Globals/State'
import type StatsComponent from '../Components/StatsComponent'
import SwitchingComponent from '../Components/SwitchingComponent'
import XPPickerComponent from '../Components/XPPickerComponent'
import WeaponEntity from './WeaponEntity'
import ShadowEntity from './ShadowEntity'
import HealthBarEntity from './HealthBarEntity'
import PlayerManaBarEntity from './PlayerManaBarEntity'
import DisplayBuffsEntity from './DisplayBuffsEntity'

const playergroup = FlockingComponent.getGroup()
const PlayerEntity = (hero: HeroDefinition, main: boolean, stats: StatsComponent, mana: ManaComponent, level: LevelComponent, index: number) => {
	const player = new Entity(`player ${main}`)

	for (const [statName, modifier] of Object.entries(hero.stats) as [STATS, number][]) {
		stats.set(statName, modifier)
	}
	player.addComponent(stats)
	player.addComponent(new SpellComponent(hero.spell))
	player.addComponent(new SpriteComponent(hero.tiles.idle))
	player.addComponent(new LightComponent(new Color('hsl(0,0%,80%)'), 100))
	const playerHealth: number = {
		[DIFFICULTY.EASY]: 300,
		[DIFFICULTY.NORMAL]: 200,
		[DIFFICULTY.HARD]: 100,
	}[State.difficulty ?? DIFFICULTY.EASY]

	player.addComponent(new HealthComponent(playerHealth, COLLISIONGROUPS.PLAYER, true, SOUNDS.PLAYER_DAMAGE))
	player.addComponent(new AnimationComponent(hero.tiles))
	if (!hero.weapon.some(weapon => weapon.damage)) {
		player.addComponent(new RangedComponent())
	}
	player.addComponent(new SwitchingComponent(main, index))
	player.addComponent(new FlockingComponent(playergroup, !main, 100))
	player.addComponent(new BodyComponent(
		{ moveForce: 11000 },

		{ width: BODYSIZES.normal.width, height: BODYSIZES.normal.height, mass: 10, offset: hero.tiles.idle.height, contact: true, group: COLLISIONGROUPS.PLAYER, canCollideWith: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.TRAP, COLLISIONGROUPS.POTION, COLLISIONGROUPS.WALL, COLLISIONGROUPS.PORTAL, COLLISIONGROUPS.LOOT] },

	))
	player.addComponent(new PositionComponent(Math.random() * 40 - 20, Math.random() * 40 - 20))

	if (State.multiplayer) {
		player.addComponent(new ManaComponent())
		player.addChildren(PlayerManaBarEntity(player, BODYSIZES.normal.height / 2 + 2))
	} else {
		player.addComponent(mana)
	}
	player.addComponent(level)
	player.addChildren(ShadowEntity(16, 6, 16, player))
	player.addChildren(HealthBarEntity(player, BODYSIZES.normal.height / 2 + 4))
	player.addChildren(DisplayBuffsEntity(player, BODYSIZES.normal.height / 2 + 8))
	player.addComponent(new XPPickerComponent())
	for (const weapon of hero.weapon) {
		player.addChildren(WeaponEntity(weapon, player, BODYSIZES.normal.height, stats, level))
	}
	return player
}

export default PlayerEntity
