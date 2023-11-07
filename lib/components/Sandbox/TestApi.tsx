  const onTestApi = async () => {
    let request = await fetch('http://localhost:3000/api/sandbox', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': `${process.env.GOOGLE_MAPS_API_KEY}`,
        'X-Goog-FieldMask': 'places.displayName, places.formattedAddress, places.priceLevel'
      },
      body: "Popeye's Chicken Texarkana"
    })
    let result = await request.json()
    
    if (!result) return alert('No result returned')

    console.log('DATA FROM GOOGLE: ')
    console.log(result)

    if (result?.data?.error?.message) {
      console.error(result?.data?.error?.message)

      if (result?.data?.error?.code === 403) {
        return alert('Permission was denied by the API. Contact the site administrator')
      }

      alert('An error occured while trying to communicate with API')
    }
  }

export default function TestApi () {
  return (
    <>
      <div className="p-6">
        <button type="button" onClick={onTestApi} className="px-4 py-2 bg-gray-300 text-slate-600 rounded-md hover:bg-[#C4CBCF] active:bg-[#B7BDC1] transition-colors duration-200 ease-in-out">Test API</button>
      </div>
    </>
  )
}