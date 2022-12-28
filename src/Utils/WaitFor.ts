const waitFor = function* (nb: number) {
	for (let i = 0; i < nb; i++) {
		yield i
	}
	return nb
}
export default waitFor