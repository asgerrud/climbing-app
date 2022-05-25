import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'
import prisma from '../../lib/prisma'

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

const NotePage = (props) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Authenticating ...</div>
  }

  const userHasValidSession = Boolean(session)
  const noteBelongsToUser = session?.user?.email === props.note.author?.email

  if (!userHasValidSession || !noteBelongsToUser ) {
    return (
      <div>
        <p>You are not allowed to view this page</p>
      </div>  
    )
  }
  
  return (
    <p>Lorem ipsum</p>
  )
}

export default NotePage