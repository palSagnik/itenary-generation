import express, { request, response } from "express"
import graphqlServer from "./graphql/index.js"
import { expressMiddleware } from '@apollo/server/express4'
import cors from "cors"

const app = express()

await graphqlServer.start()

// starting graphql endpoint with express middleware
app.use(
    '/graphql',
    cors(),
    expressMiddleware(graphqlServer, {
        context: async ({request, response}) => ({
            request: request,
            repsonse: response,
        }),
    })
)

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK')
})

export default app