import { travelQueries } from "./flights/index.js"
import {accommodationQueries} from "./accommodation/index.js"
import {activityQueries} from "./activities/index.js"

const resolvers = {
    Query: {
        ...travelQueries,
        ...accommodationQueries,
        ...activityQueries
    }
}

export default resolvers