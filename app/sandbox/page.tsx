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
  const [radius, setRadius] = useState<number>(MILES_TO_METERS)
  const [previewPlace, setPreviewPlace] = useState<TPlace | undefined>()


  // Dynamically set places returned from search query
  const onRenderPlaces = (places: any) => {
    if (!places || places.length <= 0) return;
    setPlaces(places)
  }

  // Set the previewPlace
  const onPreviewPlace = (place: TPlace) => {
    if (!place) return;
    setPreviewPlace(place)
  }

  const onUpdateRadius = (newRadius: number) => {    
    setRadius(parseFloat(newRadius.toString()) * MILES_TO_METERS)
    console.log('[Sandbox.tsx onUpdateRadius()] New radius: ' + radius)
  }

  return (
    <div>
      <section>
        <Header title="Sandbox" />
        <MapSearch onRenderPlaces={onRenderPlaces} onUpdateRadius={onUpdateRadius} />
        <Map places={places} onPreviewPlace={onPreviewPlace} radius={radius} />
      </section>
      <section className="border border-dashed border-slate-600 p-4">
        {previewPlace && <PlacePreview place={previewPlace} />}
      </section>
    </div>
  )
}