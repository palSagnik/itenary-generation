import { ApolloServer } from "@apollo/server"
import { env } from "../config/environment/index.js"

const apolloServer = new ApolloServer({
    
    // Schema Pending
    playground: env.development
})
export default apolloServer