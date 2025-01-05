//weather
// helper fucntion to transform weatherActivityResponse API to graphql format
const transformWeatherForecastApiResponse = (weatherResult) => {
  return {
    location: weatherResult.location.name,
    region: weatherResult.location.region || '',
    date: weatherResult.forecast.forecastday[0].date,
    temp: {
      maxValue: weatherResult.forecast.forecastday[0].day.maxtemp_c,
      minValue: weatherResult.forecast.forecastday[0].day.mintemp_c,
      unit: "Celsius"
    },
    humidity: weatherResult.forecast.forecastday[0].day.avghumidity,
    sunrise: weatherResult.forecast.forecastday[0].astro.sunrise || '',
    sunset: weatherResult.forecast.forecastday[0].astro.sunset || ''
  }
}


// activities
// helper fucntion to transform amadeusActivityResponse API to graphql format
const transformAmadeusActivityListApiResponse = (amadeusOffer) => {
  return amadeusOffer.map(offer => {
      
      return {
        activityID: offer.id,
        name: offer.name || "",
        desc: offer.description || "",
        geoCode: {
          latitude: parseFloat(offer.geoCode.latitude),
          longitude: parseFloat(offer.geoCode.longitude)
        },
        bookingLink: offer.bookingLink || "",
        price: offer.price.amount || "",
        currency: offer.price.currency || ""
      }
  })
}

// Helper to generate dates between start and end date
const generateDateRange = (startDate, endDate) => {
  const dates = []
  const currentDate = new Date(startDate)
  const lastDate = new Date(endDate)

  while (currentDate <= lastDate) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
}


// hotels
// helper fucntion to transform amadeusHotelResponse API to graphql format
const transformAmadeusHotelSearchApiResponse = (amadeusOffer) => {
  return amadeusOffer.map(offer => {
    const searchList = offer.offers[0]

    return {
      offerid: searchList.id,
      checkinDate: searchList.checkInDate,
      checkOutDate: searchList.checkOutDate,

      price: parseFloat(offer.price.total),
      currency: offer.price.currency,
    }
  })
}

// helper function to list hotels response to graphql format
const transformAmadeusHotelListApiResponse = (amadeusOffer) => {

  return amadeusOffer.map(offer => {

    return {
      name: offer.name,
      hotelID: offer.hotelId,
      geoCode: {
        latitude: parseFloat(offer.geoCode.latitude),
        longitude: parseFloat(offer.geoCode.longitude)
      }
    }
  })
}

// flights
// helper function to tranform amadeusflightAPIresponse to graphql format
const transformAmadeusFlightApiResponse = (amadeusOffer) => {

  return amadeusOffer.map(offer => {
    const itinerary = offer.itineraries[0]
    const segments = itinerary.segments

    const stops = segments.length > 1 ? segments.slice(0, -1).map(segment => segment.arrival.iataCode) : []

    const flightSegments = segments.map(segment => ({
      from: segment.departure.iataCode,
      to: segment.arrival.iataCode,
      departureTime: segment.departure.at,
      arrivalTime: segment.arrival.at,
      airline: segment.carrierCode
    }))

    return {
      id: offer.id,
      segments: flightSegments,
      totalDuration: itinerary.duration,
      origin: segments[0].departure.iatacode,
      dest: segments[segments.length - 1].arrival.iatacode,
      departureTime: segments[0].departure.at,
      arrivalTime: segments[segments.length - 1].arrival.at,
      stops: stops,
      price: parseFloat(offer.price.total),
      currency: offer.price.currency,
      availableSeats: offer.numberOfBookableSeats || 0
    }
  })
}

export { transformAmadeusFlightApiResponse, 
  transformAmadeusHotelListApiResponse, 
  transformAmadeusHotelSearchApiResponse,
  transformAmadeusActivityListApiResponse,
  transformWeatherForecastApiResponse, 
  generateDateRange,
}
