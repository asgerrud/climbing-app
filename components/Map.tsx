import { FC, useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from '@chakra-ui/react'
import { latLng } from '../types/next-auth'

type MapProps = {
  locations: any,
  darkMode: boolean,
  onAddLocation: (latLng) => void
}

const Icon = (filename, options = null) => { 

  const size = options?.iconSize || [25,25]
  
  const config = {
    iconUrl: `../assets/images/${filename}`,
    iconRetinaUrl: `../assets/images/${filename}`,
    iconSize: size,
    ...options
  }
  
  return L.icon(config)
}

const Map: FC<MapProps> = ({ locations, darkMode, onAddLocation }) => {

  const tileLayerLight = `https://api.mapbox.com/styles/v1/asger-rud/cl3621cy8000314mpq30pbmh2/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  const tileLayerDark = `https://api.mapbox.com/styles/v1/asger-rud/cl35zxnpz000y14lay3sj3htb/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

  const [userMarker, setUserMarker] = useState({lat:0 , lng: 0})
  const markerIcon = Icon("marker.svg", { iconSize: [32, 32], iconAnchor: [16, 31], popupAnchor:  [0, -32]})
  
  const MapComponent = () => {
    useMapEvent('click', (e) => {
      setUserMarker(e.latlng)
    })
    return null
  }

  return (
    <>
      <MapContainer center={[55.662622, 12.568025]} zoom={12} style={{ height: 'calc(100vh - 64px)', width: '100%', zIndex: 1 }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={darkMode ? tileLayerDark : tileLayerLight}
          zIndex={1}
        />
        <MapComponent />
          <Marker 
            position={userMarker} 
            icon={markerIcon} 
            eventHandlers={{
              click: (e) => onAddLocation(userMarker),
            }}
          >
          </Marker>
        {locations.map((location, index) => {
          const { id, name, lat, lon, categories } = location
          const icon = Icon(categories[0].iconUrl)
          return (
            <Marker key={id} icon={icon} position={[lat, lon]}>
              <Popup>
                <h4>{name}</h4>
              </Popup>
            </Marker> 
          )
        })}
      </MapContainer>
    </>
  )
}

export default Map