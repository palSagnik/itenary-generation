import { transformWeatherForecastApiResponse, generateDateRange } from "../../helper.js"
import { weatherApiKey } from "../../../config/environment/index.js"
import axios from 'axios'

const weatherQueries = {
    predictWeather: async (_, {startDate, endDate, location}) => {

        try {
            const dateFormat = /^\d{4}-\d{2}-\d{2}$/
            if (!dateFormat.test(startDate) || !dateFormat.test(endDate)) {
                throw new Error('Dates must be in yyyy-mm-dd format')
            }

            const dates = generateDateRange(startDate, endDate)

            const weatherPromises = dates.map(async (date) => {
                try {
                    const response = await axios.get(
                        `http://api.weatherapi.com/v1/future.json`,
                        {
                            params: {
                                key: weatherApiKey,
                                q: location,
                                dt: date // date is already in yyyy-mm-dd format
                            }
                        }
                    )

                    await new Promise(resolve => setTimeout(resolve, 100))
                    return transformWeatherForecastApiResponse(response.data)
                } catch (error) {
                    console.error(`Failed to fetch weather for ${date}:`, error.response?.data || error.message)
                    return null
                }
            })
            const results = await Promise.all(weatherPromises)
            return results.filter(result => result !== null)

        } catch (error) {
            console.error('Weather prediction error:', error)
            throw new Error(`Failed to predict weather: ${error.message}`)
        }
    }
}

export default weatherQueries