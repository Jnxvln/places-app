import { FormEvent, useState, useEffect } from "react"

const formControlStyle = `flex items-center border border-dashed border-slate-600 p-2 w-full`
const submitButtonStyle = `text-white rounded-md border-none px-4 py-2 font-bold text-center bg-amber-700 hover:bg-amber-800 active:bg-amber-700 transition-colors duration-100 ease-in-out`

export default function MapSearch ({ onRenderPlaces }: { onRenderPlaces?: Function }) {

  const [query, setQuery] = useState("")
  const [places, setPlaces] = useState([])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Submitting search query
    const resp = await fetch('http://localhost:3000/api/sandbox', {
      method: 'POST',
      body: formData
    })

    // Set places data from search results
    const result = await resp.json()
    setPlaces(result.data.places)
  }

  useEffect(() => {
    if (onRenderPlaces !== null && onRenderPlaces !== undefined && places && places.length > 0) {
      onRenderPlaces(places)
    }
  }, [places, onRenderPlaces])

  return (
    <section className="bg-slate-800">
      <form onSubmit={onSubmit} method="post" className="flex p-2">
        <div className={formControlStyle}>
          <label htmlFor="query" className="mr-2 font-bold text-white">Search: </label>
          <input id="query" type="text" name="query" onChange={(e) => setQuery(e.target.value)} className="p-2 w-full border border-solid border-slate-400 rounded-md" />
        </div>

        <div className={formControlStyle}>
          <button type="submit" className={submitButtonStyle}>Search</button>
        </div>
      </form>
    </section>
  )
}