const ECS = new class {
	components: Map<string, Map<string, Component>> = new Map()
	systems: Map<string, System> = new Map()
	entities: Map<string, Entity> = new Map()
	registerEntity(entity: Entity) {
		this.entities.set(entity.id, entity)
	}
}
// @ts-ignore
window.ECS = ECS
class System {

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