import fetch from '../../utils/postgres.js'

const CATEGORIES = `
	SELECT * FROM categories
`

export const categories = fetch(CATEGORIES)

