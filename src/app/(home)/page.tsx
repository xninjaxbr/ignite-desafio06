import {
  CaretRight,
  ChartLineUp,
  ListMagnifyingGlass,
} from '@phosphor-icons/react/dist/ssr'
import { Card } from '../../components/card'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { api } from '@/data/api'

interface Iratings {
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
  }
  user: {
    id: string
    name: string
    username: string
    email: string
    avatar_url: string
    created_at: Date
  }
}

async function getLogin(id?: string) {
  if (!id) {
    return
  }
  const res = await api(`/home/login/${id}`)
  if (!res.ok) {
    console.log(res.status)
  }
  if (res.status === 404) {
    return null
  }

  const response = await res.json()

  return response
}
async function getRatings() {
  const res = await api(`/home`)
  if (!res.ok) {
    console.log(res.status)
  }
  const response = await res.json()

  return response
}
async function getMostRate() {
  const res = await api(`/home/mostRate`)
  if (!res.ok) {
    console.log(res.status)
  }
  const response = await res.json()

  return response
}
export default async function Home() {
  const session = await getServerSession(authOptions)

  const login: Iratings | null = await getLogin(session?.user.id)

  const ratings: Iratings[] = await getRatings()

  const mostRate: Iratings[] = await getMostRate()

  // console.log(login)

  return (
    <div className="m-4 mx-12 grid grid-cols-pages grid-rows-pages">
      <div className="col-span-2  my-12 flex h-4 items-center gap-3 text-lg">
        <ChartLineUp size={26} color="#50B2C0" />
        <p>Início</p>
      </div>

      <div className="mr-10 flex flex-col gap-3">
        {!!session && (
          <div>
            <div className="flex justify-between">
              <p className="text-xs">Sua última leitura</p>
              <button className="mr-2 flex flex-shrink-0 items-center gap-1 whitespace-nowrap pb-4 text-xs text-Mll_purple_100">
                <span className="">Ver todos</span> <CaretRight />
              </button>
            </div>
            {login ? (
              <Card
                title={login?.book?.name}
                author={login?.book?.author}
                image={login?.book?.cover_url}
                rate={login?.rate}
                variant="self"
                createdAt={login?.created_at}
                description={login?.description}
              />
            ) : (
              <div className="flex items-center gap-4 px-2 py-6 text-Mll_gray_400">
                <span className="text-Mll_purple_100">
                  <ListMagnifyingGlass size={36} />
                </span>
                Você não tem livros avaliados
              </div>
            )}
          </div>
        )}

        <p className="pb-4 text-xs ">Avaliações mais recentes</p>
        {ratings.map((rating) => (
          <Card
            key={rating.id}
            title={rating.book.name}
            author={rating.book.author}
            image={rating.book.cover_url}
            rate={rating.rate}
            variant="main"
            profileName={rating.user.name}
            profileImg={rating.user.avatar_url}
            createdAt={rating.created_at}
            description={rating.description}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-xs">Livros populares</p>
          <button className="mr-2 flex items-center justify-center gap-1 whitespace-nowrap text-xs text-Mll_purple_100">
            <span> Ver todos </span>
            <CaretRight size={16} />
          </button>
        </div>
        {mostRate.map((rate) => (
          <Card
            key={rate.id}
            title={rate.book.name}
            author={rate.book.author}
            image={rate.book.cover_url}
            rate={rate.rate}
          />
        ))}
      </div>
    </div>
  )
}
