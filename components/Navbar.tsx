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
  Text
} from '@chakra-ui/react'
import { useSession, signIn, signOut } from 'next-auth/react'

const ClickableMenuItem = ({ href, children }: { href?: string, children: ReactNode }) => (
  <Link href={href} _hover={{ textDecoration: 'none' }}>
    <MenuItem>
      {children}
    </MenuItem>
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
            <Flex alignItems={'center'}>
              <Link href="/" _hover={{ textDecoration: 'none' }}>🧗‍♂️</Link>
            </Flex>
            <HStack spacing={4}>
            <Link href="/map" _hover={{ textDecoration: 'none' }}>
              <Button variant='link'>Map</Button>
            </Link>
            {session
              ? (
                  <Menu>
                    <MenuButton as={Button}>
                      Profile
                    </MenuButton>
                    <Portal>
                      <MenuList>
                        <MenuGroup title='Profile'>
                          <ClickableMenuItem href="/dashboard">
                            Dashboard
                          </ClickableMenuItem>
                          <ClickableMenuItem href={`/profile/${userId}`}>
                            View Profile
                          </ClickableMenuItem>
                          <Divider />
                          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                        </MenuGroup>
                      </MenuList>
                    </Portal>
                  </Menu>
              )
              : <Button onClick={() => signIn()}>Login</Button>
            }
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}