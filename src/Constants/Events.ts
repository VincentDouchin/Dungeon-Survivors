import type { Entity } from "../Globals/ECS"
import INPUTS from "./InputsNames"
import type PositionComponent from "../Components/PositionComponent"
import { Skill } from "./Skills"
import Tile from "../Utils/Tile"

export enum UIEVENTS {
	UI_XP = 'UI_XP',
	UI_LEVEL = 'UI_LEVEL'
}

export enum ECSEVENTS {
	CAMERA_MOVE = 'CAMERA_MOVE',
	DELETE_ENTITY = 'DELETE_ENTITY',
	XP_PERCENT = 'XP_PERCENT',
	LEVEL_UP = 'LEVEL_UP',
	NEW_SKILL = 'NEW_SKILL',
	PATH_POSITION = 'PATH_POSITION',
	ADD_TO_BACKGROUND = 'ADD_TO_BACKGROUND',
	ENENMY_LEVEL_UP = 'ENENMY_LEVEL_UP',
	SELECTED = 'SELECTED',
	DESELECTED = 'DESELECTED',
	MANA_PERCENT = 'MANA_PERCENT',
	SPELL_ICON = 'SPELL_ICON',
	SKILL_ICON = 'SKILL_ICON',
	ADD_TO_ENCOUNTER = 'ADD_TO_ENCOUNTER',
	MANA_AMOUNT = 'MANA_AMOUNT',
}
export type EventMap = {
	[ECSEVENTS.CAMERA_MOVE]: { x: number, y: number }
	[ECSEVENTS.DELETE_ENTITY]: Entity
	[ECSEVENTS.XP_PERCENT]: { amount: number, max: number, entity: string }
	[ECSEVENTS.LEVEL_UP]: { level: number, entity: string }
	[ECSEVENTS.PATH_POSITION]: PositionComponent
	[ECSEVENTS.NEW_SKILL]: Skill
	[ECSEVENTS.ADD_TO_BACKGROUND]: Entity
	[ECSEVENTS.ENENMY_LEVEL_UP]: number
	[ECSEVENTS.MANA_PERCENT]: number
	[ECSEVENTS.MANA_AMOUNT]: number
	[ECSEVENTS.SELECTED]: Entity
	[ECSEVENTS.DESELECTED]: Entity
	[ECSEVENTS.SPELL_ICON]: Tile
	[ECSEVENTS.SKILL_ICON]: Tile
	[ECSEVENTS.ADD_TO_ENCOUNTER]: Entity
	[UIEVENTS.UI_XP]: number
	[UIEVENTS.UI_LEVEL]: number
}
	& Record<INPUTS, boolean | number>
	& Record<'move' | 'down' | 'up', TouchCoord>
