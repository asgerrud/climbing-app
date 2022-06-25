import { FC } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type MapProps = {
  locations: any,
  darkMode: boolean
}

const Icon = (filename) => L.icon({
  iconUrl: `../assets/images/${filename}`,
  iconRetinaUrl: `../assets/images/${filename}`,
  iconSize: [25, 25]
})

const Map: FC<MapProps> = ({ locations, darkMode }) => {

  const tileLayerLight = `https://api.mapbox.com/styles/v1/asger-rud/cl3621cy8000314mpq30pbmh2/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  const tileLayerDark = `https://api.mapbox.com/styles/v1/asger-rud/cl35zxnpz000y14lay3sj3htb/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

  return (
    <>
      <MapContainer center={[55.662622, 12.568025]} zoom={12} style={{ height: '85vh', width: '100%', zIndex: 1 }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={darkMode ? tileLayerDark : tileLayerLight}
          zIndex={1}
        />
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