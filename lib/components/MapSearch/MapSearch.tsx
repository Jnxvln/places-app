import { useState, useEffect, useRef, ChangeEvent } from "react"
import { TMapSearchResult, TSelectedMapSearchResult } from "@/lib/AppTypes";
import { findPlaceById } from "@/lib/controllers/findPlaceById";
import PlacesAutoComplete from "../PlacesAutoComplete/PlacesAutoComplete";
import { findPlacesByKeywords } from "@/lib/controllers/findPlacesByKeywords";

export default function MapSearch ({ onRenderPlaces, onUpdateRadius, onUpdateKeywords }: { onRenderPlaces?: Function, onUpdateRadius?: Function, onUpdateKeywords?: Function }) {
  const inputKeywordsRef = useRef(null) // used to access focus()

  const [value, setValue] = useState<string | undefined | null>(null)
  const [keywords, setKeywords] = useState("")
  const [radius, setRadius] = useState<string | number>(5)

  // 11/11/23: Hides a warning hindering the API (temporary until fixed upstream) ------
  // Solution: https://github.com/recharts/recharts/issues/3615
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  // -------------------------------------------------------------------------

  const onClearAddress = () => {
    setValue(null)
    
    if (onRenderPlaces)
      onRenderPlaces([])
  }

  const onClearKeywords = () => {
    setKeywords("")

    // Clear keywords
    if (onUpdateKeywords !== undefined) {
      onUpdateKeywords(undefined)
    }

    // Set focus back on input
    if (inputKeywordsRef && inputKeywordsRef.current) {
      (inputKeywordsRef.current as HTMLInputElement).focus()
    }
  }

  const findPlace = async (placeId: string) => {
    const place: TSelectedMapSearchResult = await findPlaceById(placeId)

    if (!onRenderPlaces) return new Error("Expected an onRenderPlaces callback function")
    
    onRenderPlaces([place])
  }

  const findPlaces = async (query: string) => {
    console.log('[MapSearch findPlaces()] Searching for places...')
    const places = await findPlacesByKeywords(query)

    console.log('[MapSearch findPlaces()] Places found: ')
    console.log(places)
  }

  const onChangeRadius = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.value || !onUpdateRadius || onUpdateRadius === null) return;
    setRadius(e.target.value)
    onUpdateRadius(e.target.value)
  }

  function debounceKeywordSearch (func: any, timeout = 3000) {
    console.log('[MapSearch debounceKeywordSearch()] Running debounce keyword search...')
    let timer: NodeJS.Timeout;

    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout)
    }
  }

  // Run findPlace() whenever query suggestion is selected
  useEffect(() => {
    if (value) {
      const result: TMapSearchResult = value
      const placeId = result.value?.place_id
      findPlace(placeId)
    }
  }, [value])

  useEffect(() => {
    if (keywords && onUpdateKeywords !== undefined) {
      onUpdateKeywords(keywords)
      // debounceKeywordSearch(findPlaces(keywords))
      debounceKeywordSearch(() => findPlaces(keywords))
    }
  }, [keywords, onUpdateKeywords])

  return (
    <section className="bg-slate-800 p-4">
      <div className="flex flex-wrap gap-2 w-full">
        
        {/* PlacesAutoComplete component */}
        <div className="w-full flex flex-col">
          <label className="text-white">Address: </label>
          <div className="flex flex-wrap">
            <div className="grow">
              <PlacesAutoComplete value={value} setValue={setValue} />
            </div>
            <div className="ml-3">
              <button type="button" onClick={onClearAddress} className="px-4 py-2 rounded-md text-center text-white bg-gray-600 hover:bg-red-800 transition-colors duration-150 ease-in-out">Clear</button>
            </div>
          </div>
        </div>

        {/* Keywords Search component */}
        <div className="flex flex-col w-full">
          <label htmlFor="keywords" className="text-white mr-2">Keywords: </label>
          <div className="flex gap-3"> 
            <div className="grow">
              <input type="text" name="keywords" id="keywords" ref={inputKeywordsRef} value={keywords} onChange={(e) => setKeywords(e.target.value)} className="p-2 rounded-md w-full" />
            </div>
            <button id="btnClearKeywords" type="button" onClick={onClearKeywords} className="px-4 py-2 rounded-md text-center text-white bg-gray-600 hover:bg-red-800 transition-colors duration-150 ease-in-out">Clear</button>
          </div>
        </div>

        {/* Radius control */}
        <div>
          <label htmlFor="inputRadius" className="text-white">Radius: {radius && radius > 0 && <span>{radius} mi</span>} </label>
          <input disabled={!value} id="inputRadius" type="range" name="radius" value={radius} onChange={onChangeRadius} step={1} min={1} max={100} />
        </div>
      </div>
    </section>
  )
}