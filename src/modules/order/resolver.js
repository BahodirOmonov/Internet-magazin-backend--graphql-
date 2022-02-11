import model from './model.js'

export default {
	Query: {
		orders: (_, { pagination, orderId, isPaid }, context) => {
			if(!context.userId) throw new Error('Sizda token mavjud emas! Iltimos login yoki registratsiyadan o\'ting')

			if(context.userId && context.role == "user") {
				return model.orders(pagination, orderId, isPaid, context.userId)
			}	

			return model.orders(pagination, orderId, isPaid)
		}
	},

	Mutation: {
		addOrder: async (_, { productId }, context) => {
			try {
				if(!context.userId || context.role != "user") throw new Error('Siz user emassiz. Iltimos login qiling')
				
				const addOrder = await model.addOrder(context.userId, productId)

				if(addOrder.message) throw new Error(addOrder.message) 
				if(!addOrder[0]) throw new Error("Order qo'shilmadi!") 

				return {
					status: 200,
					message: 'Order muvaffaqiyatli qo\'shildi!',
					data: addOrder[0]
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},

		// changeCategory: async (_, { categoryId, categoryName }) => {
		// 	try {
		// 		const changeCategory = await model.changeCategory(categoryId, categoryName)

		// 		if(changeCategory.message) throw new Error(changeCategory.message) 

		// 		return {
		// 			status: 200,
		// 			message: 'Category muvaffaqiyatli o\'zgartirildi!',
		// 			data: changeCategory[0]
		// 		}

		// 	} catch(error) {
		// 		return {
		// 			status: 400,
		// 			message: error.message
		// 		}
		// 	}
		// },

		// deleteCategory: async (_, { categoryId }) => {
		// 	try {
		// 		const deleteCategory = await model.deleteCategory(categoryId)
				
		// 		if(!deleteCategory[0]) throw new Error("Category topilmadi!") 

		// 		return {
		// 			status: 200,
		// 			message: 'Category muvaffaqiyatli o\'chirildi!',
		// 			data: deleteCategory[0]
		// 		}

		// 	} catch(error) {
		// 		return {
		// 			status: 400,
		// 			message: error.message
		// 		}
		// 	}
		// },
	},

	User: {
		userId: (parent) => parent.user_id,
		username: (parent) => parent.username,
		contact: (parent) => parent.contact,
		email: (parent) => parent.email,
		role: (parent) => parent.username
	},

	Product: {
		productId: parent => parent.product_id,  
		productName: parent => parent.product_name,
		price: parent => parent.price,
		shortDesc: parent => parent.short_desc,
		longDesc: parent => parent.long_desc,
		imagePath: parent => parent.image_path,
		categoryId: parent => parent.category_id
	},

	Order: {
		orderId: parent => parent.order_id,
		isPaid: parent => parent.is_paid,
		user: parent => parent.user[0],
		totalPrice: parent => parent.totalprice,
		orderCreatedAt: parent => parent.order_created_at
	},

	OrderProduct: {
		orderProductId: parent => parent.order_product_id,
		orderId: parent => parent.order_id,
		productId: parent => parent.product_id
	}
}