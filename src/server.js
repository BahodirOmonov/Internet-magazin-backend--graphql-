import { ApolloServer } from 'apollo-server-express'
import { 
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground 
} from 'apollo-server-core'
import express from 'express'
import http from 'http'
import { graphqlUploadExpress } from 'graphql-upload'
import { PORT } from '../config.js'

import { schema } from './modules/index.js' 
import context from './context/context.js' 

;(async function startApolloServer() {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        context,
        schema,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],
    })

    app.use(graphqlUploadExpress())

    await server.start()
    server.applyMiddleware({ app })

    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve))
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})()
