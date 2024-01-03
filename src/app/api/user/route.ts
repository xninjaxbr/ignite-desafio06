import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: Request, res: Response) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const sessionid = await getServerSession(req, res, authOptions)

  console.log(sessionid?.user.id)

  const session = await prisma.user.findUnique({
    where: {
      id: sessionid?.user.id,
    },
  })

  if (!session) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 })
  }

  return NextResponse.json(session)
}

// export async function GET(
//   req: Request,
//   { params }: { params: { userId: string } },
// ) {
//   const userId = z.string().uuid().parse(params.userId)
//   const session = await getServerSession(authOptions)

//   console.log(session?.user.id)
//   const userSession = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   })

//   if (!userSession) {
//     return NextResponse.json({ error: 'User not found' }, { status: 400 })
//   }

//   return NextResponse.json({ messege: session })
// }
