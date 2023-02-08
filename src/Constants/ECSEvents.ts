import type { Entity } from "../Globals/ECS"
import type PositionComponent from "../Components/PositionComponent"

export interface Event {
	type: string
	data: any
}
export interface CAMERA_MOVE extends Event {
	type: 'CAMERA_MOVE'
	data: { x: number, y: number }
}
export interface DELETE_ENTITY extends Event {
	type: 'DELETE_ENTITY'
	data: Entity
}
export interface XP_PERCENT extends Event {
	type: 'XP_PERCENT'
	data: number
}
export interface LEVEL_UP extends Event {
	type: 'LEVEL_UP'
	data: number
}
export interface PATH_POSITION extends Event {
	type: 'PATH_POSITION'
	data: PositionComponent
}
export interface SKILL extends Event {
	type: 'SKILL'
	data: Skill
}
export interface ADD_TO_BACKGROUND extends Event {
	type: 'ADD_TO_BACKGROUND'
	data: Entity
}
enum ECSEVENTS {
	CAMERA_MOVE = 'CAMERA_MOVE',
	DELETE_ENTITY = 'DELETE_ENTITY',
	XP_PERCENT = 'XP_PERCENT',
	LEVEL_UP = 'LEVEL_UP',
	SKILL = 'SKILL',
	PATH_POSITION = 'PATH_POSITION',
	ADD_TO_BACKGROUND = 'ADD_TO_BACKGROUND'
}

export default ECSEVENTS