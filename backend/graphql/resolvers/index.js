import { travelQueries } from "./flights/index.js"
import {accommodationQueries} from "./accommodation/index.js"

const resolvers = {
    Query: {
        ...travelQueries,
        ...accommodationQueries
    }
}

export default resolvers