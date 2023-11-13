// https://developers.google.com/maps/documentation/places/web-service/op-overview

const PLACEID_ENDPOINT = `https://places.googleapis.com/v1/places`

export const findPlaceById = async (placeId: string) => {
  if (!placeId) return new Error("Expected a placeId")

  const response = await fetch(`${PLACEID_ENDPOINT}/${placeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_MAPS_CLIENT,
      'X-Goog-FieldMask': 'id,location,displayName,formattedAddress,googleMapsUri'
    }
  })

  const place = await response.json()
  if (!place) return new Error("Expected response from server")
  
  return place
}