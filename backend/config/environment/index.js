import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT

const env = {
    development: process.env.NODE_ENV === "development",
    test: process.env.NODE_ENV === "test",
    staging: process.env.NODE_ENV === "staging",
    production: process.env.NODE_ENV === "production",
}

const amadeusApiKey = process.env.AMADEUS_API_KEY
const amadeusApiKeySecret = process.env.AMADEUS_API_KEY_SECRET

const maxResults = process.env.DEFAULT_MAX_RESULTS

const searchRadius = process.env.DEFAULT_SEARCH_CIRCLE_RADIUS_KMS
export {port, env, amadeusApiKey, amadeusApiKeySecret, maxResults, searchRadius}