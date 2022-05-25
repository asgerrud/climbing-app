import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { title, content, created_at } = req.body

  const session = await getSession({ req })
  const result = await prisma.note.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
      created_at: created_at
    },
  })
  res.json(result)
}