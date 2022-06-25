import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Container, Divider, Flex, Input, Link, Text, Textarea } from '@chakra-ui/react'
import { Note } from '@prisma/client'
import dateFormat from 'dateformat'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React, { useState } from 'react'
import Card from '../../components/generic/card/Card'
import Loading from '../../components/generic/loading/Loading'
import prisma from '../../utils/prisma'

type NotePageProps = {
  note: Note & {
    author: {
      email: string
    }
  }
}

const NotePage: React.FC<NotePageProps> = (props) => {
  const { data: session, status } = useSession()

  const { id, created_at, updated_at } = props.note
  const createdAtDate = dateFormat(created_at, 'dd/mm/yyyy HH:MM')
  const updatedAtDate = dateFormat(updated_at, 'dd/mm/yyyy HH:MM')

  const [ title, setTitle ] = useState(props.note.title)
  const [ content, setContent ] = useState(props.note.content)

  const userHasValidSession = Boolean(session)
  const noteBelongsToUser = session?.user?.email === props.note.author?.email

  const hasChanges = (title != props.note.title) || (content != props.note.content)

  const handleRemove = () => {
    if (confirm('Remove note?')) {
      deleteNote(id)
    }
  }

  const handleSave = () => {
    const updatedDate = new Date()
    console.log(id, title, content, updatedDate)
    updateNote(id, title, content, updatedDate)
  }

  if (status === 'loading') {
    return <Loading />
  }

  if (!userHasValidSession || !noteBelongsToUser ) {
    return (
      <div>
        <p>You are not allowed to view this page</p>
      </div>  
    )
  }

  return (
    <Container>
      <Card>
        <Link href="/dashboard" display="inline-flex" alignItems="center" color="gray.400" _hover={{ textDecoration: 'none' }}>
          <ArrowBackIcon mr={1}/>
          Back
        </Link>
        <Input 
          value={title} 
          fontSize='3xl' 
          fontWeight="bold" 
          pl={0} 
          border="none" 
          onChange={(e) => setTitle(e.target.value)}
        />
        <Flex justifyContent="space-between" pb={4}>
          <Text fontSize='md'>{createdAtDate}</Text>
          {createdAtDate != updatedAtDate &&
            <Text fontSize='xs'>
              Updated {updatedAtDate}
            </Text>
          }
        </Flex>
        <Divider/>
        <Box py={4}>
          <Textarea value={content} pl={0} border="none" onChange={(e) => setContent(e.target.value)}/>
        </Box>
        <Flex justifyContent="flex-end">
          <ButtonGroup>
            {hasChanges && (
              <Button size="sm" colorScheme="orange" onClick={handleSave}>Save</Button>
            )}
            <Button size="sm" variant="outline" onClick={handleRemove}>Remove</Button>
          </ButtonGroup>
        </Flex>
      </Card>
    </Container>
  )
}

async function deleteNote(id: string): Promise<void> {
  await fetch(`/api/note/${id}`, {
    method: 'DELETE',
  })
  Router.push('/dashboard')
}

async function updateNote(id: string, title: string, content: string, updatedAt: Date ): Promise<void> {
  const updatedDate = updatedAt.toJSON()
  await fetch(`/api/note/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ 
      title, 
      content, 
      updatedAt: updatedDate 
    })
  })
  .then(() => {
    Router.reload()
  })
  .catch(error => {
    console.log('error:', error)
  })
  
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const note = await prisma.note.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      }
    }
  })
  return {
    props: { note: JSON.parse(JSON.stringify(note)) },
  }
}

export default NotePage