import { prisma } from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  const reqSchema = z.object({
    bookId: z.string().uuid(),
    userId: z.string().uuid(),
    rate: z.number().max(5),
    description: z.string(),
  })

  type req = z.infer<typeof reqSchema>

  const req: req = await request.json()

  console.log(req)

  reqSchema.parse(req)

  const ratingId = await prisma.rating
    .create({
      data: {
        book_id: req.bookId,
        user_id: req.userId,
        rate: req.rate,
        description: req.description,
      },
    })
    .then((data) => data.id)

  const rating = await prisma.rating.findUnique({
    where: { id: ratingId },
    include: { book: true, user: true },
  })

  const res = {
    title: rating?.book.name,
    author: rating?.book.author,
    profileName: rating?.user.name,
    profileImg: rating?.user.avatar_url,
    createdAt: rating?.created_at,
    image: rating?.book.cover_url,
    rate: rating?.rate,
    description: rating?.description,
  }
  return NextResponse.json(res, { status: 200 })
}
