import { ApolloServer } from "@apollo/server"
import { env } from "../config/environment/index.js"
import schema from "./schema.js"

const apolloServer = new ApolloServer({
    schema,
    playground: env.development
})
export default apolloServer