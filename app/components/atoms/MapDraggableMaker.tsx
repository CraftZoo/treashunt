import { useMemo, useRef } from 'react'

import type { LatLngLiteral, Marker as MarkerType } from 'leaflet'
import L from 'leaflet'
import { Marker } from 'react-leaflet'

const MarkerIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
})

L.Marker.prototype.options.icon = MarkerIcon

interface DraggableMarkerProps {
  position: LatLngLiteral
  onChange: (latLng: LatLngLiteral) => void
}

const DraggableMarker = ({ position, onChange }: DraggableMarkerProps) => {
  const markerRef = useRef<MarkerType>(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker) {
          onChange(marker.getLatLng())
        }
      },
    }),
    [onChange]
  )

  return (
    <Marker
      ref={markerRef}
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
    />
  )
}

export default DraggableMarker
