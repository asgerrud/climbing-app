import { FC } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

type MapProps = {
  darkMode: boolean
}

const icon = (filename) => L.icon({
  iconUrl: `../assets/images/${filename}`,
  iconRetinaUrl: `../assets/images/${filename}`,
  iconSize: [25, 25]
})

const boulderIcon = icon("boulder.png");
const indoorBoulderIcon = icon("bouldering-gym.png");
const indoorRopeIcon = icon("indoor-rope.png");

const Map: FC<MapProps> = ({ darkMode }) => {

  const tileLayerLight = `https://api.mapbox.com/styles/v1/asger-rud/cl3621cy8000314mpq30pbmh2/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
  const tileLayerDark = `https://api.mapbox.com/styles/v1/asger-rud/cl35zxnpz000y14lay3sj3htb/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

  return (
    <>
      <MapContainer center={[55.662622, 12.568025]} zoom={12} style={{height: "85vh", width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={darkMode ? tileLayerDark : tileLayerLight}
        />
        {/* <Marker icon={L.divIcon({ className: "custom icon", html: ReactDOMServer.renderToString( <MyComponent/> ) })} position={[55.641149, 12.539375]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <Marker icon={indoorRopeIcon} position={[55.69283658847049, 12.610710054044832]} />
        <Marker icon={boulderIcon} position={[55.621510106227085, 12.544120861630542]} />
      </MapContainer>
    </>
  )
}

export default Map;