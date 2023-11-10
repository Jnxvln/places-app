import { useState } from 'react'
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import Spinner from "../Spinner/Spinner"

export default function Map () {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_CLIENT
  })

  if (!isLoaded) return <div>
    <Spinner />
  </div>

  const center = {
    lat: 0,
    lng: 0
  }

  const center2 = new google.maps.LatLng(20.68177501, -103.3514794)

  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <GoogleMap 
        zoom={5} 
        center={center2}
        mapContainerClassName="map" 
        mapContainerStyle={{ width: '80%', height: '600px', margin: 'auto' }}
      />
    </div>
  )
}