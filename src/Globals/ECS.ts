const ECS = new class {
	components: Map<string, Map<string, Component>> = new Map()
	systems: System[] = []
	entities: Map<string, Entity> = new Map()
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
}
class Component {
	static register() {
		ECS.components.set(this.name, new Map())
	}
	save() {
		return JSON.stringify(this)
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
			ECS.components.get(component.constructor.name)?.set(this.id, component)
		})
	}
	getComponent<T extends Component>(component: Constructor<T>) {
		return ECS.components.get(component.name)?.get(this.id) as T
	}

}

export { ECS, System, Component, Entity }