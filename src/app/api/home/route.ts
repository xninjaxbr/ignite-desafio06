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
    .then((data) =>
      data.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()),
    )

  return NextResponse.json(response, { status: 200 })
}
