import {Pool} from 'pg'
import {dbHost, dbPort, dbUser, dbPassword, dbName} from '../config/environment'

const pool = new Pool({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName
})

export default pool