import type { Entity } from "../Globals/ECS"
import type PositionComponent from "../Components/PositionComponent"

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
export interface SELECTED extends Event {
	type: ECSEVENTS.SELECTED
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
	MANA_PERCENT = 'MANA_PERCENT'
}

export default ECSEVENTS