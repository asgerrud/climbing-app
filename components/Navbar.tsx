import { ReactNode } from 'react'
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Portal,
  Divider,
} from '@chakra-ui/react'
import { useSession, signIn, signOut } from 'next-auth/react'

const NavLink = ({ href, children }: { href?: string, children: ReactNode }) => (
  <Link _hover={{ textDecoration: 'none' }} href={href}>
    {children}
  </Link>
)

export default function Navbar() {
  
  const { data: session } = useSession()

  const userId = session?.user?.id

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex w="100%" justifyContent='space-between'>
            <HStack spacing={8} alignItems={'center'}>
              <NavLink href="/">🧗‍♂️</NavLink>
            </HStack>
            <HStack spacing={8}>
            <NavLink href="/map">Map</NavLink>
            {session
              ? (
                  <Menu>
                    <MenuButton as={Button} colorScheme='orange'>
                      Profile
                    </MenuButton>
                    <Portal>
                      <MenuList>
                        <MenuGroup title='Profile'>
                          <MenuItem>
                            <NavLink href="/dashboard">Dashboard</NavLink>
                          </MenuItem>
                          <MenuItem>
                            <NavLink href={`/profile/${userId}`}>View Profile</NavLink>
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                        </MenuGroup>
                      </MenuList>
                    </Portal>
                  </Menu>
              )
              : <Button onClick={() => signIn()} colorScheme='orange'>Login</Button>
            }
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}