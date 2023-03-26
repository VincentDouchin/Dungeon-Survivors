type chainFn = (value: any, key: string) => any
class AssetLoaderChain<R> {
	chains: Array<chainFn> = []
	keyTransform: (key: string) => string
	constructor(keyTransform: (key: string) => string) {
		this.keyTransform = keyTransform
	}

	chain(fn: chainFn) {
		this.chains.push(fn)
		return this
	}

	async load<K extends string>(glob: Record<string, any>) {
		const keys = Object.keys(glob).map(this.keyTransform) as K[]
		let values = Object.values(glob)
		for (const transform of this.chains) {
			values = await Promise.all(values.map((value, index) => transform(value, keys[index])))
		}
		return keys.reduce((acc, v, i) => ({ ...acc, [v]: values[i] }), {}) as Record<K, R>
	}
}

export const loadImage = async (source: string) => {
	const img = new Image()
	img.src = source
	await new Promise((resolve) => {
		img.onload = resolve
	})
	return img
}

export default AssetLoaderChain
