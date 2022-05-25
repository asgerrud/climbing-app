import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Note as NoteType } from '@prisma/client'
import Note from './Note'

type NoteGridProps = {
  notes: NoteType[]
}

const NoteGrid: React.FC<NoteGridProps> = ({ notes }) => {
  
  return (
    <VStack mt={4} spacing={2} alignItems="start">
      { notes.map(note => <Note key={note.id} note={note} />) }
    </VStack>
  )
}

export default NoteGrid