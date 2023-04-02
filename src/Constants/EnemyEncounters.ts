import Encounter from '../Game/Encounter'
import WeightedList from '../Utils/WeightedList'
import Enemies from './Enemies'
import type { EnemyType } from './Enemies'

const {
	goblin, orc, orcShaman, orcMasked, orcBig, orcBigPatch,
	bunny, mushroomSmall, mushroomMedium, mushroomBig, direwolf, bear, fox,
	leprechaun, woodElfMale, woodElfFemale, elfKnight, elfKing, elfQueen, elfRanger,
	villagerFemale, villagerMale, butcher, blacksmith, executioner,
	angel, clericFat, clericNormal, clericSkinny, bishop, templar, inquisitor, archAngel,
	zombieSmall, muddy, swampy, zombie, iceZombie, ogre, skeleton,
	imp, wogol, chort, demonBig, necromancer,
	cultist, cultistHooded, vampireMale, vampireFemale, vampireLord, bat,
} = Enemies
export type enemyWaveName = 'ORCS' | 'ANIMALS' | 'PRIESTS' | 'ELVES' | 'DEMONS' | 'VILLAGERS' | 'UNDEAD' | 'VAMPIRES'
const berserk = (enemyType: EnemyType): EnemyType => ({ ...enemyType, berserk: true })

const ENENMYENCOUNTERS: Record<enemyWaveName, () => Encounter> = {
	ORCS: () => new Encounter()
		.addWave(new WeightedList<EnemyType>().add(goblin), 30, 0.1, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(goblin, 2).add(orc, 1), 30, 0.15, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(goblin, 2).add(orc, 2).add(orcShaman), 30, 0.2, 4)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(goblin).add(orc).add(orcShaman, 2).add(orcMasked), 30, 0.25, 3)
		.waitForEnemiesCleared()
		.addEnemy(orcBig)
		.addEnemy(orcBigPatch)
		.addWave(new WeightedList<EnemyType>().add(goblin).add(orc).add(orcShaman, 2).add(orcMasked, 2), 30, 0.3, 1)
		.waitForEnemiesCleared()
		.stop(),
	ANIMALS: () => new Encounter()
		.addWave(new WeightedList<EnemyType>().add(bunny).add(mushroomSmall), 30, 0.1, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(bunny, 2).add(fox, 1), 30, 0.15, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(bunny, 4).add(fox, 3).add(bear), 30, 0.2, 4)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(bunny, 3).add(fox, 2).add(direwolf, 2).add(bear), 30, 0.25, 3)
		.waitForEnemiesCleared()
		.addEnemy(mushroomBig)
		.addWave(new WeightedList<EnemyType>().add(mushroomMedium, 2).add(mushroomSmall), 30, 0.3, 1)
		.waitForEnemiesCleared()
		.stop(),
	ELVES: () => new Encounter()
		.addWave(new WeightedList<EnemyType>().add(leprechaun), 30, 0.1, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(leprechaun, 2).add(woodElfFemale).add(woodElfMale), 30, 0.15, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(woodElfMale, 2).add(woodElfFemale, 2).add(elfRanger), 30, 0.2, 4)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(woodElfFemale).add(woodElfMale).add(elfKnight, 2).add(elfRanger, 2), 30, 0.25, 3)
		.waitForEnemiesCleared()
		.addGroup(elfKing, elfKnight, 8, 50)
		.addGroup(elfQueen, elfKnight, 8, 50)
		.addWave(new WeightedList<EnemyType>().add(elfRanger).add(elfKnight, 2), 20, 0.3, 1)
		.waitForEnemiesCleared()
		.stop(),
	VILLAGERS: () => new Encounter()
		.addWave(new WeightedList<EnemyType>().add(villagerFemale).add(villagerMale), 30, 0.1, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(villagerFemale, 2).add(villagerMale, 2).add(butcher), 30, 0.15, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(villagerFemale, 3).add(villagerMale, 3).add(butcher, 2).add(blacksmith), 30, 0.2, 4)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(villagerFemale).add(villagerMale).add(butcher, 2).add(blacksmith, 2), 30, 0.25, 3)
		.waitForEnemiesCleared()
		.addEnemy(executioner)
		.addWave(new WeightedList<EnemyType>().add(villagerFemale).add(villagerMale).add(butcher, 2).add(blacksmith, 2), 30, 0.3, 1)
		.waitForEnemiesCleared()
		.stop(),
	PRIESTS: () => new Encounter()
		.addWave(new WeightedList<EnemyType>().add(clericNormal).add(clericFat).add(clericSkinny), 30, 0.1, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(clericNormal).add(clericFat).add(clericSkinny).add(templar), 30, 0.15, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(clericNormal).add(clericFat).add(clericSkinny).add(templar, 2).add(inquisitor), 30, 0.2, 4)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(clericNormal).add(clericFat).add(clericSkinny).add(templar, 2).add(inquisitor, 2), 30, 0.25, 3)
		.waitForEnemiesCleared()
		.addGroup(bishop, templar, 5, 50)
		.addGroup(bishop, templar, 5, 50)
		.addWave(new WeightedList<EnemyType>().add(templar).add(inquisitor), 20, 0.25, 3)
		.waitForEnemiesCleared()
		.addGroup(archAngel, angel, 12, 50)
		.waitForEnemiesCleared()
		.stop(),
	UNDEAD: () => new Encounter()
		.addWave(new WeightedList<EnemyType>().add(zombieSmall), 30, 0.1, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(zombieSmall, 2).add(skeleton, 1), 30, 0.15, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(zombieSmall, 2).add(skeleton, 1).add(swampy).add(muddy).add(iceZombie, 2), 30, 0.2, 4)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(zombieSmall).add(skeleton).add(swampy).add(muddy).add(iceZombie, 2), 30, 0.25, 3)
		.waitForEnemiesCleared()
		.addEnemy(ogre)
		.addWave(new WeightedList<EnemyType>().add(zombieSmall).add(skeleton).add(swampy).add(muddy).add(iceZombie, 2), 30, 0.3, 1)
		.waitForEnemiesCleared()
		.stop(),
	DEMONS: () => new Encounter()
		.addWave(new WeightedList<EnemyType>().add(imp), 30, 0.1, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(imp, 2).add(wogol), 30, 0.15, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(imp, 2).add(wogol).add(chort), 30, 0.2, 4)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(imp).add(wogol).add(chort, 2).add(necromancer), 30, 0.25, 3)
		.waitForEnemiesCleared()
		.addGroup(demonBig, chort, 12, 100)
		.addWave(new WeightedList<EnemyType>().add(imp).add(wogol).add(chort, 2).add(necromancer, 2), 30, 0.3, 1)
		.waitForEnemiesCleared()
		.stop(),
	VAMPIRES: () => new Encounter()
		.addWave(new WeightedList<EnemyType>().add(bat).add(cultist), 30, 0.1, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(bat).add(cultist).add(cultistHooded), 30, 0.15, 5)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(bat).add(cultist).add(cultistHooded).add(vampireMale), 30, 0.2, 4)
		.waitForEnemiesCleared()
		.addWave(new WeightedList<EnemyType>().add(bat).add(cultist).add(cultistHooded).add(vampireMale, 2).add(vampireFemale), 30, 0.25, 3)
		.waitForEnemiesCleared()
		.addEnemy(vampireLord)
		.addWave(new WeightedList<EnemyType>().add(bat).add(cultist).add(cultistHooded).add(vampireMale, 2).add(vampireFemale, 2), 30, 0.3, 1)
		.waitForEnemiesCleared()
		.stop(),
}
export default ENENMYENCOUNTERS
