import type { ReactNode } from 'react'
import { useMemo } from 'react'

import type { SystemStyleObject } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

import type { LatLngExpression } from 'leaflet'
import { latLngBounds } from 'leaflet'
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
} from 'react-leaflet'

interface MapProps {
  children?: ReactNode
  coordinates?: LatLngExpression[]
}

const Map = ({ children, coordinates }: MapProps) => {
  const bounds = useMemo(() => {
    return latLngBounds(coordinates || [])
  }, [coordinates])

  return (
    <Box
      as={MapContainer}
      minH="450px"
      height={'full'}
      attributionControl={false}
      scrollWheelZoom={false}
      borderRadius="xl"
      bounds={bounds}
      sx={leafletStyles}
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

      {children}
    </Box>
  )
}

Map.displayName = 'Map'

export default Map

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
