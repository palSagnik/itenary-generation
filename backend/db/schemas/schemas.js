import { pool } from '../index.js';

export const setupDatabase = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Create flights table
    await client.query(`
      CREATE TABLE IF NOT EXISTS flights (
        id VARCHAR(255) PRIMARY KEY,
        total_duration VARCHAR(255),
        departure_time TIMESTAMP,
        arrival_time TIMESTAMP,
        price DECIMAL(10,2),
        currency VARCHAR(10),
        available_seats INTEGER,
        stops TEXT[]
      );
    `)

    // flight segments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS flight_segments (
        id SERIAL PRIMARY KEY,
        flight_id VARCHAR(255) REFERENCES flights(id),
        from_airport VARCHAR(3),
        to_airport VARCHAR(3),
        departure_time TIMESTAMP,
        arrival_time TIMESTAMP,
        segment_order INTEGER
      );
    `)

    // Create hotels table
    await client.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        hotel_id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        latitude DECIMAL(10, 6),
        longitude DECIMAL(10, 6)
      );
    `)

    await client.query('COMMIT')
    console.log('Database schema setup completed')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error setting up database schema:', error)
    throw error
  } finally {
    client.release()
  }
};
