import pg from 'pg'
import {dbHost, dbPort, dbUser, dbPassword, dbName} from '../config/environment/index.js'

let pool
let isConnected = false

const connectDB = async () => {
    if (isConnected && pool) {
        return pool
    }

    try {
        pool = new pg.Pool({
            host: dbHost,
            port: dbPort,
            user: dbUser,
            password: dbPassword,
            database: dbName,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        })

        // Test the connection
        const client = await pool.connect();
        isConnected = true;
        client.release();

        // Error handling for the pool
        pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            isConnected = false;
        });
        console.log('PostgreSQL Connected');
        return pool;

    } catch (error) {
        isConnected = false;
        console.error('Error connecting to PostgreSQL:', error);
        throw new Error('Failed to connect to database');
    }
}

const closeConnection = async () => {
    if (pool) {
      await pool.end();
      isConnected = false;
      console.log('Database connection closed');
    }
}

process.on('SIGINT', async () => {
    await closeConnection()
    process.exit(0)
})
  
process.on('SIGTERM', async () => {
    await closeConnection()
    process.exit(0)
})

export {connectDB, closeConnection, pool}