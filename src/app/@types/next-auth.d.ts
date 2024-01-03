import { AdapterUser } from 'next-auth/adapters'
import NextAuth from 'next-auth'

declare module 'next-auth/adapters' {
  export interface AdapterUser {
    id: string
    name: string
    username: string
    avatar_url: string | null
    email: string
  }
}

declare module 'next-auth' {
  export interface Session {
    user: {
      id: string
      name: string
      username: string
      avatar_url: string | null
      email: string
      created_at: string
    }
  }
}
