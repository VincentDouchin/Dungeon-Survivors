import Engine from "./Globals/Engine"
import LevelUpState from "./GameStates/LevelUpState"
import MapState from "./GameStates/MapState"
import PauseState from "./GameStates/PauseState"
import RunState from "./GameStates/RunState"
import { State } from "./Constants/GameStates"
import m5x7 from '../assets/fonts/m5x7.ttf?url'
import { preloadFont } from 'troika-three-text'

await new Promise<void>((resolve) => preloadFont(
	{ font: m5x7, }, () => resolve()
))
Engine.addState(State.run, new RunState())
Engine.addState(State.levelUp, new LevelUpState())
Engine.addState(State.pause, new PauseState())
Engine.addState(State.map, new MapState())
Engine.setState(State.run)
Engine.start()

