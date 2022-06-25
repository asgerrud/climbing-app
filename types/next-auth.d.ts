import NextAuth from 'next-auth'

type ClimbingAppUser = {
  id: string
  email: string
  name: string
  image: string
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ClimbingUser
  }
}