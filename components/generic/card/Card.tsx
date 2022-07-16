import { Box, Heading, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type CardProps = { 
  children: ReactNode
  title?: string,
  [styleProp:string]: any
}

const Card: React.FC<CardProps> = ({ children, title, ...styleProps }) => {

  const bg = useColorModeValue('white', 'whiteAlpha.50')

  return (
    <Box bgColor={bg} p={4} borderRadius={5} {...styleProps}>
      {title && <Heading as="h2" size="md" mb={4}>{title}</Heading>}
      {children}
    </Box>
  )
}

export default Card