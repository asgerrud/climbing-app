import { Box, Container, Flex, Heading, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react'

const Profile = (props) => {

  return (
    <Container>
      <Box bg="white" p={4} borderRadius={5}>
        <Heading as="h2" size="md" mb={4}>Stats</Heading>
          <TableContainer>
            <Table variant='simple'  size='sm'>
              <Thead>
                <Tr>
                  <Th>Grade</Th>
                  <Th>Completed</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>V1</Td>
                  <Td>20</Td>
                </Tr>
                <Tr>
                  <Td>V2</Td>
                  <Td>15</Td>
                </Tr>
                <Tr>
                  <Td>V3</Td>
                  <Td>4</Td>
                </Tr>
                <Tr>
                  <Td>V4</Td>
                  <Td>1</Td>
                </Tr>
                <Tr>
                  <Td>V5</Td>
                  <Td>0</Td>
                </Tr>
                <Tr>
                  <Td>V6</Td>
                  <Td>0</Td>
                </Tr>
                <Tr>
                  <Td>V7</Td>
                  <Td>0</Td>
                </Tr>
              </Tbody>
            </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}

export default Profile