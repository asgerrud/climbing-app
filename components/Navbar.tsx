import { ReactNode } from 'react'
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Button,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useSession, signIn, signOut } from 'next-auth/react'

const NavLink = ({ href, children }: { href?: string, children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    fontWeight="semibold"
    _hover={{
      textDecoration: 'none',
    }}
    href={href}>
    {children}
  </Link>
)

export default function Navbar() {
  
  const { data: session } = useSession()

  return (
    <>
      <Box bg='gray.100' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex w="100%" justifyContent='space-between'>
            <HStack spacing={8} alignItems={'center'}>
              <NavLink href="/">🧗‍♂️</NavLink>
            </HStack>
            {session
              ? (
                <HStack>
                  <NavLink href="/profile">Profile</NavLink>
                  <Button onClick={() => signOut()}>Logout</Button>
                </HStack>
              )
              : <Button onClick={() => signIn()} colorScheme='orange'>Login</Button>
            }
          </Flex>
        </Flex>
      </Box>
    </>
  )
}