import { HeroName } from "../Constants/Heros"

const blankSave: {
	heros: HeroName[]
	volume: number
} = {
	heros: [],
	volume: 0.1,
}
const localSave = localStorage.getItem('save')
const saveData = localSave ? JSON.parse(localSave) as typeof blankSave : blankSave
export const save = () => {
	localStorage.setItem('save', JSON.stringify(saveData))
}
export default saveData