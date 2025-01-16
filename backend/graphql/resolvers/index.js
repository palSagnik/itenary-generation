import {travelQueries} from "./flights/index.js"
import {accommodationQueries, accommodationMutations} from "./accommodation/index.js"
import {activityQueries} from "./activities/index.js"
import {weatherQueries} from "./weather/index.js"

const resolvers = {
    Query: {
        ...travelQueries,
        ...accommodationQueries,
        ...activityQueries,
        ...weatherQueries
    },
    Mutation: {
        ...accommodationMutations
    }
}

export default resolvers