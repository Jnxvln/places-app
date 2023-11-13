import PlacesAutocomplete from 'react-google-places-autocomplete'

export default function PlacesAutoComplete ({ value, setValue}: { value?: any, setValue?: Function }) {
  return (
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
  )
}