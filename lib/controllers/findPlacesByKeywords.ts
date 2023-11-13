
const PLACES_SEARCH_ENDPOINT = `https://places.googleapis.com/v1/places:searchText`

export const findPlacesByKeywords = async (query: string) => {
  if (!query) return new Error("Expected a search query string")

  // Perform API actions
  const response = await fetch(PLACES_SEARCH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_MAPS_CLIENT,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.rating,places.userRatingCount,places.formattedAddress'
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'en'
    })
  })
  
  // Parse and return data to user
  const data = await response.json()
  
  if (!data) return new Error("Expected response from server")

  return data

  // const response = await fetch(`${PLACEID_ENDPOINT}/${placeId}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-Goog-Api-Key': process.env.GOOGLE_MAPS_CLIENT,
  //     'X-Goog-FieldMask': 'id,location,displayName,formattedAddress,googleMapsUri'
  //   }
  // })

  // const place = await response.json()
  // if (!place) return new Error("Expected response from server")
  
  // return place
}