import { ApolloServer } from "@apollo/server"
import { env } from "../config/environment"

const apolloServer = new ApolloServer({
    
    // Schema Pending
    playground: env.development
})
export default apolloServer