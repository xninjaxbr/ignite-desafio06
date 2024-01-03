import {
  MagnifyingGlass,
  User,
  ListMagnifyingGlass,
} from '@phosphor-icons/react/dist/ssr'
import { Card } from '../../../components/card'
import { PerfilCard } from '@/components/perfilcard'
import { api } from '@/data/api'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export interface Iratings {
  id: string
  rate: number
  description: string
  created_at: Date
  book_id: string
  user_id: string
  book: {
    id: string
    name: string
    author: string
    summary: string
    cover_url: string
    total_pages: number
    created_at: Date
    categories: {
      book_id: string
      categoryId: string
      category: {
        id: string
        name: string
      }
    }[]
  }
}

async function getRatings(id?: string) {
  if (!id) {
    return
  }
  const res = await api(`/ratings/${id}`)

  if (!res.ok) {
    console.log(res.status)
  }

  if (res.status === 404) {
    return null
  }

  const response = await res.json()

  return response
}

export default async function Perfil() {
  const session = await getServerSession(authOptions)

  const ratings: Iratings[] | null = await getRatings(session?.user.id)

  return (
    <div className="m-4 mx-12 grid grid-cols-pages grid-rows-pages">
      <div className="col-span-2  my-12 flex h-4 items-center gap-3 text-lg">
        <User size={26} color="#50B2C0" />
        <p>Perfil</p>
      </div>

      <div className="mr-10 flex flex-col gap-3">
        <label className="flex items-center justify-center gap-1 border border-solid border-Mll_gray_500 p-2 text-xs focus-within:border-Mll_green_200">
          <input
            className="w-full bg-transparent outline-none placeholder:text-Mll_gray_400 "
            placeholder="Buscar livro avaliado"
          />
          <button className="h-4 w-4">
            <MagnifyingGlass color="#303F73" />
          </button>
        </label>

        <div className="mt-8 flex flex-col gap-6">
          {ratings ? (
            ratings.map((rate) => (
              <Card
                key={rate.id}
                title={rate.book.name}
                author={rate.book.author}
                image={rate.book.cover_url}
                rate={rate.rate}
                variant="profile"
                createdAt={rate.created_at}
                description={rate.description}
              />
            ))
          ) : (
            <div className="flex items-center gap-4 px-2 py-6 text-Mll_gray_400">
              <span className="text-Mll_purple_100">
                <ListMagnifyingGlass size={36} />
              </span>
              Você não tem livros avaliados
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <PerfilCard
          avatarUrl={session?.user.avatar_url}
          createdAt={session?.user.created_at}
          name={session?.user.name}
          ratings={ratings}
        />
      </div>
    </div>
  )
}
