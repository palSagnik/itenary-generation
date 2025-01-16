import { addHotel } from "../../../db/queries/accommodation.js"

const accommodationMutations = {
    addHotel: async (_, {hotel}) => {
        try {
            const resp = await addHotel(hotel)
            return resp
        } catch (error) {
            console.error('Error in adding hotel: ', error)
            throw new Error('Failed to save hotel')
        }
    }
}

export default accommodationMutations