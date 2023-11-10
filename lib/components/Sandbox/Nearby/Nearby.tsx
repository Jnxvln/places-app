import { useState } from "react"
export default function Nearby () {

  const [types, setTypes] = useState(["lodging"])
  const [maxCount, setMaxCount] = useState(10)
  const [radius, setRadius] = useState(500.0)
  const [origin, setOrigin] = useState({
    "latitude": 33.41484510340149,
    "longitude": -94.12117516209182
  })


  const onNearbySearch = async () => {
    console.log('Running onNearbySearch...')
    const resp = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_CLIENT,
        'X-Goog-FieldMask': 'places.displayName'
      },
      body: JSON.stringify({
        "includedTypes": ["lodging"],
        "maxResultCount": maxCount,
        "locationRestriction": {
          "circle": {
            "center": {
              "latitude": origin.latitude,
              "longitude": origin.longitude
            },
            "radius": radius
          }
        }
      })
    })

    const data = await resp.json()
    console.log('[Nearby onNearbySearch] resp data: ')
    console.log(data)

  }

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl text-center">
        Nearby Search
      </h1>
      <button className="px-6 py-3 font-bold" onClick={onNearbySearch}>Nearby Search</button>
    </div>
  )
}