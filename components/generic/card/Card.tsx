import { Box, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type CardProps = { children: ReactNode }

const Card: React.FC<CardProps> = ({ children }) => {

  const bg = useColorModeValue('white', 'whiteAlpha.50')

  return (
    <Box bgColor={bg} p={4} borderRadius={5}>
      {children}
    </Box>
  )
}

export default Card