import { prisma } from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

interface Irating {
  params: {
    id: string
  }
}

export async function GET(_: NextRequest, { params: { id } }: Irating) {
  const response = await prisma.rating
    .findMany({
      where: { user_id: id },
      include: {
        book: true,
      },
    })
    .then((data) =>
      data.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()),
    )

  if (response.length <= 0) {
    return NextResponse.json('Não há registros', { status: 404 })
  }

  return NextResponse.json(response[0], { status: 200 })
}
