import { NextRequest, NextResponse } from "next/server"

const PLACES_SEARCH_ENDPOINT = `https://places.googleapis.com/v1/places:searchText`
const PLACES_ID_ENDPOINT = `https://places.googleapis.com/v1/places`

export async function POST (req: NextRequest, res: NextResponse) {

  if (!req.formData) {
    // USE THE PLACES_ID_ENDPOINT (Used when the place_id is known)
    console.log('[API/Sandbox] No formData present. This flow assumes a `place_id` has already been acquired.')

    const body = await req.body()
    console.log('Printing req.body: ')
    console.log(body)

  } else {
    // USE THE PLACES_SEARCH_ENDPOINT 
    // This does NOT expect a place_id. Search query is extracted from a formData submission)
    console.log('[API/Sandbox] formData is present. This flow does not assume the `place_id` and instead expects a formData object with a `query` property. ')

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
    const resp = await fetch(PLACES_SEARCH_ENDPOINT, {
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

}