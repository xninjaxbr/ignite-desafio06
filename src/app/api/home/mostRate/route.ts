import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const response = await prisma.rating
    .findMany({
      include: {
        book: true,
        user: true,
      },
    })
    .then((data) => data.sort((a, b) => b.rate - a.rate))

  const res = response.slice(0, 4)

  return NextResponse.json(res, { status: 200 })
}
