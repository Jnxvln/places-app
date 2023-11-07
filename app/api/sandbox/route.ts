import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET (request: NextApiRequest) {
  console.log('GET REQUEST!')
  return NextResponse.json({ status: "success", message: "GET request hello"})
}

export async function POST (request: NextApiRequest) {
  const API_URL = 'https://places.googleapis.com/v1/places:searchText'

  console.log('\n\nSANDBOX API POST REQUEST')
  console.log('API KEY: ' + process.env.GOOGLE_MAPS_API_KEY)

  const result = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'places.displayName, places.formattedAddress, places.priceLevel'
    },
    body: JSON.stringify({ textQuery: "Popeye's Chicken Texarkana" })
  })

  const data = await result.json()

  console.log('RESULT FROM GOOGLE: ')
  console.log(data)

  if (!data) return NextResponse.json({ status: 'error', error: 'No response from server' }, { status: 500 })

  return NextResponse.json({ status: "success", data })
}