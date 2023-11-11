export type TPlace = {
  id: number | string,
  displayName: {
    text: string,
    languageCode: string
  },
  formattedAddress: string,
  location: {
    latitude: number | string,
    longitude: number | string
  },
  rating?: number | string | undefined,
  userRatingCount?: number | string | undefined
}