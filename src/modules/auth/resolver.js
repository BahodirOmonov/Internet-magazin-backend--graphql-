import model from './model.js'
import jwt from 'jsonwebtoken'

export default {
	Query: {
		login: async (_, { contact, password }) => {
			try {
				const [logUser] = await model.login(contact, password)
				
				if(!logUser) throw new Error("Contact yoki password xato!")

				return {
					status: 201,
					message: "User muvaffaqiyatli topildi!",
					token: jwt.sign({ userId: logUser.user_id, role: logUser.role }, 'SECRET_KEY', {expiresIn: 86400}),
					data: logUser
				}
			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		}		
	},

	Mutation: {
		register: async (_, { username, password, contact, email }) => {
			try {
				const newUser = await model.register(username, password, contact, email)
				
				if(newUser.message) throw new Error(newUser.message)

				return {
					status: 201,
					message: "User muvaffaqiyatli qo'shildi!",
					token: jwt.sign({ userId: newUser.userId }, 'SECRET_KEY'),
					data: newUser[0]
				}
			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},
	},

	User: {
		userId: parent => parent.user_id
	}
}