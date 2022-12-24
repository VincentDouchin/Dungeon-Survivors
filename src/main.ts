import Engine from "./Globals/Engine"
import Run from "./GameStates/Run"
Engine.addState('run', Run)
Engine.setState('run')
Engine.start()

