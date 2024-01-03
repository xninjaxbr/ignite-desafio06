import { Card } from './card'
import * as Portal from '@radix-ui/react-portal'
import { LoginComment } from './loginComment'
import { useEffect, useState } from 'react'
import { X } from '@phosphor-icons/react'
import { CommentForm } from './commentForm'
import { api } from '@/data/api'
import { signIn, useSession } from 'next-auth/react'

interface IsideProps {
  closed: () => void
  bookId: string
}

export interface Ibooks {
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
  ratings: {
    id: string
    rate: number
    description: string
    created_at: Date
    book_id: string
    user_id: string
    user: {
      id: string
      name: string
      username: string
      email: string
      avatar_url: string
      created_at: Date
    }
  }[]
}

export interface InewComment {
  title: string
  author: string
  profileName: string
  profileImg: string
  createdAt: Date
  image: string
  rate: number
  variant: string
  description: string
}

function rateCalculate(book: Ibooks) {
  const rate = book.ratings.reduce((acc, value) => {
    acc += value.rate
    return acc
  }, 0)

  return Math.round(rate / book.ratings.length)
}

function handleLogin() {
  signIn()
}

export function SideBarBook({ closed, bookId }: IsideProps) {
  const [portal, setPortal] = useState(false)
  const [login, setLogin] = useState(false)
  const [commentForm, setCommentForm] = useState(false)
  const [newComment, setNewComment] = useState(null as InewComment | null)
  const [book, setBook] = useState({} as Ibooks)
  const [loading, setLoading] = useState(true)

  const session = useSession()

  useEffect(() => {
    api(`/side-book/${bookId}`).then((book) =>
      book.json().then((book) => {
        setBook(book)
        setLoading(false)
      }),
    )
    if (session.status === 'authenticated') {
      setLogin(true)
    }
  }, [bookId, session.status])

  function handleNewComment(data: InewComment | null) {
    if (data) {
      setNewComment(data)
      setCommentForm(false)
    }
    setCommentForm(false)
  }

  return (
    // Side Bar
    <div className="mx-8 my-8 flex flex-col gap-10">
      {/* Closed */}
      <div className="ml-auto py-0">
        <X onClick={closed} size={24} className=" cursor-pointer" />
      </div>
      {/* Card */}
      {loading ? (
        'Loading'
      ) : (
        <>
          <div className=" rounded-lg bg-Mll_gray_700 px-8 py-6">
            <Card
              title={book.name}
              author={book.author}
              image={book.cover_url}
              rate={rateCalculate(book)}
              rateLength={book.ratings.length}
              categories={book.categories.map(
                (category) => category.category.name,
              )}
              pagesTotal={book.total_pages}
              variant="exploreDetail"
            />
          </div>
          {/* Comments */}

          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm text-Mll_gray_200">
              <p>Avaliações</p>
              <button
                onClick={() => {
                  if (login) {
                    return setCommentForm(true)
                  }
                  setPortal(true)
                }}
                className="text-Mll_purple_100"
              >
                Avaliar
              </button>
            </div>
            {/* Comment form */}
            {commentForm && (
              <CommentForm
                bookId={book.id}
                newComment={(data) => handleNewComment(data)}
              />
            )}

            {/* My last comment card */}
            {newComment && (
              <Card
                title={newComment.title}
                author={newComment.author}
                profileName={newComment.profileName}
                profileImg={newComment.profileImg}
                createdAt={newComment.createdAt}
                image={newComment.image}
                rate={newComment.rate}
                variant="newcomments"
                description={newComment.description}
              />
            )}

            {/* Comments Cards */}
            <div className="flex flex-col gap-5 py-5">
              {book.ratings.map((rate) => {
                return (
                  <Card
                    key={rate.id}
                    title={book.name}
                    author={book.author}
                    profileName={rate.user.name}
                    profileImg={rate.user.avatar_url}
                    createdAt={rate.created_at}
                    image={book.cover_url}
                    rate={rate.rate}
                    variant="comments"
                    description={rate.description}
                  />
                )
              })}
            </div>
            {portal && (
              <Portal.Root>
                <LoginComment
                  close={() => setPortal(false)}
                  login={handleLogin}
                />
              </Portal.Root>
            )}
          </div>
        </>
      )}
    </div>
  )
}
