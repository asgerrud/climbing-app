import { Container, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

type LoadingProps = {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <Container h="calc(100vh - 64px)">
      <Flex h="100%" justifyContent="center" alignItems="center">
        <Spinner size="xl"/>
      </Flex>
    </Container>
  )
}

export default Loading