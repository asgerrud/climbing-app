import NextAuth from 'next-auth'

type latLng = {
  lat: number
  lng: number
}

type ClimbingAppUser = {
  id: string
  email: string
  name: string
  image: string
  memberships: string[]
  friends: any // temporary solution
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ClimbingUser
  }
}