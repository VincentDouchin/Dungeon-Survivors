import { EventMap } from "../Constants/Events"

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
	private subscribers: Subscribers = {};

	subscribe<Name extends EventName>(event: Name, callback: EventCallback<Name>) {
		if (!this.subscribers[event]) {
			this.subscribers[event] = []
		}
		this.subscribers[event]!.push(callback);
		return () => this.unsubscribe<Name>(event, callback)
	}

	unsubscribe<Name extends EventName>(event: Name, callback: EventCallback<Name>) {
		if (this.subscribers[event]) {
			const index = this.subscribers[event]!.indexOf(callback);
			if (index !== -1) {
				this.subscribers[event]!.splice(index, 1);
			}
		}
	}

	publish<Name extends EventName>(event: Name, data: Event<Name>['data']) {
		if (this.subscribers[event]) {
			this.subscribers[event]!.forEach((callback) => callback(data));
		}
	}
}


export default EventBus