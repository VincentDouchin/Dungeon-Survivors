import type { Entity } from "../Globals/ECS"
import { HeroDefinition } from "./Heros"
import type PositionComponent from "../Components/PositionComponent"
import Tile from "../Utils/Tile"

export interface Event {
	type: string
	data: any
}
export interface CAMERA_MOVE extends Event {
	type: ECSEVENTS.CAMERA_MOVE
	data: { x: number, y: number }
}
export interface DELETE_ENTITY extends Event {
	type: ECSEVENTS.DELETE_ENTITY
	data: Entity
}
export interface XP_PERCENT extends Event {
	type: ECSEVENTS.XP_PERCENT
	data: number
}
export interface LEVEL_UP extends Event {
	type: ECSEVENTS.LEVEL_UP
	data: number
}
export interface PATH_POSITION extends Event {
	type: ECSEVENTS.PATH_POSITION
	data: PositionComponent
}
export interface SKILL extends Event {
	type: ECSEVENTS.SKILL
	data: Skill
}
export interface ADD_TO_BACKGROUND extends Event {
	type: ECSEVENTS.ADD_TO_BACKGROUND
	data: Entity
}
export interface ENENMY_LEVEL_UP extends Event {
	type: ECSEVENTS.ENENMY_LEVEL_UP
	data: number
}
export interface MANA_PERCENT extends Event {
	type: ECSEVENTS.MANA_PERCENT
	data: number
}
export interface MANA_AMOUNT extends Event {
	type: ECSEVENTS.MANA_AMOUNT
	data: number
}
export interface SELECTED extends Event {
	type: ECSEVENTS.SELECTED
	data: Entity
}
export interface DESELECTED extends Event {
	type: ECSEVENTS.DESELECTED
	data: Entity
}
export interface SPELL_ICON extends Event {
	type: ECSEVENTS.SPELL_ICON
	data: Tile
}
export interface SKILL_ICON extends Event {
	type: ECSEVENTS.SKILL_ICON
	data: Tile
}
export interface ADD_TO_ENCOUNTER extends Event {
	type: ECSEVENTS.ADD_TO_ENCOUNTER
	data: Entity
}


enum ECSEVENTS {
	CAMERA_MOVE = 'CAMERA_MOVE',
	DELETE_ENTITY = 'DELETE_ENTITY',
	XP_PERCENT = 'XP_PERCENT',
	LEVEL_UP = 'LEVEL_UP',
	SKILL = 'SKILL',
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

export default ECSEVENTS