import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const response = await prisma.book
    .findMany({
      include: {
        ratings: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
    .then((data) =>
      data.sort((a, b) => {
        if (b.name < a.name) {
          return -1
        }
        if (b.name > a.name) {
          return 1
        }
        return 0
      }),
    )

  return NextResponse.json(response, { status: 200 })
}
