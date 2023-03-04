import { HeroName } from "../Constants/Heros"

const blankSave: {
	heros: HeroName[]
	effectsVolume: number
	musicVolume: number
	zoom: number
} = {
	heros: [],
	effectsVolume: 0.1,
	musicVolume: 0.1,
	zoom: 700
}
const localSave = localStorage.getItem('save')
const getSaveData = () => {
	if (localSave) {
		const parsedSave = JSON.parse(localSave)
		if (Object.keys(parsedSave).every(key => Object.keys(blankSave).includes(key))) {
			return parsedSave
		} else {
			return { ...blankSave }
		}

	} else {
		return { ...blankSave }
	}
}
const saveData = getSaveData()

export const save = () => {
	localStorage.setItem('save', JSON.stringify(saveData))
}
save()
export default saveData