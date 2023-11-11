import { NextRequest, NextResponse } from "next/server"

const PLACES_API_ENDPOINT = `https://places.googleapis.com/v1/places:searchText`

export async function POST (req: NextRequest, res: NextResponse) {
  // Parse search query
  const formData = await req.formData()
  const query = formData.get('query')
  
  // Handle missing query
  if (!query || query.toString().length <= 0) {
    return NextResponse.json({
      status: "error",
      message: "A search query must be provided"
    }, { status: 400 })
  }

  // Perform API actions
  const resp = await fetch(PLACES_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.rating,places.userRatingCount,places.formattedAddress'
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'en'
    })
  })

  // Parse and return data to user
  const data = await resp.json()

  return NextResponse.json({
    status: "success",
    query,
    data
  }, { status: 200 })
}