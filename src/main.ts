import Engine from "./Globals/Engine"
import RunState from "./GameStates/RunState"
import LevelUpState from "./GameStates/LevelUpState"
import m5xy from '../assets/fonts/m5x7.ttf'
//@ts-ignore
import { preloadFont } from 'troika-three-text'
import PauseState from "./GameStates/PauseState"
import MapState from "./GameStates/MapState"
import { State } from "./Constants/GameStates"

await new Promise<void>((resolve) => preloadFont(
	{ font: m5xy, }, () => resolve()
))
Engine.addState(State.run, new RunState())
Engine.addState(State.levelUp, new LevelUpState())
Engine.addState(State.pause, new PauseState())
Engine.addState(State.map, new MapState())
Engine.setState(State.map)
Engine.start()

