import Engine from "./Globals/Engine"
import RunState from "./GameStates/RunState"
import LevelUpState from "./GameStates/LevelUpState"
import m5xy from '../assets/fonts/m5x7.ttf'
//@ts-ignore
import { preloadFont } from 'troika-three-text'
import PauseState from "./GameStates/PauseState"
import MapState from "./GameStates/MapState"

await new Promise<void>((resolve) => preloadFont(
	{ font: m5xy, }, () => resolve()
))
Engine.addState('run', new RunState())
Engine.addState('levelUp', new LevelUpState())
Engine.addState('pause', new PauseState())
Engine.addState('map', new MapState())
Engine.setState('map')
Engine.start()

