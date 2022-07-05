import { Box, Container, Heading, Stack, Button, HStack } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Hero() {
  
  return (
    <Container maxW="3xl">
      <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading>🧗‍♂️ Send-it</Heading>
        <HStack justifyContent="center" spacing={4}>
          <NextLink href='/map' passHref>
            <Button colorScheme='orange'>Browse locations</Button>
          </NextLink>
        </HStack>
      </Stack>
    </Container>
  )
}