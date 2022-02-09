import { makeExecutableSchema } from '@graphql-tools/schema'

import categoryModule from './category/index.js'

export const schema = makeExecutableSchema({
    typeDefs: [
        categoryModule.typeDefs
    ],
    resolvers: [
        categoryModule.resolvers
    ]
})