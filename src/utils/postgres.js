import pg from 'pg'
import context from '../context/context.js'

const pool = new pg.Pool({
	host: 'john.db.elephantsql.com',
	user: 'bybxxclp',
	database: 'bybxxclp',
	password: 'GwZZ3RQOMm-8VBHdqHHmoLswvMYPDO1V'
})


export default async function fetch(query, ...params) {
	const client = await pool.connect()

	try {
		const { rows } = await client.query(query, params.length ? params : null)
		
		return rows
	} catch(error) {
		return error
	} finally {
		client.release()
	}
}
