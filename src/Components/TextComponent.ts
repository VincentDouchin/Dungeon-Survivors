import { Text, anchorX, anchorY } from 'troika-three-text'

import { Component } from '../Globals/ECS'
import m5x7 from '../../assets/fonts/m5x7.ttf?url'

class TextComponent extends Component {
	previousText = ''
	text: string
	mesh: Text
	constructor(text: string, options?: { size?: number, color?: number, maxWidth?: number, anchorY?: anchorY, anchorX?: anchorX, outlineWidth?: number }) {
		super()
		const newOptions = Object.assign({ size: 16, color: 0xffffff, anchorX: 'center', anchorY: 'middle', outlineWidth: 0 }, options)
		this.text = text
		this.previousText = text
		this.mesh = new Text()
		this.mesh.text = text
		this.mesh.fontSize = newOptions.size
		this.mesh.font = m5x7
		this.mesh.anchorY = newOptions.anchorY
		this.mesh.anchorX = newOptions.anchorX
		this.mesh.color = newOptions.color
		this.mesh.renderOrder = 10
		this.mesh.outlineWidth = newOptions.outlineWidth
		if (newOptions.maxWidth) this.mesh.maxWidth = newOptions.maxWidth

	}
	setText(newText: string) {
		this.previousText = this.text
		this.text = newText
		this.mesh.text = newText
	}
	destroy(): void {
		this.mesh.removeFromParent()
		this.mesh.dispose()
	}

}
TextComponent.register()
export default TextComponent