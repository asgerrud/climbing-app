import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type CardProps = { children: ReactNode }

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <Box bgColor='white' my={8} p={4} borderRadius={5}>
      {children}
    </Box>
  )
}

export default Card