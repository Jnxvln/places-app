import { TPlace } from "@/lib/AppTypes";

export default function PlacePreview ({ place }: { place: TPlace }) {
  return (
    <div className="p-2">
      <div className="text-sm text-slate-400">ID: {place.id}</div>
      <h2 className="font-bold text-2xl">{place.displayName.text}</h2>
      <div className="mb-3">
        <address className="whitespace-pre">{place.formattedAddress}</address>
      </div>

      <div>
        Location: ({place.location.latitude}, {place.location.longitude})
      </div>
      { place.rating && <div>Rating: {place.rating} {place.userRatingCount && <span>(from {place.userRatingCount} ratings)</span>}</div> }
    </div>
  )
}