import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Hero from '../components/Hero.tsx'
import { Button, Center } from '@chakra-ui/react'

export default function Home() {
  
  const [darkMode, setDarkMode] = useState(false)

  const Map = useMemo(() => dynamic(() => import('../components/Map.tsx'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>Loading...</p>,
      ssr: false 
    } // This line is important. It's what prevents server-side render
  ), [darkMode])

  return (
    <div>
      <Map darkMode={darkMode} variant='ghost' />
      <Center p={4} mx="auto">
        <Button onClick={() => setDarkMode(!darkMode)}>
          <span>{darkMode ? '😏' : '😭'}</span>
        </Button>
      </Center>
      <Hero />
    </div>
  )
}
