import L from 'leaflet'

const MarkerIcon = (filename = 'bouldering-gym.png', options = null) => { 
  return L.icon({
    iconUrl: `../assets/images/${filename}`,
    iconRetinaUrl: `../assets/images/${filename}`,
    iconSize: options?.iconSize || [25,25],
    ...options
  })
}

export default MarkerIcon