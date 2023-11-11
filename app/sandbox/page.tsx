"use client";
import { useState } from "react";
import Header from "@/lib/components/ui/Header/Header";
import Map from "@/lib/components/Map/Map";
import MapSearch from "@/lib/components/MapSearch/MapSearch";
import { TPlace } from "@/lib/AppTypes";
import PlacePreview from "@/lib/components/PlacePreview/PlacePreview";

export default function Sandbox () {

  const [places, setPlaces] = useState([])
  const [previewPlace, setPreviewPlace] = useState<TPlace | undefined>()

  const onRenderPlaces = (places: any) => {
    if (!places || places.length <= 0) return;
    setPlaces(places)
  }

  const onPreviewPlace = (place: TPlace) => {
    if (!place) return;

    console.log('[Sandbox] Preview place: ')
    console.log(place)
    setPreviewPlace(place)
  }

  return (
    <div>
      <section>
        <Header title="Sandbox" />
        <MapSearch onRenderPlaces={onRenderPlaces} />
        <Map places={places} onPreviewPlace={onPreviewPlace} />
      </section>
      <section className="border border-dashed border-slate-600 p-4">
        {previewPlace && <PlacePreview place={previewPlace} />}
      </section>
    </div>
  )
}