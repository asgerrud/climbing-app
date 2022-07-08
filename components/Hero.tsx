import { Box, Container, Heading, Stack, Button, HStack, background, Center } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Hero() {

  const heroImage = "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1103&q=80"
  
  return (
    <Box backgroundImage={heroImage} backgroundSize="cover">
      <Box bgGradient='linear(to-b, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.53))'>
        <Container maxW="3xl" py="8" minH="calc(100vh - 64px)" display="flex" justifyContent="center" alignItems="center">
            <Stack as={Box} background="#00000050" px={10} py={8} borderRadius="sm" backdropFilter="blur(3px) saturate(70%);">
              <Heading mb={3} fontSize="3xl">Find the best climbing locations</Heading>
              <HStack justifyContent="center" spacing={4}>
                <NextLink href='/map' passHref>
                  <Button colorScheme='orange'>🧗‍♀️ Browse</Button>
                </NextLink>
              </HStack>
            </Stack>
        </Container>
      </Box>
    </Box>
  )
}