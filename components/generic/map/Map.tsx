import { FC, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet'
import { LatLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MarkerIcon from './MarkerIcon'
import { Badge, Heading, Text, Wrap } from '@chakra-ui/react'

type MapProps = {
  height?: string
  locations: any
  darkMode: boolean
  onPlaceMarker?: (latLng: LatLng) => void
}

const Map: FC<MapProps> = ({ height = 'calc(100vh - 64px)', locations, darkMode, onPlaceMarker }) => {

  const tileLayerLight = `https://api.mapbox.com/styles/v1/asger-rud/cl3621cy8000314mpq30pbmh2/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  const tileLayerDark = `https://api.mapbox.com/styles/v1/asger-rud/cl35zxnpz000y14lay3sj3htb/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

  const [userMarker, setUserMarker] = useState({ lat:0 , lng: 0 })
  const markerIcon = MarkerIcon('marker.svg', { iconSize: [32, 32], iconAnchor: [16, 31], popupAnchor:  [0, -32] })
  
  const MapComponent = () => {
    useMapEvent('click', (e) => {
      setUserMarker(e.latlng)
      onPlaceMarker(e.latlng)
    })
    return null
  }

  return (
    <>
      <MapContainer center={[55.662622, 12.568025]} zoom={12} style={{ height: height, width: '100%', zIndex: 1 }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={darkMode ? tileLayerDark : tileLayerLight}
          zIndex={1}
        />
        {onPlaceMarker && (
          <>
            <MapComponent />
            <Marker position={userMarker} icon={markerIcon} />
          </>
        )}
        {locations.map(location => {
          const { id, name, lat, lon, type, facilities } = location
          console.log(location)
          const icon = MarkerIcon()
          return (
            <Marker key={id} icon={icon} position={[lat, lon]}>
              <Popup>
                <Heading as="h4" size="md">{name}</Heading>
                <Text><b>Type</b>: <span>{type[0].name}</span></Text>
                <Wrap mt={2} spacing={1}>
                  {facilities.map(facility => (
                    <Badge key={facility.name} fontSize='1em' textTransform="none" px={1} py={0.5} variant='solid' colorScheme='orange'>
                      <span>{facility.name}</span>
                    </Badge>
                  ))}
                </Wrap>
              </Popup>
            </Marker> 
          )
        })}
      </MapContainer>
    </>
  )
}

export default Map