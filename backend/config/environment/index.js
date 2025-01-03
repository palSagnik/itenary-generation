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

const maxResults = process.env.MAX_RESULTS

export {port, env, amadeusApiKey, amadeusApiKeySecret, maxResults}