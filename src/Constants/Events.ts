import type { Entity } from '../Globals/ECS'
import type { INPUTNAME } from '../Globals/InputManager'
import type PositionComponent from '../Components/PositionComponent'
import type Tile from '../Utils/Tile'
import type StatsComponent from '../Components/StatsComponent'
import type { Skill } from './Skills'
import type INPUTS from './InputsNames'

export enum UIEVENTS {
	UI_XP = 'UI_XP',
	UI_LEVEL = 'UI_LEVEL',
	ENEMY_LEVEL = 'ENEMY_LEVEL',
	DISPLAY_BOOST = 'DISPLAY_BOOST',
	TOUCH = 'TOUCH',
	UPDATE_HEALTH = 'UPDATE_HEALTH',
}

export enum ECSEVENTS {
	CAMERA_MOVE = 'CAMERA_MOVE',
	DELETE_ENTITY = 'DELETE_ENTITY',
	XP_PERCENT = 'XP_PERCENT',
	LEVEL_UP = 'LEVEL_UP',
	NEW_SKILL = 'NEW_SKILL',
	PATH_POSITION = 'PATH_POSITION',
	ADD_TO_BACKGROUND = 'ADD_TO_BACKGROUND',
	SELECTED = 'SELECTED',
	DESELECTED = 'DESELECTED',
	MANA_PERCENT = 'MANA_PERCENT',
	SPELL_ICON = 'SPELL_ICON',
	SKILL_ICON = 'SKILL_ICON',
	ADD_TO_ENCOUNTER = 'ADD_TO_ENCOUNTER',
	MANA_AMOUNT = 'MANA_AMOUNT',
	TAKE_DAMAGE = 'TAKE_DAMAGE',
	TIMER = 'TIMER',
	ADD_WALL = 'ADD_WALL',
	REMOVE_WALL = 'REMOVE_WALL',
	XP_UP = 'XP_UP',
}
export type EventMap = {
	[ECSEVENTS.CAMERA_MOVE]: { x: number; y: number }
	[ECSEVENTS.DELETE_ENTITY]: Entity
	[ECSEVENTS.TAKE_DAMAGE]: { entity: Entity; amount: number; loop?: boolean }
	[ECSEVENTS.XP_PERCENT]: { amount: number; max: number; entity: Entity }
	[ECSEVENTS.LEVEL_UP]: Entity
	[ECSEVENTS.PATH_POSITION]: { position: PositionComponent; encounter: boolean }
	[ECSEVENTS.NEW_SKILL]: Skill
	[ECSEVENTS.ADD_TO_BACKGROUND]: Entity
	[ECSEVENTS.MANA_PERCENT]: { percent: number; entity: Entity }
	[ECSEVENTS.MANA_AMOUNT]: number
	[ECSEVENTS.SELECTED]: Entity
	[ECSEVENTS.DESELECTED]: Entity
	[ECSEVENTS.SPELL_ICON]: Tile
	[ECSEVENTS.SKILL_ICON]: Tile
	[ECSEVENTS.ADD_TO_ENCOUNTER]: Entity
	[ECSEVENTS.TIMER]: number
	[ECSEVENTS.XP_UP]: { entity: Entity; amount: number }
	[ECSEVENTS.ADD_WALL]: Entity
	[ECSEVENTS.REMOVE_WALL]: { entity: Entity; deleteLoot: boolean }
	[UIEVENTS.UI_XP]: number
	[UIEVENTS.UI_LEVEL]: number
	[UIEVENTS.ENEMY_LEVEL]: number
	[UIEVENTS.DISPLAY_BOOST]: StatsComponent
	[UIEVENTS.TOUCH]: { input: INPUTS; amount: number; entity: Entity }
	[UIEVENTS.UPDATE_HEALTH]: { entity: Entity; percent: number }
}
	& Record<INPUTNAME, number>
	& Record<'move' | 'down' | 'up', TouchCoord>
	& Record<'enable' | 'disable', string>
