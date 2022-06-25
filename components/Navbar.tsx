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
            {session
              ? (
                <HStack>
                  <Button onClick={() => signOut()}>Logout</Button>
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
                        </MenuGroup>
                      </MenuList>
                    </Portal>
                  </Menu>
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