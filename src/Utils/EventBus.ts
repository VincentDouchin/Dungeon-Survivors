import { EventMap } from '../Constants/Events'

export type EventName = keyof EventMap


export interface Event<Name extends EventName> {
	type: Name
	data: EventMap[Name]
}

export type EventCallback<Name extends EventName> = (event: Event<Name>['data']) => void

export type Subscribers = {
	[Name in EventName]?: EventCallback<Name>[]
}
class EventBus {
	private subscribers: Subscribers = {}

	subscribe<Name extends EventName>(event: Name, callback: EventCallback<Name>) {
		if (!this.subscribers[event]) {
			this.subscribers[event] = []
		}
		const subscribers = this.subscribers[event]
		
		subscribers && subscribers.push(callback)
		return () => this.unsubscribe<Name>(event, callback)
	}

	unsubscribe<Name extends EventName>(event: Name, callback: EventCallback<Name>) {
		const subscribers = this.subscribers[event]
		if (subscribers) {
			const index = subscribers.indexOf(callback)
			if (index !== -1 && this.subscribers[event]) {
				subscribers.splice(index, 1)
			}
		}
	}
	
	publish<Name extends EventName>(event: Name, data: Event<Name>['data']) {
		const subscribers = this.subscribers[event]
		if (subscribers?.length) {
			
			subscribers.forEach((callback) => callback(data))
		}
	}
}


export default EventBus