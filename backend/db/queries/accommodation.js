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
      RETURNING *;
    `;

    const values = [
      hotelData.hotelID,
      hotelData.name,
      hotelData.geoCode.latitude,
      hotelData.geoCode.longitude
    ];

    const result = await client.query(query, values);
    
    if (!result.rows[0]) {
      throw new Error('Failed to insert hotel data');
    }

    await client.query('COMMIT');
    return result.rows[0];

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saving hotel:', error);
    throw new Error('Failed to save hotel');
  } finally {
    client.release();
  }
};
