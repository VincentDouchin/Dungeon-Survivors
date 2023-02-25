import Engine from "./Globals/Engine"
import { GameStates } from "./Constants/GameStates"
import LevelUpState from "./GameStates/LevelUpState"
import MapState from "./GameStates/MapState"
import PauseState from "./GameStates/PauseState"
import RunState from "./GameStates/RunState"
import m5x7 from '../assets/fonts/m5x7.ttf?url'
import { preloadFont } from 'troika-three-text'

await new Promise<void>((resolve) => preloadFont(
	{ font: m5x7, }, () => resolve()
))
Engine.addState(GameStates.run, new RunState())
Engine.addState(GameStates.levelUp, new LevelUpState())
Engine.addState(GameStates.pause, new PauseState())
Engine.addState(GameStates.map, new MapState())
Engine.setState((import.meta.env.VITE_DEBUG_ENCOUNTER as string) === 'true' ? GameStates.run : GameStates.map)
Engine.start()

