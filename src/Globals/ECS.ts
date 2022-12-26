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
	id: string
	constructor() {
		this.id = window.crypto.randomUUID()
		ECS.registerEntity(this)
	}
	addComponent(...components: Component[]) {
		components.forEach(component => {
			if (component.bind) component.bind(this.id)
			ECS.components.get(component.constructor.name)?.set(this.id, component)
		})
	}
	getComponent<T extends Component>(component: Constructor<T>) {
		return ECS.components.get(component.name)?.get(this.id) as T
	}
	destroy() {
		ECS.eventBus.publish(ECSEVENTS.DELETEENTITY, this.id)
		ECS.components.forEach(componentMap => {
			if (!componentMap.has(this.id)) return
			componentMap.get(this.id)?.destroy()
			componentMap.delete(this.id)
		})
	}

}

export { ECS, System, Component, Entity }