import NextAuth from 'next-auth'
import { PrismaAdapter } from '../../../lib/auth/prismaAdapter'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          email: profile.email,
          avatar_url: profile.picture,
          name: profile.name,
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
