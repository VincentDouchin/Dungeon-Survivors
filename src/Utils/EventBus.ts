class EventBus {
	private subscribers: { [event: string]: Function[] } = {};

	subscribe(event: string, callback: Function) {
		if (!this.subscribers[event]) {
			this.subscribers[event] = [];
		}
		this.subscribers[event].push(callback);
	}

	unsubscribe(event: string, callback: Function) {
		if (this.subscribers[event]) {
			const index = this.subscribers[event].indexOf(callback);
			if (index !== -1) {
				this.subscribers[event].splice(index, 1);
			}
		}
	}

	publish(event: string, data: any) {
		if (this.subscribers[event]) {
			this.subscribers[event].forEach((callback) => callback(data));
		}
	}
}
export default EventBus