class ShaderPass {
	uuid: string
	constructor() {
		this.uuid = window.crypto.randomUUID()
	}
}
export default ShaderPass