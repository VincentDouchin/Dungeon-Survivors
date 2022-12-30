import Engine from "./Globals/Engine"
import Run from "./GameStates/RunState"
import LevelUp from "./GameStates/LevelUpState"
import m5xy from '../assets/fonts/m5x7.ttf'
//@ts-ignore
import { preloadFont } from 'troika-three-text'

await new Promise<void>((resolve) => preloadFont(
	{ font: m5xy, }, () => resolve()
))
Engine.addState('run', new Run())
Engine.addState('levelUp', new LevelUp())
Engine.setState('run')
Engine.start()

