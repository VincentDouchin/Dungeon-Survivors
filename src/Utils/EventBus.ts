import { Event } from "../Constants/ECSEvents";

export type EventCallBack<T> = (args: T) => void
class EventBus {
	private subscribers: { [event: string]: Function[] } = {};

	subscribe<T extends Event>(event: T['type'], callback: EventCallBack<T['data']>) {
		if (!this.subscribers[event]) {
			this.subscribers[event] = [];
		}
		this.subscribers[event].push(callback);
		return () => this.unsubscribe<T>(event, callback)
	}

	unsubscribe<T extends Event>(event: T['type'], callback: EventCallBack<T['data']>) {
		if (this.subscribers[event]) {
			const index = this.subscribers[event].indexOf(callback);
			if (index !== -1) {
				this.subscribers[event].splice(index, 1);
			}
		}
	}

	publish<T extends Event>(event: T['type'], data: T['data']) {
		if (this.subscribers[event]) {
			this.subscribers[event].forEach((callback) => callback(data));
		}
	}
}


export default EventBus