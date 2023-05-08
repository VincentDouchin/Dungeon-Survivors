import '@total-typescript/ts-reset'

import { preloadFont } from 'troika-three-text'
// @ts-expect-error no types
import { install } from 'ga-gtag'
import m5x7 from '../assets/fonts/m5x7.ttf?url'
import GameOverState from './GameStates/GameOverState'
import LevelUpState from './GameStates/LevelUpState'
import MapState from './GameStates/MapState'
import PauseState from './GameStates/PauseState'
import RunState from './GameStates/RunState'
import WinState from './GameStates/WinState'
import { engine } from './Globals/Initialize'
await new Promise<void>(resolve => preloadFont(
	{ font: m5x7 }, () => resolve(),
))
engine.addState(RunState)
engine.addState(LevelUpState)
engine.addState(PauseState)
engine.addState(MapState)
engine.addState(GameOverState)
engine.addState(WinState)
engine.setState(MapState)
engine.start()
window.addEventListener('touchstart', () => {
	window.screen.orientation.lock('landscape')
	document.body.requestFullscreen()
})
window.addEventListener('pointerdown', () => {
	window.focus()
})
install('G-7F8LR6N3YZ')
