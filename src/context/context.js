import queryParser from '../helpers/queryParser.js'
import jwt from 'jsonwebtoken'

export default function context({req, res}) {
	try {
		const { operation, fieldName, variables} = queryParser(req.body)

	    if(fieldName == '__schema') return 
	    
	    const token = req.headers.token

	    if(token) {
	    	return jwt.verify(token, 'SECRET_KEY')
	    }

	} catch(error) {
		return error
	}
}