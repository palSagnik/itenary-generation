// helper fucntion to transform amadeusHotelResponse API to graphql format
const transformAmadeusHotelSearchApiResponse = (amadeusOffer) => {

    return amadeusOffer.map(search => {

      const searchList = search.offers[0]

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

// helper function to tranform amadeusflightAPIresponse to graphql format
const transformAmadeusFlightApiResponse = (amadeusOffer) => {

    return amadeusOffer.map(offer => {
        const itinerary = offer.itineraries[0]
        const segment = itinerary.segments[0]

        return {
            id: offer.id,
            airline: segment.carrierCode,
            src: segment.departure.iatacode,
            dest: segment.arrival.iatacode,
            departureTime: segment.departure.at,
            arrivalTime: segment.arrival.at,
            price: parseFloat(offer.price.total),
            currency: offer.price.currency,
            availableSeats: offer.numberOfBookableSeats
        }
    })
}

export  {transformAmadeusFlightApiResponse, transformAmadeusHotelListApiResponse}

// example response of amadeus api for flights
/*

"data": [
      {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "isUpsellOffer": false,
        "lastTicketingDate": "2025-01-02",
        "lastTicketingDateTime": "2025-01-02",
        "numberOfBookableSeats": 9,
        "itineraries": [
          {
            "duration": "PT28H20M",
            "segments": [
              {
                "departure": {
                  "iataCode": "BOS",
                  "terminal": "B",
                  "at": "2025-01-03T23:00:00"
                },
                "arrival": {
                  "iataCode": "OPO",
                  "at": "2025-01-04T10:35:00"
                },
                "carrierCode": "TP",
                "number": "228",
                "aircraft": {
                  "code": "32Q"
                },
                "operating": {
                  "carrierCode": "TP"
                },
                "duration": "PT6H35M",
                "id": "1",
                "numberOfStops": 0,
                "blacklistedInEU": false
              },
              {
                "departure": {
                  "iataCode": "OPO",
                  "at": "2025-01-05T06:00:00"
                },
                "arrival": {
                  "iataCode": "LGW",
                  "terminal": "S",
                  "at": "2025-01-05T08:20:00"
                },
                "carrierCode": "TP",
                "number": "1328",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "TP"
                },
                "duration": "PT2H20M",
                "id": "2",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          }
        ],
        "price": {
          "currency": "EUR",
          "total": "619.16",
          "base": "294.00",
          "fees": [
            {
              "amount": "0.00",
              "type": "SUPPLIER"
            },
            {
              "amount": "0.00",
              "type": "TICKETING"
            }
          ],
          "grandTotal": "619.16",
          "additionalServices": [
            {
              "amount": "125.00",
              "type": "CHECKED_BAGS"
            }
          ]
        },
        "pricingOptions": {
          "fareType": [
            "PUBLISHED"
          ],
          "includedCheckedBagsOnly": false
        },
        "validatingAirlineCodes": [
          "TP"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "EUR",
              "total": "309.58",
              "base": "147.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "ECONOMY",
                "fareBasis": "LL0DSI05",
                "brandedFare": "DISCOUNT",
                "brandedFareLabel": "DISCOUNT",
                "class": "L",
                "includedCheckedBags": {
                  "quantity": 0
                },
                "amenities": [
                  {
                    "description": "FIRST BAG UP TO 23KG AND 158CM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "SECOND BAG UP TO 23KG AND158CM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "EXTRA LEG ROOM OR FRONT SEAT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "SEAT RESERVATION",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "MEAL 1",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "2",
                "cabin": "ECONOMY",
                "fareBasis": "LL0DSI05",
                "brandedFare": "DISCOUNT",
                "brandedFareLabel": "DISCOUNT",
                "class": "L",
                "includedCheckedBags": {
                  "quantity": 0
                },
                "amenities": [
                  {
                    "description": "FIRST BAG UP TO 23KG AND 158CM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "SECOND BAG UP TO 23KG AND158CM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "EXTRA LEG ROOM OR FRONT SEAT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "SEAT RESERVATION",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "MEAL 1",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              }
            ]
          },
          {
            "travelerId": "2",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "EUR",
              "total": "309.58",
              "base": "147.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "ECONOMY",
                "fareBasis": "LL0DSI05",
                "brandedFare": "DISCOUNT",
                "brandedFareLabel": "DISCOUNT",
                "class": "L",
                "includedCheckedBags": {
                  "quantity": 0
                },
                "amenities": [
                  {
                    "description": "FIRST BAG UP TO 23KG AND 158CM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "SECOND BAG UP TO 23KG AND158CM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "EXTRA LEG ROOM OR FRONT SEAT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "SEAT RESERVATION",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "MEAL 1",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "2",
                "cabin": "ECONOMY",
                "fareBasis": "LL0DSI05",
                "brandedFare": "DISCOUNT",
                "brandedFareLabel": "DISCOUNT",
                "class": "L",
                "includedCheckedBags": {
                  "quantity": 0
                },
                "amenities": [
                  {
                    "description": "FIRST BAG UP TO 23KG AND 158CM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "SECOND BAG UP TO 23KG AND158CM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "EXTRA LEG ROOM OR FRONT SEAT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "SEAT RESERVATION",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "MEAL 1",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              }
            ]
          }
        ]
*/