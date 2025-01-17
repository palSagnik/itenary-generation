import {pool} from '../index.js';

export const addHotel = async (hotelData) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    const query = `
      INSERT INTO hotels (
        hotel_id, name, latitude, longitude
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (hotel_id) DO UPDATE SET
        name = EXCLUDED.name,
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude
      RETURNING 
        hotel_id as "hotelID",
        name,
        latitude,
        longitude;
    `

    const values = [
      hotelData.hotelID,
      hotelData.name,
      hotelData.geoCode.latitude,
      hotelData.geoCode.longitude
    ]

    const result = await client.query(query, values)
    
    if (!result.rows[0]) {
      throw new Error('Failed to insert hotel data')
    }

    const savedHotel = {
      hotelID: result.rows[0].hotelID,
      name: result.rows[0].name,
      geoCode: {
        latitude: result.rows[0].latitude,
        longitude: result.rows[0].longitude
      }
    }

    await client.query('COMMIT')
    return savedHotel

  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error saving hotel:', error)
    throw new Error('Failed to save hotel')
  } finally {
    client.release()
  }
}
