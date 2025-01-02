import { travelQueries } from "./flights/index.js"

const resolvers = {
    Query: {
        ...travelQueries
    }
}

export default resolvers