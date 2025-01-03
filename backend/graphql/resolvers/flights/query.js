import { maxResults } from "../../../config/environment/index.js"
import {transformAmadeusFlightApiResponse} from "../../helper.js"
import { amadeusApiKey, amadeusApiKeySecret } from "../../../config/environment/index.js"
import amadeus from "amadeus"

const amadeusClient = new amadeus({
    clientId: amadeusApiKey,
    clientSecret: amadeusApiKeySecret
})

const travelQueries = {
    searchFlights: async (_, {src, dest, date, passengers}) => {
        try {
            const resp = await amadeusClient.shopping.flightOffersSearch.get({
                originLocationCode: src, 
                destinationLocationCode: dest, 
                departureDate: date, 
                adults: passengers,
                max: maxResults
            })

            const flights = transformAmadeusFlightApiResponse(resp.data)
            return flights.sort((a, b) => a.price - b.price)
        } catch (error) {
            console.error('amadeus api error: ', error)
            throw new Error('failed to fetch flights: ', error)
        }
    }
}

export default travelQueries