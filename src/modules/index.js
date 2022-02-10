import { makeExecutableSchema } from '@graphql-tools/schema'

import categoryModule from './category/index.js'
import userModule from './user/index.js'
import authModule from './auth/index.js'
import productModule from './product/index.js'

export const schema = makeExecutableSchema({
    typeDefs: [
        categoryModule.typeDefs,
        userModule.typeDefs,
        authModule.typeDefs,
        productModule.typeDefs
    ],
    resolvers: [
        categoryModule.resolvers,
        userModule.resolvers,
        authModule.resolvers,
        productModule.resolvers
    ]
})