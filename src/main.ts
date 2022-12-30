import Engine from "./Globals/Engine"
import Run from "./GameStates/RunState"
import LevelUp from "./GameStates/LevelUpState"
//@ts-ignore
import { preloadFont } from 'troika-three-text'

await new Promise<void>((resolve) => preloadFont(
	{ font: '../assets/fonts/m5x7.ttf', }, () => resolve()
))
Engine.addState('run', new Run())
Engine.addState('levelUp', new LevelUp())
Engine.setState('run')
Engine.start()

