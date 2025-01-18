import {pool} from '../index.js'

export const addFlight = async (flightData) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

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
      RETURNING 
        id,
        total_duration as "totalDuration",
        departure_time as "departureTime",
        arrival_time as "arrivalTime",
        price,
        currency,
        available_seats as "availableSeats",
        stops;
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

    const savedFlight = {
      id: flightResult.rows[0].id,
      totalDuration: flightResult.rows[0].totalDuration,
      departureTime: flightResult.rows[0].departureTime,
      arrivalTime: flightResult.rows[0].arrivalTime,
      price: parseFloat(flightResult.rows[0].price),
      currency: flightResult.rows[0].currency,
      availableSeats: parseInt(flightResult.rows[0].availableSeats),
      stops: flightResult.rows[0].stops
    };

    // Delete existing segments for this flight (if any)
    await client.query('DELETE FROM flight_segments WHERE flight_id = $1', [flightData.id]);

    // Insert segments
    const segmentQuery = `
      INSERT INTO flight_segments (
        flight_id, from_airport, to_airport,
        departure_time, arrival_time, segment_order
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING 
        from_airport as "from",
        to_airport as "to",
        departure_time as "departureTime",
        arrival_time as "arrivalTime",
        segment_order as "segmentOrder";
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

    const segmentResults = await Promise.all(segmentPromises);
    savedFlight.segments = segmentResults.map(result => ({
      from: result.rows[0].from,
      to: result.rows[0].to,
      departureTime: result.rows[0].departureTime,
      arrivalTime: result.rows[0].arrivalTime
    }));

    await client.query('COMMIT');
    return savedFlight;

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
      f.id,
      f.total_duration as "totalDuration",
      f.departure_time as "departureTime",
      f.arrival_time as "arrivalTime",
      f.price,
      f.currency,
      f.available_seats as "availableSeats",
      f.stops,
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
    if (!result.rows[0]) return null;

    // Transform the result to match GraphQL schema
    return {
      id: result.rows[0].id,
      totalDuration: result.rows[0].totalDuration,
      departureTime: result.rows[0].departureTime,
      arrivalTime: result.rows[0].arrivalTime,
      price: parseFloat(result.rows[0].price),
      currency: result.rows[0].currency,
      availableSeats: parseInt(result.rows[0].availableSeats),
      stops: result.rows[0].stops,
      segments: result.rows[0].segments
    };
  } catch (error) {
    console.error('Error fetching flight:', error);
    throw new Error('Failed to fetch flight');
  }
};

export const getAllFlights = async () => {
  const query = `
    SELECT 
      f.id,
      f.total_duration as "totalDuration",
      f.departure_time as "departureTime",
      f.arrival_time as "arrivalTime",
      f.price,
      f.currency,
      f.available_seats as "availableSeats",
      f.stops,
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
    GROUP BY f.id;
  `;

  try {
    const result = await pool.query(query);
    
    // Transform the results to match GraphQL schema
    return result.rows.map(row => ({
      id: row.id,
      totalDuration: row.totalDuration,
      departureTime: row.departureTime,
      arrivalTime: row.arrivalTime,
      price: parseFloat(row.price),
      currency: row.currency,
      availableSeats: parseInt(row.availableSeats),
      stops: row.stops,
      segments: row.segments
    }));
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw new Error('Failed to fetch flights');
  }
};

