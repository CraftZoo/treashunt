import { useState } from 'react'

import type { SystemStyleObject } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

import type { LatLngLiteral } from 'leaflet'
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
} from 'react-leaflet'

import DraggableMarker from '~/components/atoms/MapDraggableMaker'
import type { Puzzle } from '~/models/puzzle.server'

interface MapFieldProps {
  defaultCoordinates: Puzzle['coordinates']
  name?: HTMLInputElement['name']
}

const MapField = ({ defaultCoordinates, name }: MapFieldProps) => {
  const [position, setPosition] = useState<LatLngLiteral>({
    lat: Number(defaultCoordinates.latitude),
    lng: Number(defaultCoordinates.longitude),
  })

  return (
    <Box height={'450px'} sx={leafletStyles}>
      <input
        name={name}
        type="hidden"
        value={`${position.lat};${position.lng}`}
      />
      <MapContainer
        center={position}
        zoom={18}
        attributionControl={false}
        scrollWheelZoom={false}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Carte OpenStreetMap">
            <LayerGroup>
              <TileLayer url={OSM} />
            </LayerGroup>
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite ESRI">
            <LayerGroup>
              <TileLayer url={ESRI} />
              <TileLayer url={CARTO_VOYAGER} />
            </LayerGroup>
          </LayersControl.BaseLayer>
        </LayersControl>

        <DraggableMarker position={position} onChange={setPosition} />
      </MapContainer>
    </Box>
  )
}

MapField.displayName = 'MapField'

export default MapField

const OSM = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const ESRI =
  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const CARTO_VOYAGER =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png'

const leafletStyles: SystemStyleObject = {
  '.leaflet-container': {
    height: 'full',
    borderRadius: 'xl',
    boxShadow: 'sm',
  },
  '.leaflet-control': {
    border: 'none',
    boxShadow: 'base',
    borderRadius: 'xl',
  },
  '.leaflet-control-layers': {
    backgroundColor: 'ghostwhite',
    color: 'arsenic',

    "input[type='radio']": {
      accentColor: 'var(--chakra-colors-primary)',
    },
    '.leaflet-control-layers-toggle': {
      backgroundImage: 'url(/images/layers.png)',
    },
  },
  '.leaflet-control-zoom': {
    position: 'relative',

    '&:after': {
      content: '""',
      position: 'absolute',
      margin: 'auto',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '60%',
      height: '2px',
      backgroundColor: 'gray.100',
    },

    a: {
      backgroundColor: 'ghostwhite',
      fontFamily: 'body',
      color: 'primary',
      border: 'none',
      fontSize: 'var(--chakra-sizes-8)',
      width: '44px',
      height: '44px',
      lineHeight: '44px',

      transition:
        'var(--chakra-transition-duration-fast) var(--chakra-transition-easing-ease-out) var(--chakra-transition-property-common)',

      '&:hover:not(.leaflet-disabled)': {
        backgroundColor: 'grape.50',
      },

      '&.leaflet-disabled': {
        color: 'gray.300',
      },

      '&.leaflet-control-zoom-in': {
        borderTopRadius: 'xl',
      },
      '&.leaflet-control-zoom-out': {
        borderBottomRadius: 'xl',
      },
    },
  },
}
