import { Component } from "../Globals/ECS";
// @ts-ignore
import { Text } from 'troika-three-text'
class TextComponent extends Component {
	previousText: string = ''
	text: string
	mesh: Text
	constructor(text: string, options?: { size?: number, color?: number, maxWidth?: number, anchorY?: string, anchorX?: string }) {
		super()
		const newOptions = Object.assign({ size: 16, color: 0xffffff, anchorX: 'center', anchorY: 'middle' }, options)
		this.text = text
		this.previousText = text
		this.mesh = new Text()
		this.mesh.text = text
		this.mesh.fontSize = newOptions.size
		this.mesh.font = '../../assets/fonts/m5x7.ttf'
		this.mesh.anchorY = newOptions.anchorY
		this.mesh.anchorX = newOptions.anchorX
		this.mesh.color = newOptions.color
		this.mesh.renderOrder = 10
		this.mesh.maxWidth = 10

	}
	setText(newText: string) {
		this.previousText = this.text
		this.text = newText
		this.mesh.text = newText
	}

}
TextComponent.register()
export default TextComponent