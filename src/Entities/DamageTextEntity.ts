import { Easing, Tween } from '@tweenjs/tween.js'
import { ECS, Entity } from '../Globals/ECS'

import { ECSEVENTS } from '../Constants/Events'
import ExpirationComponent from '../Components/ExpirationComponent'
import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import TextComponent from '../Components/TextComponent'
import Tile from '../Utils/Tile'
import { engine } from '../Globals/Initialize'
const DamageTextEntity = (position: PositionComponent, damageAmount: number, crit: boolean) => {
	const damageText = new Entity('damageText')
	ECS.eventBus.publish(ECSEVENTS.ADD_TO_BACKGROUND, damageText)
	const textPosition = damageText.addComponent(new PositionComponent(position.x, position.y))
	damageText.addComponent(new SpriteComponent(Tile.empty()))
	damageText.addComponent(new ExpirationComponent(60))
	const textSprite = damageText.addComponent(new TextComponent(String(Number((damageAmount * -1).toFixed(1))), { size: 8, color: damageAmount < 0 ? 0x33CC33 : (crit ? 0xFF0000 : 0xFFFFFF), outlineWidth: 0.5 }))
	new Tween(textPosition).to({ y: textPosition.y + 20 }, 60).easing(Easing.Quadratic.In).start(engine.timer)
	new Tween(textSprite.mesh).to({ fillOpacity: 0, outlineOpacity: 0 }, 60).easing(Easing.Quadratic.In).start(engine.timer)
}
export default DamageTextEntity
