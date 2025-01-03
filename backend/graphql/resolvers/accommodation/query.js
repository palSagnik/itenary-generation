import { amadeusApiKey, amadeusApiKeySecret } from "../../../config/environment/index.js"
import amadeus from "amadeus"
import { transformAmadeusHotelListApiResponse } from "../../helper.js"

const amadeusClient = new amadeus({
    clientId: amadeusApiKey,
    clientSecret: amadeusApiKeySecret
})

const accommodationQueries = {
    listHotels: async (_, {location}) => {
        location = location.toUpperCase()
        try {
            const resp = await amadeusClient.referenceData.locations.hotels.byCity.get({
                cityCode: location
            })

            return transformAmadeusHotelListApiResponse(resp.data)
        } catch (error) {
            console.error('amadeus api error: ', error)
            throw new Error('failed to fetch hotels: ', error)
        }
    }
}

export default accommodationQueries