import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, Circle, useJsApiLoader } from '@react-google-maps/api';
import { TPlace } from '@/lib/AppTypes';

const containerStyle = {
  width: 'auto',
  height: '500px'
};

const MILES_TO_METERS: number = 1609.34

function Map({ places, onPreviewPlace, radius }: { places?: any, onPreviewPlace?: Function, radius?: number }) {
  const [origin, setOrigin] = useState({
    lat: 33.41484510340149,
    lng: -94.12117516209182
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

  useEffect(() => {
    if (onPreviewPlace !== null && onPreviewPlace !== undefined && hoveredPlace) {
      onPreviewPlace(hoveredPlace)
    }
  }, [hoveredPlace, onPreviewPlace])

  useEffect(() => {
    if (onPreviewPlace !== null && onPreviewPlace !== undefined && places && places.length === 1) {
      onPreviewPlace(places[0])
    }
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <div>
          { places && places.length > 0 && places.map((place: TPlace, index: number) => (
            <div key={index}>
              {/* Marker */}
              <Marker
                key={`marker-${place.id}`}
                position={{
                  lat: place.location.latitude as number,
                  lng: place.location.longitude as number
                }}
                title={place.displayName.text}
                onMouseOver={() => setHoveredPlace(place)}
              />

              {radius && radius > 0 && <div>
                {/* Blue Circle */}
                <Circle 
                  key={`circleB-${place.id}`} 
                  options={{
                    fillColor: 'blue',
                    strokeColor: 'blue',
                    fillOpacity: 0.18,
                  }} 
                  center={{
                    lat: place.location.latitude as number,
                    lng: place.location.longitude as number
                  }}  
                  radius={radius ? radius : MILES_TO_METERS} 
                  onClick={(e) => {
                    alert(`You clicked BLUE at ${e.latLng?.lat()}, ${e.latLng?.lng()}`)
                  }} 
                />
              </div>}

            </div>
            )) 
          }
        </div>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)