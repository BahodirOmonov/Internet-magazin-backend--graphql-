import pg from 'pg'

const pool = new pg.Pool({
	host: 'localhost',
	user: 'postgres',
	database: 'online_shop',
	port: 5432,
	password: '7777'
})


export default async function fetch(query, ...params) {
	const client = await pool.connect()

	const { rows } = await client.query(query, params.length ? params : null)

	return rows
}
