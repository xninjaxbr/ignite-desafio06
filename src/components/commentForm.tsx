'use client'

import Image from 'next/image'
import { Rate } from './rate'
import { Check, X } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { api } from '@/data/api'
import { InewComment } from '@/components/sideBarBook'
import { useRouter } from 'next/navigation'

interface IcommentProps {
  newComment: (data: InewComment | null) => void
  bookId: string
}

export function CommentForm({ newComment, bookId }: IcommentProps) {
  const session = useSession()
  const [inputSize, setInputSize] = useState(0)
  const [input, setInput] = useState('')
  const [rate, setRate] = useState(0)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  if (session.status === 'unauthenticated') {
    router.push('/')
  }

  useEffect(() => {
    if (inputSize <= 450) {
      setInputSize(input.length)
    }
  }, [input, inputSize])

  function handleRate() {
    setLoading(true)
    const data = {
      userId: session.data?.user.id,
      bookId,
      rate,
      description: input,
    }

    api('/new-rate', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((data) => {
        data.json().then((book) => newComment(book))
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-Mll_gray_700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={
              session.data?.user.avatar_url || '/images/books/codigo-limpo.png'
            }
            width={40}
            height={40}
            alt="Avatar"
            className="h-10 w-10 rounded-full border-2 border-solid border-Mll_green_100"
          />
          <p>{session.data?.user.name}</p>
        </div>
        <div>
          <Rate
            rate={0}
            changeable={true}
            handleRate={(rate) => setRate(rate)}
          />
        </div>
      </div>
      <div className="relative h-40 border border-solid border-Mll_gray_500 bg-Mll_gray_800 px-5 py-4">
        <textarea
          placeholder="Escreva sua avaliação"
          className="h-full w-full resize-none bg-transparent text-sm  text-Mll_gray_200 outline-none placeholder:text-sm placeholder:text-Mll_gray_400"
          value={input}
          onChange={(data) => setInput(data.currentTarget.value)}
          maxLength={450}
        />
        <p className="absolute bottom-1 right-2 text-xs text-Mll_gray_400 ">
          {inputSize}/450
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => newComment(null)}
          disabled={loading}
          className="rounded bg-Mll_gray_600 p-2 hover:bg-Mll_gray_500 disabled:cursor-not-allowed disabled:bg-slate-900"
        >
          <X size={24} color="#8381D9" />
        </button>
        <button
          onClick={() => {
            handleRate()
          }}
          disabled={loading}
          className="rounded bg-Mll_gray_600 p-2 hover:bg-Mll_gray_500 disabled:cursor-not-allowed disabled:bg-slate-900"
        >
          <Check size={24} color="#8381D9" />
        </button>
      </div>
    </div>
  )
}
