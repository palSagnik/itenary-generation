import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT

const env = {
    development: process.env.NODE_ENV === "development",
    test: process.env.NODE_ENV === "test",
    staging: process.env.NODE_ENV === "staging",
    production: process.env.NODE_ENV === "production",
}

// API Related configs
const amadeusApiKey = process.env.AMADEUS_API_KEY
const weatherApiKey = process.env.WEATHER_API_KEY
const amadeusApiKeySecret = process.env.AMADEUS_API_KEY_SECRET

// Default values
const maxResults = process.env.DEFAULT_MAX_RESULTS
const searchRadius = process.env.DEFAULT_SEARCH_CIRCLE_RADIUS_KMS

// Database related configs 
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

export {port, env, amadeusApiKey, weatherApiKey, amadeusApiKeySecret, maxResults, searchRadius, dbHost, dbPort, dbUser, dbPassword, dbName}