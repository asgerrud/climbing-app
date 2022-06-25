import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../utils/prisma'


const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    session: async (session) => {
      if (!session) return
      const userData = await prisma.user.findUnique({
        where: { email: session.user.email },
      })

      return {
        user: {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          image: userData.image
        },
        expires: session.expires_at
      }
    }
  }
}

export default authHandler