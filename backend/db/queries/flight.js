import pool from './index.js'

export const saveFlight = async (flightData) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN'); // Start transaction

    // Insert into flights table
    const flightQuery = `
      INSERT INTO flights (
        id, total_duration, departure_time, arrival_time,
        price, currency, available_seats, stops
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET
        total_duration = EXCLUDED.total_duration,
        departure_time = EXCLUDED.departure_time,
        arrival_time = EXCLUDED.arrival_time,
        price = EXCLUDED.price,
        currency = EXCLUDED.currency,
        available_seats = EXCLUDED.available_seats,
        stops = EXCLUDED.stops
      RETURNING *;
    `;

    const flightValues = [
      flightData.id,
      flightData.totalDuration,
      flightData.departureTime,
      flightData.arrivalTime,
      flightData.price,
      flightData.currency,
      flightData.availableSeats,
      flightData.stops
    ];

    const flightResult = await client.query(flightQuery, flightValues);
    
    if (!flightResult.rows[0]) {
      throw new Error('Failed to insert flight data');
    }

    // Delete existing segments for this flight (if any)
    await client.query('DELETE FROM flight_segments WHERE flight_id = $1', [flightData.id]);

    // Insert segments
    const segmentQuery = `
      INSERT INTO flight_segments (
        flight_id, from_airport, to_airport,
        departure_time, arrival_time, segment_order
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const segmentPromises = flightData.segments.map((segment, index) => {
      const segmentValues = [
        flightData.id,
        segment.from,
        segment.to,
        segment.departureTime,
        segment.arrivalTime,
        index + 1
      ];
      return client.query(segmentQuery, segmentValues);
    });

    await Promise.all(segmentPromises);
    await client.query('COMMIT');

    // Fetch the complete flight data with segments
    const completeFlight = await getFlight(flightData.id);
    return completeFlight;

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saving flight:', error);
    throw new Error('Failed to save flight');
  } finally {
    client.release();
  }
};

export const getFlight = async (flightId) => {
  const query = `
    SELECT 
      f.*,
      json_agg(
        json_build_object(
          'from', fs.from_airport,
          'to', fs.to_airport,
          'departureTime', fs.departure_time,
          'arrivalTime', fs.arrival_time
        ) ORDER BY fs.segment_order
      ) as segments
    FROM flights f
    LEFT JOIN flight_segments fs ON f.id = fs.flight_id
    WHERE f.id = $1
    GROUP BY f.id;
  `;

  try {
    const result = await pool.query(query, [flightId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching flight:', error);
    throw new Error('Failed to fetch flight');
  }
};

