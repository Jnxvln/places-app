import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const libraries: Array<"drawing" | "places" | "geometry"> = ['places']

export default function GoogleMapsLoader () {

  const googleMapsApiKey = process.env.GOOGLE_MAPS_CLIENT ? process.env.GOOGLE_MAPS_CLIENT : ''

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries
  })

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    clickableIcons: true,
    scrollwheel: false,
  }

  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition)
    } else {
      return alert('Geolocation is not supported by this browser')
    }
  }

  const getPosition = (position: GeolocationPosition) => {
    var lat = position.coords.latitude
    var lng = position.coords.longitude
    return new google.maps.LatLng(lat, lng)
  }

  const getCurrentLocation = () => {
    if (!navigator || !navigator.geolocation) {
      return { lat: 0, lng: 0 }
    }

    var lat, lng
    navigator.geolocation.getCurrentPosition(position => {

    })
  }

  if (!isLoaded) {
    return <p className="text-slate-600">Loading Google Maps...</p>
  }

  return (
    <div className="p-4 border-2 border-dashed border-slate-600">
      { isLoaded && <GoogleMap
        options={mapOptions}
        center={center}
        zoom={14}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '800px', height: '800px' }}
        onLoad={() => console.log('Map Component Loaded...')}
      />}
      
    </div>
  )
}