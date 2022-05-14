import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'


let boulderIcon = L.icon({
  iconUrl: '../assets/images/boulder.png',
  iconRetinaUrl: '../assets/images/boulder.png',
  iconSize: [25, 25]
});

const Map = () => {

  const tileLayerLight = `https://api.mapbox.com/styles/v1/asger-rud/cl3621cy8000314mpq30pbmh2/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
  const tileLayerDark = `https://api.mapbox.com/styles/v1/asger-rud/cl35zxnpz000y14lay3sj3htb/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

  return (
    <>
      <MapContainer center={[55.662622, 12.568025]} zoom={13} style={{height: 400, width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={tileLayerLight}
        />
        <Marker icon={boulderIcon} position={[55.641149, 12.539375]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  )
}

export default Map;