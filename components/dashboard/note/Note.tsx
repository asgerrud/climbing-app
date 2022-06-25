import React, { useState } from 'react'
import { Button, Flex, HStack, Link, Text } from '@chakra-ui/react'
import { CloseIcon, DeleteIcon } from '@chakra-ui/icons'
import { Note } from '@prisma/client'
import dateFormat from 'dateformat'
import Router from 'next/router'

type NoteProps = {
  note: Note
}

async function deleteNote(id: string): Promise<void> {
  await fetch(`/api/note/${id}`, {
    method: 'DELETE',
  })
  Router.push('/dashboard')
}

const Note: React.FC<NoteProps> = ({ note }) => {
  
  const [removeMode, setRemoveMode] = useState(false)

  const { id, title, created_at } = note
  
  const date = dateFormat(created_at, 'dd/mm/yyyy HH:MM')

  const handleRemove = () => { deleteNote(id) }

  return (
    <Flex key={id} w="100%" p={2} bgColor="whiteAlpha.100" justifyContent="space-between" alignItems="center" borderRadius={4}>
      <Link href={`/note/${id}`} textDecoration="none">
        <Text>{title}</Text>
      </Link>
      <HStack>
        {removeMode == false
          ? (
            <>
              <Text fontSize='xs'>{date}</Text>
              <CloseIcon w={3} h={3} ml={2} cursor="pointer" onClick={() => setRemoveMode(true)} />
            </>
          )
          : (
            <HStack spacing={2}>
              <Button size="xs" onClick={handleRemove} colorScheme="red"><DeleteIcon /></Button>
              <Button size="xs" onClick={() => setRemoveMode(false)}>Cancel</Button>
            </HStack>
          )
        }
        
      </HStack>
    </Flex>
  )
}

export default Note