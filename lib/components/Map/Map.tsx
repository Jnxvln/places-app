import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, Circle, useJsApiLoader } from '@react-google-maps/api';
import { TPlace } from '@/lib/AppTypes';

const containerStyle = {
  width: 'auto',
  height: '700px'
};

function Map({ places, onPreviewPlace }: { places?: any, onPreviewPlace?: Function }) {
  const [origin, setOrigin] = useState({
    lat: 33.41484510340149,
    lng: -94.12117516209182
  })
  
  const [testLocation, setTestLocation] = useState({
    lat: 33.41484540248437,
    lng: -94.1211762177368
  })
  const [tenMilesToMeters] = useState(16093.4)
  const [map, setMap] = React.useState(null)
  const [hoveredPlace, setHoveredPlace] = useState<TPlace | undefined>(undefined)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_CLIENT
  })

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const updateMarker = (e) => {
    setTestLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })
  }

  useEffect(() => {
    if (places && places.length > 0) {
      console.log('[Map useEffect] Places received: ')
      console.log(places)
    }
  }, [places])

  useEffect(() => {
    if (onPreviewPlace !== null && onPreviewPlace !== undefined && hoveredPlace) {
      onPreviewPlace(hoveredPlace)
    }
  }, [hoveredPlace, onPreviewPlace])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={testLocation}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
          {/* <Marker position={origin} />
          <Marker position={testLocation} draggable onDragEnd={(e) => updateMarker(e)} /> */}

          { places && places.length > 0 && places.map((place: TPlace) => (
            <>
              <Marker
                key={`marker-${place.id}`}
                position={{
                  lat: place.location.latitude,
                  lng: place.location.longitude
                }}
                title={place.displayName.text}
                onMouseOver={() => setHoveredPlace(place)}
              />

              <Circle 
                key={`circleA-${place.id}`} 
                options={{
                  fillColor: 'red',
                  strokeColor: 'red',
                  fillOpacity: 0.18
                }} 
                center={{
                  lat: place.location.latitude as number,
                  lng: place.location.longitude as number
                }} 
                radius={tenMilesToMeters*2} 
                onClick={(e) => {
                  alert(`You clicked RED at ${e.latLng?.lat()}, ${e.latLng?.lng()}`)
                }} 
              />

              <Circle 
                key={`circleB-${place.id}`} 
                options={{
                  fillColor: 'blue',
                  strokeColor: 'blue',
                  fillOpacity: 0.18
                }} 
                center={{
                  lat: place.location.latitude as number,
                  lng: place.location.longitude as number
                }}  
                radius={tenMilesToMeters} 
                onClick={(e) => {
                  alert(`You clicked BLUE at ${e.latLng?.lat()}, ${e.latLng?.lng()}`)
                }} 
              />
            </>
            )) 
          }
        </>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)