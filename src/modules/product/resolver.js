import model from './model.js'
import { GraphQLUpload } from 'graphql-upload'
import { finished } from 'stream/promises'
import fs from 'fs'
import path from 'path'


export default {
	Upload: GraphQLUpload,

	Query: {
		products: (_, { pagination, productId, search }) => model.products(pagination, productId, search)
	},

	Mutation: {
		addProduct: async (_, { categoryId, productName, price, shortDesc, longDesc, file, imagePath }) => {
			try {
				const { createReadStream, filename, mimetype, encoding } = await file
				const stream = createReadStream()
				const fileName = Date.now() + filename.replace(/\s/g, "")

				if(!['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype)) throw new Error ("Rasm faqat png yoki jpeg formatda bo'lishi kerak!")

				const newProduct = await model.addProduct(categoryId, productName, price, shortDesc, longDesc, fileName)
				if(newProduct.message) throw new Error(newProduct.message) 
				if(!newProduct[0]) throw new Error("Product qo'shilmadi!") 

				const filePath = path.join(process.cwd(), "src/database/images", fileName)
				const out = fs.createWriteStream(filePath)
				stream.pipe(out)
				await finished(out)

				return {
					status: 200,
					message: 'Product muvaffaqiyatli qo\'shildi!',
					data: newProduct[0]
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},

		changeProduct: async (_, { productId, categoryId, productName, price, shortDesc, longDesc, file, imagePath }) => {
			try {
				let fileName = ""
				if(file) {
					const { createReadStream, filename, mimetype, encoding } = await file
					const stream = createReadStream()
					fileName = Date.now() + filename.replace(/\s/g, "")
			
					if(!['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype)) throw new Error ("Rasm faqat png yoki jpeg formatda bo'lishi kerak!")

					const filePath = path.join(process.cwd(), "src/database/images", fileName)
					const out = fs.createWriteStream(filePath)
					stream.pipe(out)
					await finished(out)
				}


				const changeProduct = await model.changeProduct(productId, productName, price, shortDesc, longDesc, categoryId, fileName)
				if(changeProduct.message) throw new Error(changeProduct.message) 
				if(!changeProduct[0]) throw new Error("Product o'zgartirilmadi!") 

				return {
					status: 200,
					message: 'Product muvaffaqiyatli o\'zgartirildi!',
					data: changeProduct[0]
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},



		deleteProduct: async (_, { productId }) => {
			try {
				const deleteProduct = await model.deleteProduct(productId)
				
				if(deleteProduct.message) throw new Error(deleteProduct.message) 
				if(!deleteProduct[0]) throw new Error("Product topilmadi!") 

				return {
					status: 200,
					message: 'Product muvaffaqiyatli o\'chirildi!',
					data: deleteProduct[0]
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		}, 
	},

	Product: {
		productId: parent => parent.product_id,
		productName: parent => parent.product_name,
		shortDesc: parent => parent.short_desc,
		longDesc: parent => parent.long_desc,
		imagePath: parent => parent.image_path,
		categoryId: parent => parent.category_id
	}
}