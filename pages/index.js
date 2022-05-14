import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import Hero from '../components/Hero.tsx'
import Image from 'next/image'

export default function Home() {
  
  const Map = useMemo(() => dynamic(() => import('../components/Map.tsx'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>Loading...</p>,
      ssr: false 
    } // This line is important. It's what prevents server-side render
  ), [])

  return (
    <div>
      <Hero />
      <Map />
    </div>
  )
}
