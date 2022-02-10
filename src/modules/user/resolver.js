import model from './model.js'

export default {
	Query: {
		users: (_, { pagination, userId, search }) => model.users(pagination, userId, search)
	},

	User: {
		userId: parent => parent.user_id
	}
}