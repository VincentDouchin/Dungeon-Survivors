import { Component } from "../Globals/ECS";
// @ts-ignore
import { Text } from 'troika-three-text'
class TextComponent extends Component {
	previousText: string = ''
	text: string
	mesh: Text
	constructor(text: string, options?: { size?: number }) {
		super()
		const newOptions = Object.assign({ size: 16 }, options)
		this.text = text
		this.previousText = text
		this.mesh = new Text()
		this.mesh.text = text
		this.mesh.fontSize = newOptions.size
		this.mesh.font = '../../assets/fonts/m5x7.ttf'
		this.mesh.anchorY = 'middle'
		this.mesh.anchorX = 'center'
		this.mesh.color = 0xffffff


	}
	setText(newText: string) {
		this.previousText = this.text
		this.text = newText
		this.mesh.text = newText
	}

}
TextComponent.register()
export default TextComponent