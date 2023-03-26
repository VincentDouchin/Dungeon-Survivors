import '@total-typescript/ts-reset'

import { preloadFont } from 'troika-three-text'
import m5x7 from '../assets/fonts/m5x7.ttf?url'
import GameOverState from './GameStates/GameOverState'
import LevelUpState from './GameStates/LevelUpState'
import MapState from './GameStates/MapState'
import PauseState from './GameStates/PauseState'
import PlayerSelectState from './GameStates/PlayerSelectState'
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
engine.addState(PlayerSelectState)
engine.addState(WinState)
engine.setState(MapState)
engine.start()
