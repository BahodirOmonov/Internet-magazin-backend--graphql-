import { categories } from './model.js'

export default {
	Query: {
		categories: () => categories
	},

	Category: {
		categoryId: parent => parent.category_id,
		categoryName: parent => parent.category_name
	}
}