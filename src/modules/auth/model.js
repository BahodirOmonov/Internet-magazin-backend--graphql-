import fetch from '../../utils/postgres.js'

const LOGIN = `
	SELECT
		user_id,
		username,
		contact,
		email,
		role
	FROM users
	WHERE 
		CASE
			WHEN LENGTH($1) = 12 THEN contact = $1
			ELSE FALSE
		END AND
		CASE
			WHEN LENGTH($2) > 0 THEN password = CRYPT($2, password)
			ELSE FALSE
		END 
`

const REGISTER = `
	INSERT INTO users(username, password, contact, email) VALUES
	(
		CASE
			WHEN LENGTH($1) > 0 THEN $1
			ELSE NULL
		END, 
		CASE
			WHEN LENGTH($2) > 0 THEN CRYPT($2, gen_salt('bf'))
			ELSE NULL
		END, 
		CASE
			WHEN LENGTH($3) = 12 THEN $3
			ELSE NULL
		END, 
		CASE
			WHEN LENGTH($4) > 0 THEN $4
			ELSE NULL
		END
	)

	RETURNING user_id, username, password, contact, email, role
`

const login = (contact, password) => fetch(LOGIN, contact, password)
const register = (username, password, contact, email) => fetch(REGISTER, username, password, contact, email)

export default {
	login,
	register
}

