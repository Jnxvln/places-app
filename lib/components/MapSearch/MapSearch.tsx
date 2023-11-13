import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import PlacesAutocomplete from 'react-google-places-autocomplete'
import { TMapSearchResult, TSelectedMapSearchResult } from "@/lib/AppTypes";
import { findPlaceById } from "@/lib/controllers/findPlaceById";

const MILES_TO_METERS: number = 1609.34

export default function MapSearch ({ onRenderPlaces, onUpdateRadius }: { onRenderPlaces?: Function, onUpdateRadius?: Function }) {
  const [value, setValue] = useState(null)
  const [radius, setRadius] = useState<string | number>(5)

  // 11/11/23: Hides a warning hindering the API (temporary until fixed upstream) ------
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

  const findPlace = async (placeId: string) => {
    const place: TSelectedMapSearchResult = await findPlaceById(placeId)

    if (!onRenderPlaces) return new Error("Expected an onRenderPlaces callback function")
    
    onRenderPlaces([place])
  }

  const onChangeRadius = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.value || !onUpdateRadius || onUpdateRadius === null) return;
    setRadius(e.target.value)
    onUpdateRadius(e.target.value)
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

        <div className="flex flex-col ml-2">
          <label htmlFor="inputRadius" className="text-white">Radius: {radius && radius > 0 && <span>{radius} mi</span>} </label>
          <input disabled={!value} id="inputRadius" type="range" name="radius" value={radius} onChange={onChangeRadius} step={1} min={1} max={100} />
        </div>
      </div>
    </section>
  )
}