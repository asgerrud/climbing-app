import { useSession, signIn, signOut } from "next-auth/react"
import { Box, Container, Heading, Stack, Link, Button, HStack } from "@chakra-ui/react";
import NextLink from "next/link"

export default function Hero() {
  
  const { data: session } = useSession()

  return (
    <Container maxW="3xl">
      <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading>🧗‍♂️ Climbing</Heading>
        <HStack justifyContent="center" spacing={8}>
          <NextLink href='/home' passHref>
            <Button colorScheme='orange'>Browse gyms</Button>
          </NextLink>
            {session 
              ? (
                <>
                  Signed in as {session.user.email} <br />
                  <Button onClick={() => signOut()}>Logout</Button>
                </>
              )
              : <Button onClick={() => signIn()} colorScheme='orange'>Login</Button>
            }
        </HStack>
      </Stack>
    </Container>
  )
}