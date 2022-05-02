import { Box, Container, Heading, Stack, Link, Button } from "@chakra-ui/react";
import NextLink from "next/link"

export default function Hero() {
  return (
    <Container maxW="3xl">
      <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading>🧗‍♂️ Climbing</Heading>
        <Box>
          <NextLink href='/home' passHref>
            <Button colorScheme='orange'>Browse gyms</Button>
          </NextLink>
        </Box>
      </Stack>
    </Container>
  )
}