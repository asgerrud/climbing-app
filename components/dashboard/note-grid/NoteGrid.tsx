import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Note as NoteType } from '@prisma/client'
import Note from '../note/Note'
import { sortByDate } from '../../../utils/sort'

type NoteGridProps = {
  notes: NoteType[]
}

const NoteGrid: React.FC<NoteGridProps> = ({ notes }) => {
  return (
    <VStack spacing={2} alignItems="start" maxH="360px" overflowY="scroll">
      { notes.map(note => <Note key={note.id} note={note} />) }
    </VStack>
  )
}

export default NoteGrid