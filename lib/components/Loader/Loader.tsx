import Spinner from "../Spinner/Spinner"

export default function Loader () {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2">
      <div className="font-bold text-xl mt-8 mb-4">Loading...</div>
      <Spinner />
    </div>
  )
}