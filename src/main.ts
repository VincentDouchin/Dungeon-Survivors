import Engine, { DEBUG } from "./Globals/Engine"

import GameOverState from "./GameStates/GameOverState"
import { GameStates } from "./Constants/GameStates"
import LevelUpState from "./GameStates/LevelUpState"
import MapState from "./GameStates/MapState"
import PauseState from "./GameStates/PauseState"
import PlayerSelectState from "./GameStates/PlayerSelectState"
import RunState from "./GameStates/RunState"
import WinState from "./GameStates/WinState"
import m5x7 from '../assets/fonts/m5x7.ttf?url'
import { preloadFont } from 'troika-three-text'

await new Promise<void>((resolve) => preloadFont(
	{ font: m5x7, }, () => resolve()
))
Engine.addState(GameStates.run, new RunState())
Engine.addState(GameStates.levelUp, new LevelUpState())
Engine.addState(GameStates.pause, new PauseState())
Engine.addState(GameStates.map, new MapState())
Engine.addState(GameStates.gameOver, new GameOverState())
Engine.addState(GameStates.playerSelect, new PlayerSelectState())
Engine.addState(GameStates.win, new WinState())
Engine.setState(DEBUG.DEFAULT_STATE)
Engine.start()

