import ECSEVENTS from "../Constants/ECSEvents"
import EventBus from "../Utils/EventBus"
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
			system.update(entities)
		})
	}
	unRegisterSystems() {
		this.systems = []
	}

}

interface System {
	update(entities: Entity[]): void
}
class System {
	target
	static register() {
		ECS.registerSystem(this)
	}
	constructor(target: Constructor<Component>) {
		this.target = target
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
	childrenIds: string[] = []
	constructor() {
		this.id = window.crypto.randomUUID()
		ECS.registerEntity(this)
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (entity: Entity) => {
			if (entity.id == this.parentId) {
				this.destroy()
			}
		})
	}
	get children() {
		return this.childrenIds.map(childId => ECS.getEntityById(childId))
	}
	addChildren(child: Entity) {
		child.parentId = this.id
		this.childrenIds.push(child.id)
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (entity: Entity) => {
			this.removeChildren(entity)
		})
		return child
	}
	removeChildren(child: Entity) {

		if (this.childrenIds.includes(child.id)) {
			this.childrenIds.splice(this.childrenIds.indexOf(child.id), 1)
		}

	}
	removeComponent<T extends Component>(component: Constructor<T>) {
		const componentMap = ECS.components.get(component.constructor.name)
		componentMap?.delete(this.id)
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
	destroy() {
		ECS.eventBus.publish(ECSEVENTS.DELETEENTITY, this)
		ECS.components.forEach(componentMap => {
			if (!componentMap.has(this.id)) return
			componentMap.get(this.id)?.destroy()
			componentMap.delete(this.id)
		})
		ECS.entities.delete(this.id)
	}

}

export { ECS, System, Component, Entity }