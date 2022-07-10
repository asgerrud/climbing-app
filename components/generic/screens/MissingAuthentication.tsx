import { WarningIcon } from '@chakra-ui/icons';
import { Box, Center, Container, Flex } from '@chakra-ui/react';
import React from 'react'
import Card from '../card/Card';

const MissingAuthentication = () => {
  return (
    <Container minHeight="calc(55vh - 64px)" h="100%" display="flex" alignItems="center">
      <Center>
        <Card>
          <Box display="flex" justifyContent="center">
            <Flex alignItems="center" color="red.400">
              <WarningIcon mr={2}/> <p>You need to be authenticated to view this page</p>
            </Flex>
          </Box>
        </Card>
      </Center>
    </Container>
  )
}

export default MissingAuthentication