"use client";
import { useState } from "react";
import Header from "@/lib/components/ui/Header/Header";
import Map from "@/lib/components/Map/Map";
import MapSearch from "@/lib/components/MapSearch/MapSearch";
import { TPlace } from "@/lib/AppTypes";
import PlacePreview from "@/lib/components/PlacePreview/PlacePreview";

const MILES_TO_METERS: number = 1609.34

export default function Sandbox () {
  const [places, setPlaces] = useState([])
  const [keywords, setKeywords] = useState([])
  const [radius, setRadius] = useState<number>(MILES_TO_METERS)
  const [previewPlace, setPreviewPlace] = useState<TPlace | undefined>()

  // Render places to the map
  const onRenderPlaces = (places: any) => {
    // Clear the preview if no places passed
    if (places.length === 0) {
      setPreviewPlace(undefined)
    }

    setPlaces(places)
  }

  // Display place information (rendered below map)
  const onPreviewPlace = (place: TPlace | undefined) => {
    if (!place) return;
    setPreviewPlace(place)
  }

  // Update map radius (from slider in MapSearch.tsx)
  const onUpdateRadius = (newRadius: number) => {    
    setRadius(parseFloat(newRadius.toString()) * MILES_TO_METERS)
  }

  const onUpdateKeywords = (keywords: any | undefined) => {
    setKeywords(keywords)
    // console.log('[Sandbox.tsx onUpdateKeywords()] Keywords updated: ')
    // console.log(keywords)
  }

  return (
    <div>
      <section>
        <Header title="Sandbox" />
        <MapSearch onRenderPlaces={onRenderPlaces} onUpdateRadius={onUpdateRadius} onUpdateKeywords={onUpdateKeywords} />
        <Map places={places} onPreviewPlace={onPreviewPlace} radius={radius} />
      </section>
      <section className="border border-dashed border-slate-600 p-4">
        {previewPlace && <PlacePreview place={previewPlace} />}
      </section>
    </div>
  )
}