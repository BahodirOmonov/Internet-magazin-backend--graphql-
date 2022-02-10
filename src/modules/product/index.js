import { gql } from 'apollo-server-express'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import resolvers from './resolver.js'
const schema = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'UTF-8')

export default {
	resolvers,
	typeDefs: gql`${schema}`  
}