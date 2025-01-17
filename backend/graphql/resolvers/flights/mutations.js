import { addFlight } from "../../../db/queries/flight.js"

const flightMutations = {
    addFlight: async (_, {flight}) => {
        try {
            const resp = await addFlight(flight)
            return resp
        } catch (error) {
            console.error('Error in adding flight: ', error)
            throw new Error('Failed to save flight')
        }
    }
}

export default flightMutations