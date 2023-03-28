import type { EventCallback, EventName } from '../Utils/EventBus'

import { ECSEVENTS } from '../Constants/Events'
import EventBus from '../Utils/EventBus'
import type { EventMap } from '../Constants/Events'

const ECS = new class {
	components: Map<string, Map<Entity, Component>> = new Map()
	systems: System[] = []
	entities: Set< Entity> = new Set()
	eventBus = new EventBus<EventMap>()
	registerEntity(entity: Entity) {
		this.entities.add(entity)
	}

	getEntitiesAndComponents<T>(componentType: Constructor<T>): Array<[Entity, T]> {
		const components = this.components.get(componentType.name)
		if (!components) return []
		return Array.from(components.entries()) as Array<[Entity, T]>
	}

	registerSystem<S extends Constructor<System>>(System: S) {
		this.systems.push(new System())
	}

	updateSystems() {
		this.systems.forEach((system) => {
			const componentMap = this.components.get(system.target.name)
			if (!componentMap) return
			const entitiesID: Entity[] = [...componentMap.keys()]
			const entities = entitiesID.filter(Boolean)
			system.update && system.update(entities)
		})
	}

	unRegisterSystems() {
		this.systems.forEach((system) => {
			system.subscribers.forEach(sub => sub())
		})
		this.systems = []
	}
}()

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

	subscribe<Name extends EventName<EventMap>>(event: Name, callback: EventCallback<EventMap, Name>) {
		this.subscribers.push(ECS.eventBus.subscribe(event, callback))
	}
}
interface Component {

	bind(entity: Entity): void
	destroy(): void

}
abstract class Component {
	static register() {
		ECS.components.set(this.name, new Map())
	}

	save() {
		return JSON.stringify(this)
	}
}

class Entity {
	id: string
	name: string
	children = new Set<Entity>()
	parent?: Entity
	constructor(name: string) {
		this.name = name ?? ''
		this.id = window.crypto.randomUUID()
		ECS.registerEntity(this)
		ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, (entity) => {
			this.removeChildren(entity)
		})
	}

	addChildren(child: Entity) {
		child.parent = this
		this.children.add(child)

		return child
	}

	removeChildren(child: Entity) {
		if (this.children.has(child)) {
			this.children.delete(child)
		}
	}

	removeComponent<T extends Component>(componentConstructor: Constructor<T>) {
		const componentMap = ECS.components.get(componentConstructor.name)
		const component = componentMap?.get(this)
		componentMap?.delete(this)
		return component as T
	}

	addComponent<T extends Component>(component: T) {
		if (component.bind) component.bind(this)
		ECS.components.get(component.constructor.name)?.set(this, component)
		return component as T
	}

	getRecursiveComponent<T extends Component>(component: Constructor<T>): T | null {
		return this.getComponent(component) ?? (this.parent ? this.parent.getRecursiveComponent(component) : null)
	}

	getComponent<T extends Component>(component: Constructor<T>) {
		return ECS.components.get(component.name)?.get(this) as T
	}

	onDestroy(fn: () => void) {
		const unSubscriber = ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, (entity) => {
			if (entity.id === this.id) {
				unSubscriber()
				fn()
			}
		})
	}

	destroy() {
		ECS.eventBus.publish(ECSEVENTS.DELETE_ENTITY, this)
		for (const children of this.children) {
			children?.destroy()
		}
		ECS.components.forEach((componentMap) => {
			if (!componentMap.has(this)) return
			componentMap.get(this)?.destroy && componentMap.get(this)?.destroy()
			componentMap.delete(this)
		})
		ECS.entities.delete(this)
	}
}

export { ECS, System, Component, Entity }
