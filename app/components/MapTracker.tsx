'use client'

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

type Props = {
  lat: number
  lng: number
}

export default function MapTracker({ lat, lng }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!
  })

  if (!isLoaded) return <p>Газрын зураг ачааллаж байна...</p>

  return (
    <GoogleMap
      center={{ lat, lng }}
      zoom={14}
      mapContainerStyle={{ width: '100%', height: '400px' }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  )
}
