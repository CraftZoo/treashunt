import type { ReactNode } from 'react'
import { useMemo, useRef } from 'react'

import type { LatLngLiteral, Marker as MarkerType } from 'leaflet'
import L from 'leaflet'
import { Marker as LeafletMarker } from 'react-leaflet'

const MarkerIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
})

L.Marker.prototype.options.icon = MarkerIcon

interface MarkerProps {
  children?: ReactNode
  position: LatLngLiteral
  draggable?: boolean
  onChange?: (latLng: LatLngLiteral) => void
}

const Marker = ({ children, position, draggable, onChange }: MarkerProps) => {
  const markerRef = useRef<MarkerType>(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker) {
          onChange?.(marker.getLatLng())
        }
      },
    }),
    [onChange]
  )

  return (
    <LeafletMarker
      ref={markerRef}
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
    >
      {children}
    </LeafletMarker>
  )
}

export default Marker
