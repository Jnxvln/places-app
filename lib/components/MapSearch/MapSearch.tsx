import { useState, useEffect } from "react"
import PlacesAutocomplete from 'react-google-places-autocomplete'
import { TMapSearchResult, TSelectedMapSearchResult } from "@/lib/AppTypes";

const PLACEID_ENDPOINT = `https://places.googleapis.com/v1/places`

export default function MapSearch ({ onRenderPlaces }: { onRenderPlaces?: Function }) {
  const [value, setValue] = useState(null)

  // Hides a warning hindering the API (temporary until fixed upstream) ------
  // Solution: https://github.com/recharts/recharts/issues/3615
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  // -------------------------------------------------------------------------

  const onClear = () => {
    setValue(null)
  }

  const findPlaceById = async (placeId: string) => {
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

  const findPlace = async (placeId: string) => {
    const place: TSelectedMapSearchResult = await findPlaceById(placeId)

    if (!onRenderPlaces) return new Error("Expected an onRenderPlaces callback function")
    
    onRenderPlaces([place])
  }

  // Run findPlace() whenever query suggestion is selected
  useEffect(() => {
    if (value) {
      console.log('[MapSearch useEffect] Value: ')
      const result: TMapSearchResult = value
      console.log(result)

      const placeId = result.value?.place_id
      findPlace(placeId)
    }
  }, [value])

  return (
    <section className="bg-slate-800">
      <div className="flex flex-wrap items-center justify-start w-full">
        
        <div className="w-full max-w-4xl p-6">
          <PlacesAutocomplete 
            apiKey={process.env.GOOGLE_MAPS_CLIENT} 
            selectProps={{ 
              value, 
              onChange: setValue, 
              instanceId: `maps-${value}`
            }} 
            onLoadFailed={(err) => (
              console.error("Could not inject Google Script", err)
            )} 
          />
        </div>

        <div className="flex lg:mb-0 md:mx-2 max-w-4xl mb-6">
          <button onClick={onClear} className="px-4 py-2 rounded-md text-center text-white bg-gray-600 hover:bg-red-800 transition-colors duration-150 ease-in-out">Clear</button>
        </div>
      </div>
    </section>
  )
}