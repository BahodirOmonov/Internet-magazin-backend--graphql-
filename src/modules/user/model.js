import fetch from '../../utils/postgres.js'

const USERS = `
	SELECT 
		* 
	FROM users 
	WHERE
		CASE
			WHEN $3 > 0 THEN user_id = $3
			ELSE TRUE	
		END AND
		CASE
			WHEN LENGTH($4) > 0 THEN username ILIKE CONCAT('%', $4, '%')
			ELSE TRUE	
		END
	ORDER BY user_id
	offset $1 limit $2
`

// const addCATEGORY = `
// 	INSERT INTO categories(category_name) VALUES ($1)

// 	RETURNING category_id, category_name
// `

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

const users = ({ page, limit }, userId, search) => fetch(USERS, page * limit - limit, limit, userId, search)
// const addCategory = async (categoryName) => await fetch(addCATEGORY, categoryName)
// const changeCategory = async (categoryId, categoryName) => await fetch(changeCATEGORY, categoryId, categoryName)
// const deleteCategory = async (categoryId) => await fetch(deleteCATEGORY, categoryId)

export default {
	users,
	// addCategory,
	// changeCategory,
	// deleteCategory
}

