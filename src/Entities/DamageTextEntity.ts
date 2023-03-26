import { ECS, Entity } from '../Globals/ECS'
import { easeOutBack, easeOutExpo } from '../Utils/Tween'

import Coroutine from '../Globals/Coroutine'
import { ECSEVENTS } from '../Constants/Events'
import ExpirationComponent from '../Components/ExpirationComponent'
import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import TextComponent from '../Components/TextComponent'
import Tile from '../Utils/Tile'

const DamageTextEntity = (position: PositionComponent, damageAmount: number, crit: boolean) => {
	const damageText = new Entity('damageText')
	ECS.eventBus.publish(ECSEVENTS.ADD_TO_BACKGROUND, damageText)
	const textPosition = damageText.addComponent(new PositionComponent(position.x, position.y))
	damageText.addComponent(new SpriteComponent(Tile.empty()))
	damageText.addComponent(new ExpirationComponent(120))
	const textSprite = damageText.addComponent(new TextComponent(String(Number((damageAmount * -1).toFixed(1))), { size: 8, color: damageAmount < 0 ? 0x33CC33 : (crit ? 0xFF0000 : 0xFFFFFF), outlineWidth: 0.5 }))
	new Coroutine(function* (counter) {
		counter++
		textPosition.y = easeOutBack(counter, textPosition.y, textPosition.y + 1, 120)
		textSprite.mesh.fillOpacity = easeOutExpo(counter, 2, 0, 120)
		textSprite.mesh.outlineOpacity = easeOutExpo(counter, 2, 0, 120)
		yield
	}, 120)
}
export default DamageTextEntity
