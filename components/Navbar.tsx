import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useSession, signIn, signOut } from "next-auth/react"

const Links = ['Dashboard', 'Projects'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Navbar() {
  
  const { data: session } = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg='gray.100' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex w="100%" justifyContent='space-between'>
            <HStack spacing={8} alignItems={'center'}>
              <Box>🧗‍♂️</Box>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            {session
              ? <Button onClick={() => signOut()}>Logout</Button>
              : <Button onClick={() => signIn()} colorScheme='orange'>Login</Button>
            }
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}