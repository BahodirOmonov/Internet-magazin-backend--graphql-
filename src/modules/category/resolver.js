import model from './model.js'

export default {
	Query: {
		categories: (_, { pagination, categoryId, search }) => model.categories(pagination, categoryId, search)
	},

	Mutation: {
		addCategory: async (_, { categoryName }) => {
			try {
				const newCategory = await model.addCategory(categoryName)

				if(newCategory.message) throw new Error(newCategory.message) 

				return {
					status: 200,
					message: 'Category muvaffaqiyatli qo\'shildi!',
					data: newCategory[0]
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},

		changeCategory: async (_, { categoryId, categoryName }) => {
			try {
				const changeCategory = await model.changeCategory(categoryId, categoryName)

				if(changeCategory.message) throw new Error(changeCategory.message) 

				return {
					status: 200,
					message: 'Category muvaffaqiyatli o\'zgartirildi!',
					data: changeCategory[0]
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},

		deleteCategory: async (_, { categoryId }) => {
			try {
				const deleteCategory = await model.deleteCategory(categoryId)
				
				if(!deleteCategory[0]) throw new Error("Category topilmadi!") 

				return {
					status: 200,
					message: 'Category muvaffaqiyatli o\'chirildi!',
					data: deleteCategory[0]
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},
	},

	Category: {
		categoryId: parent => parent.category_id,
		categoryName: parent => parent.category_name
	}
}