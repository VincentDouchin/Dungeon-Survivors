import HEROS, { HeroDefinition } from './Constants/Heros'

import { backgroundName } from './Constants/BackGrounds'
import { enemyWaveName } from './Constants/EnemyEncounters'

const DEBUG: {
	ENCOUNTER: boolean,
	DEFAULT_ENEMIES: enemyWaveName,
	DEFAULT_BACKGROUND: backgroundName
	DEFAULT_HEROS: [HeroDefinition, HeroDefinition]
} = {
	ENCOUNTER: false,
	DEFAULT_ENEMIES: 'ANIMALS',
	DEFAULT_BACKGROUND: 'FOREST',
	DEFAULT_HEROS: [HEROS[0], HEROS[1]]
}
export default DEBUG