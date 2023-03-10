import EventBus, { EventCallback, EventName } from "../Utils/EventBus"

import { ECSEVENTS } from "../Constants/Events"

const ECS = new class {
	components: Map<string, Map<string, Component>> = new Map()
	systems: System[] = []
	entities: Map<string, Entity> = new Map()
	eventBus = new EventBus()
	registerEntity(entity: Entity) {
		this.entities.set(entity.id, entity)
	}
	getEntityById(id: string) {
		return this.entities.get(id)!
	}
	getEntitiesAndComponents<T>(componentType: Constructor<T>): Array<[string, T]> {
		const components = this.components.get(componentType.name)
		if (!components) return []
		return Array.from(components.entries()) as Array<[string, T]>
	}
	registerSystem(system: Constructor<System>) {
		this.systems.push(new system)
	}
	updateSystems() {
		this.systems.forEach((system) => {
			const entitiesID: string[] = [... this.components.get(system.target.name)!.keys()]
			const entities: Entity[] = entitiesID.map(id => this.getEntityById(id))
			system.update(entities.filter(entity => entity))
		})
	}
	unRegisterSystems() {
		this.systems.forEach(system => {
			system.subscribers.forEach(sub => sub())
		})
		this.systems = []
	}

}

interface System {
	update(entities: Entity[]): void
}
class System {
	target
	subscribers: Array<() => void> = []
	static register() {
		ECS.registerSystem(this)
	}
	constructor(target: Constructor<Component>) {
		this.target = target
	}
	subscribe<Name extends EventName>(event: Name, callback: EventCallback<Name>) {
		this.subscribers.push(ECS.eventBus.subscribe(event, callback))
	}

}
interface Component {
	destroy(): void
	bind(id: string): void
}
class Component {
	static register() {
		ECS.components.set(this.name, new Map())
	}
	save() {
		return JSON.stringify(this)
	}
	destroy() {

	}

}

class Entity {
	parentId: string | null = null
	id: string
	name: string
	childrenIds: string[] = []
	constructor(name: string) {
		this.name = name ?? ''
		this.id = window.crypto.randomUUID()
		ECS.registerEntity(this)
		ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, (entity) => {
			this.removeChildren(entity)
		})
	}
	get children() {
		return this.childrenIds.map(childId => ECS.getEntityById(childId))
	}
	addChildren(child: Entity) {
		child.parentId = this.id
		this.childrenIds.push(child.id)

		return child
	}
	removeChildren(child: Entity) {

		if (this.childrenIds.includes(child.id)) {
			this.childrenIds.splice(this.childrenIds.indexOf(child.id), 1)
		}

	}
	removeComponent<T extends Component>(componentConstructor: Constructor<T>) {
		const componentMap = ECS.components.get(componentConstructor.name)
		const component = componentMap?.get(this.id)
		componentMap?.delete(this.id)
		return component as T
	}

	addComponent<T extends Component>(component: T) {
		if (component.bind) component.bind(this.id)
		ECS.components.get(component.constructor.name)?.set(this.id, component)
		return component as T
	}
	getRecursiveComponent<T extends Component>(component: Constructor<T>): T | null {
		return this.getComponent(component) ?? (this.parent ? this.parent.getRecursiveComponent(component) : null)
	}
	get parent(): null | Entity {
		if (!this.parentId) return null
		return ECS.getEntityById(this.parentId)
	}
	getComponent<T extends Component>(component: Constructor<T>) {
		return ECS.components.get(component.name)?.get(this.id) as T
	}
	onDestroy(fn: () => void) {
		const unSubscriber = ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, (entity) => {
			if (entity.id === this.id) {
				fn()
				unSubscriber()
			}
		})
	}

	destroy() {
		ECS.eventBus.publish(ECSEVENTS.DELETE_ENTITY, this)
		for (let children of this.children) {
			children.destroy()
		}
		ECS.components.forEach(componentMap => {
			if (!componentMap.has(this.id)) return
			componentMap.get(this.id)?.destroy()
			componentMap.delete(this.id)
		})
		ECS.entities.delete(this.id)
	}

}

export { ECS, System, Component, Entity }
