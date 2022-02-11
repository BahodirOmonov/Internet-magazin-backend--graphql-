import fetch from '../../utils/postgres.js'

const ORDERS = `
	SELECT 
		o.order_id,
		JSON_AGG(u) AS user,
		JSON_AGG(p) AS products,
		SUM(p.price) AS totalPrice,
		o.is_paid,
		o.order_created_at 
	FROM orders AS o 
	LEFT JOIN users AS u ON o.user_id = u.user_id 
	LEFT JOIN order_products AS op ON o.order_id = op.order_id
	LEFT JOIN products AS p ON op.product_id = p.product_id
	WHERE
		CASE
			WHEN $3 > 0 THEN o.order_id = $3
			ELSE TRUE	
		END AND
		CASE
			WHEN $4 IN (TRUE, FALSE) THEN o.is_paid = $4
			ELSE TRUE	
		END AND
		CASE
			WHEN $5 > 0 THEN u.user_id = $5
			ELSE TRUE	
		END
	GROUP BY o.order_id
	ORDER BY o.order_id
	offset $1 limit $2
`

const addORDER = `
	INSERT INTO orders(user_id) VALUES ($1)

	RETURNING order_id
`

const addORDERPRODUCT = `
	INSERT INTO order_products(order_id, product_id) VALUES ($1, $2)

	RETURNING order_product_id, order_id, product_id
`



// const changeCATEGORY = `
// 	UPDATE 
// 		categories AS c
// 	SET 
// 		category_name = CASE WHEN LENGTH($2) > 0 THEN $2 ELSE c.category_name END
// 	WHERE category_id = $1

// 	RETURNING category_id, category_name
// `

// const deleteCATEGORY = `
// 	DELETE FROM categories WHERE category_id = CASE WHEN $1 > 0 THEN $1 ELSE NULL END

// 	RETURNING category_id, category_name
// `

const orders = ({ page, limit }, orderId, isPaid, userId) => fetch(ORDERS, page * limit - limit, limit, orderId, isPaid, userId)
const addOrder = async (userId, productId) => {
	try {
		const checkOrder = await fetch("SELECT is_paid, order_id FROM orders WHERE user_id = $1 ORDER BY order_id", userId)
		if(!checkOrder.length || checkOrder[checkOrder.length - 1].is_paid) {
			const newOrder = await fetch(addORDER, userId)
			return await fetch(addORDERPRODUCT, newOrder[0].order_id, productId)
		} 
		else {
			return await fetch(addORDERPRODUCT,checkOrder[checkOrder.length - 1].order_id, productId)
		}

		return []
	} catch(error) {
		return error
	}
}
// const changeCategory = async (categoryId, categoryName) => await fetch(changeCATEGORY, categoryId, categoryName)
// const deleteCategory = async (categoryId) => await fetch(deleteCATEGORY, categoryId)

export default {
	orders,
	addOrder
}

