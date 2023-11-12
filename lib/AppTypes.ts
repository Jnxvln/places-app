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

export type TMapSearchResult = {
  label?: string,
  value?: {
    description?: string,
    matched_substrings?: [
      {
        length?: number | string | undefined,
        offset?: number | string | undefined,
      }
    ],
    place_id?: string,
    reference?: string,
    structured_formatting?: {
      main_text?: string
      main_text_matched_substrings?: [
        {
          length?: number | string | undefined,
          offset?: number | string | undefined
        }
      ],
      secondary_text?: string | undefined
    },
    terms?: [
      {
        offset?: number | string | undefined,
        value?: string | undefined
      }
    ],
    types?: [string]
  }
}

export type TSelectedMapSearchResult = {
  displayName: {
    text: string
  },
  formattedAddress: string,
  googleMapsUri: string,
  id: string,
  location: {
    latitude: number,
    longitude: number
  }
}