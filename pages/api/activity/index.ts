import { getSession } from 'next-auth/react'
import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const { location, date } = req.body
  const session = await getSession({ req })
  const result = await prisma.activity.create({
    data: {
      User: { 
        connect: { 
          email: session?.user?.email 
        } 
      },
      Location: {
        connect: {
          id: location
        }
      },
      date: new Date(date)
    },
  })
  res.json(result)
}