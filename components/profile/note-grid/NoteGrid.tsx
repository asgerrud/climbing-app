import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Note as NoteType } from '@prisma/client'
import Note from '../note/Note'

type NoteGridProps = {
  notes: NoteType[]
}

const NoteGrid: React.FC<NoteGridProps> = ({ notes }) => {
  
  const sortByDate = (a: Date,b: Date) => new Date(b).getTime() - new Date(a).getTime()

  return (
    <VStack mt={4} spacing={2} alignItems="start">
      { notes.sort((a, b) => sortByDate(a.created_at, b.created_at)).map(note => <Note key={note.id} note={note} />) }
    </VStack>
  )
}

export default NoteGrid