import { Avatar, Box, Divider, Flex, Heading, Stat, StatLabel, StatNumber, Wrap, Text, WrapItem, Tag } from '@chakra-ui/react';
import React from 'react'

type BioProps = {
  profile: {
    name: string,
    username: string,
    avatarImg: string,
    height: number,
    armspan: number,
    apeIndex: number
    memberships: string[]
  }
}

const Bio: React.FC<BioProps> = ({ profile }) => {

  const { name, username, avatarImg, height, armspan, apeIndex, memberships } = profile

  return (
    <Box>
      <Flex direction="column" mb={6}>
        <Box mx="auto" mb={4}>
          <Avatar src={avatarImg} name={name} size='4xl'/>
        </Box>
        <Heading as="h1" size="lg">{name}</Heading>
        <Text color="gray.600" fontSize="lg">{username}</Text>
      </Flex>
      <Flex direction="row">
        <Stat>
          <StatLabel>Height</StatLabel>
          <StatNumber>{height}cm</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Weight</StatLabel>
          <StatNumber>{armspan}kg</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Ape index</StatLabel>
          <StatNumber>{apeIndex.toFixed(2)}</StatNumber>
        </Stat>
      </Flex>
      <Text my={4}>Memberships</Text>
      <Wrap>
        {memberships.map((name, key) => (
            <WrapItem key={key}>
              <Tag colorScheme="cyan">{name}</Tag>
            </WrapItem>
          )
        )}
        
      </Wrap>
      <Divider my={4}/>
      <Text fontSize="xl" mb={3}>Friends</Text>
      <Wrap pb={2}>
        <Avatar name="Peter mortensen" size='md'/>
        <Avatar name="Mogens iversen" size='md'/>
        <Avatar name="Alexander Kallesen" size='md'/>
        <Avatar name="Viktoria Klatresen" size='md'/>
        <Avatar name="Lorem ipsum" size='md'/>
      </Wrap>    
    </Box>
  )
}

export default Bio