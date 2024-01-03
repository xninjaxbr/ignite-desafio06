import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface Irating {
  params: {
    id: string
  }
}

export async function GET(_: NextRequest, { params: { id } }: Irating) {
  const response = await prisma.book.findMany({
    where: { id },
    include: {
      categories: { include: { category: true } },
      ratings: { include: { user: true } },
    },
  })

  if (response.length <= 0) {
    return NextResponse.json('Não há registros' + id, { status: 404 })
  }
  return NextResponse.json(response[0], { status: 200 })
}
