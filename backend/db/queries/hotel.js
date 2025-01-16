import pool from '../index.js';

export const saveHotel = async (hotelData) => {
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

export const getHotel = async (hotelId) => {
  const query = `
    SELECT 
      hotel_id as "hotelID",
      name,
      json_build_object(
        'latitude', latitude,
        'longitude', longitude
      ) as "geoCode"
    FROM hotels
    WHERE hotel_id = $1;
  `;

  try {
    const result = await pool.query(query, [hotelId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching hotel:', error);
    throw new Error('Failed to fetch hotel');
  }
};

export const getAllHotels = async () => {
  const query = `
    SELECT 
      hotel_id as "hotelID",
      name,
      json_build_object(
        'latitude', latitude,
        'longitude', longitude
      ) as "geoCode"
    FROM hotels;
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw new Error('Failed to fetch hotels');
  }
}; 