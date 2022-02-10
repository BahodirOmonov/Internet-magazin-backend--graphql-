import fetch from '../../utils/postgres.js'

const PRODUCTS = `
	SELECT 
		* 
	FROM products 
	WHERE
		CASE
			WHEN $3 > 0 THEN product_id = $3
			ELSE TRUE	
		END AND
		CASE
			WHEN LENGTH($4) > 0 THEN product_name ILIKE CONCAT('%', $4, '%')
			ELSE TRUE	
		END
	ORDER BY product_id
	offset $1 limit $2
`

const addPRODUCT = `
	INSERT INTO products(category_id, product_name, price, short_desc, long_desc, image_path) 
	VALUES 
	(
		CASE
			WHEN $1 > 0 THEN $1
			ELSE NULL
		END,
		CASE
			WHEN LENGTH($2) > 0 THEN $2
			ELSE NULL
		END,
		CASE
			WHEN $3 > 0 THEN $3
			ELSE NULL
		END,
		CASE
			WHEN LENGTH($4) > 0 THEN $4
			ELSE NULL
		END,
		CASE
			WHEN LENGTH($5) > 0 THEN $5
			ELSE NULL
		END,
		CASE
			WHEN LENGTH($6) > 0 THEN $6
			ELSE NULL
		END
	)

	RETURNING product_id, product_name, price, short_desc, long_desc, image_path, category_id
`

const changePRODUCT = `
	UPDATE 
		products
	SET 
		product_name = CASE WHEN LENGTH($2) > 0 THEN $2 ELSE product_name END,
		price = CASE WHEN $3 > 0 THEN $3 ELSE price END,
		short_desc = CASE WHEN LENGTH($4) > 0 THEN $4 ELSE short_desc END,
		long_desc = CASE WHEN LENGTH($5) > 0 THEN $5 ELSE long_desc END,
		category_id = CASE WHEN $6 > 0 THEN $6 ELSE category_id END,
		image_path = CASE WHEN LENGTH($7) > 0 THEN $7 ELSE image_path END
	WHERE product_id = $1

	RETURNING product_id, product_name, price, short_desc, long_desc, image_path, category_id
`

const deletePRODUCT = `
	DELETE FROM products WHERE product_id = CASE WHEN $1 > 0 THEN $1 ELSE NULL END

	RETURNING product_id, product_name, price, short_desc, long_desc, image_path, category_id
`

const products = ({ page, limit }, productId, search) => fetch(PRODUCTS, page * limit - limit, limit, productId, search)
const addProduct = async (categoryId, productName, price, shortDesc, longDesc, imagePath) => await fetch(addPRODUCT, categoryId, productName, price, shortDesc, longDesc, imagePath)
const changeProduct = async (productId, productName, price, shortDesc, longDesc, categoryId, fileName) => await fetch(changePRODUCT, productId, productName, price, shortDesc, longDesc, categoryId, fileName)
const deleteProduct = async (productId) => await fetch(deletePRODUCT, productId)

export default {
	products,
	addProduct,
	changeProduct,
	deleteProduct
}

