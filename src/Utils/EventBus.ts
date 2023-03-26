// import { EventMap } from '../Constants/Events'

export type EventMap = Record<string, any>
export type EventName<E extends EventMap> = keyof E

export interface Event<E extends EventMap, Name extends EventName<E>> {
	type: Name
	data: E[Name]
}

export type EventCallback<E extends EventMap, Name extends EventName<E>> = (event: Event<E, Name>['data']) => void

export type Subscribers<E extends EventMap> = {
	[Name in EventName<E>]?: EventCallback<E, Name>[]
}
class EventBus<E extends EventMap> {
	private subscribers: Subscribers<E> = {}

	subscribe<Name extends EventName<E>>(event: Name, callback: EventCallback<E, Name>) {
		if (!this.subscribers[event]) {
			this.subscribers[event] = []
		}
		const subscribers = this.subscribers[event]

		subscribers && subscribers.push(callback)
		return () => this.unsubscribe<Name>(event, callback)
	}

	unsubscribe<Name extends EventName<E>>(event: Name, callback: EventCallback<E, Name>) {
		const subscribers = this.subscribers[event]
		if (subscribers) {
			const index = subscribers.indexOf(callback)
			if (index !== -1 && this.subscribers[event]) {
				subscribers.splice(index, 1)
			}
		}
	}

	publish<Name extends EventName<E>>(event: Name, data: Event<E, Name>['data']) {
		const subscribers = this.subscribers[event]
		if (subscribers?.length) {
			subscribers.forEach(callback => callback(data))
		}
	}
}

export default EventBus
