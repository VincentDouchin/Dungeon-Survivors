import type { STATS } from '../Constants/Stats'
import type DIFFICULTY from '../Constants/DIfficulty'
import type { HeroName } from '../Constants/Heros'

interface Save {
	heros: HeroName[]
	effectsVolume: number
	musicVolume: number
	zoom: number
	progress: Partial<Progress> | null

}
interface Progress {
	position: { x: number; y: number }
	heros: HeroName[]
	multiplayer: boolean
	difficulty: DIFFICULTY
	controls: string[]
	xp: number
	level: number
	stats: Array<STATS>
	timer: number

}
const blankSave = (): Save => ({
	heros: [],
	effectsVolume: 0.1,
	musicVolume: 0.1,
	zoom: 700,
	progress: null,
})

const getSaveData = () => {
	// thanks Muscarian Games!
	try{
		const localSave = localStorage.getItem('save')
		if (localSave) {
			const parsedSave = JSON.parse(localSave) as Record<string, any>
			return parsedSave as Save
		}
		else {
			return blankSave()
		}
	}catch(e){
		return blankSave()
	}
}
const saveData = getSaveData()
export const save = () => {
	localStorage.setItem('save', JSON.stringify(saveData))
}
save()
export const setProgress = (progress: Partial<Progress>) => {
	if (saveData.progress === null) {
		saveData.progress = progress
	} else {
		Object.assign(saveData.progress, progress)
	}
	save()
}
export default saveData
