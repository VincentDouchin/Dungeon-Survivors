interface GameState {
	update: Function
	render: Function
}
type Constructor<T> = new (...args: any[]) => T;