import { transformAmadeusActivityListApiResponse } from "../../helper.js"
import { amadeusApiKey, amadeusApiKeySecret } from "../../../config/environment/index.js"
import amadeus from "amadeus"

const amadeusClient = new amadeus({
    clientId: amadeusApiKey,
    clientSecret: amadeusApiKeySecret
})

const activityQueries = {
    listActivities: async (_, {latitude, longitude}) => {
        try {
            const resp = await amadeusClient.shopping.activities.get({
                latitude: latitude,
                longitude: longitude
            })
            return transformAmadeusActivityListApiResponse(resp.data)
        } catch (error) {
            console.error('amadeus api error: ', error)
            throw new Error('failed to fetch activities: ', error)
        }
    }
}

export default activityQueries