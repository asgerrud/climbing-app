import { CalendarIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Input, InputGroup, InputRightElement, Stack, Textarea } from '@chakra-ui/react'
import dateFormat from 'dateformat'
import Router from 'next/router'
import React, { useState } from 'react'

type NoteEditorProps = {}

const NoteEditor: React.FC<NoteEditorProps> = () => {
  
  const [noteEditMode, setNoteEditMode] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')

  const getCurrentDateAndTime = () => {
    const currentDateAndTime = dateFormat(new Date(), 'dddd HH:MM')
    setNoteTitle(currentDateAndTime)
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title: noteTitle, content: noteContent }
      await fetch('/api/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setNoteTitle('')
      setNoteContent('')
      await Router.push('/profile')
    } catch (error) {
    
    };
  }

  if (noteEditMode == false) {
    return <Button onClick={() => setNoteEditMode(true)}>Write note ✍</Button>
  }

  return (
    <form onSubmit={submitData}>
      <Stack spacing={3}>
        <InputGroup>
          <Input autoFocus placeholder='Title' value={noteTitle} onChange={e => setNoteTitle(e.target.value)}/>
          <InputRightElement>
            <Button borderRadius={0} colorScheme='orange' onClick={getCurrentDateAndTime}>
              <CalendarIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Textarea placeholder='Type something...' value={noteContent} onChange={e => setNoteContent(e.target.value)}/>
        <ButtonGroup>
          <Button  type="submit" colorScheme='orange' variant='solid' disabled={!noteContent || !noteTitle}>
            Save
          </Button>
          <Button colorScheme='orange' variant='outline' onClick={() => setNoteEditMode(false)}>
            Cancel
          </Button>
        </ButtonGroup>
      </Stack>
    </form>
  )
}

export default NoteEditor