'use client'

import { MagnifyingGlass, Binoculars } from '@phosphor-icons/react'
import { TagsButtons } from '@/components/tagsButtons'
import * as Collaps from '@radix-ui/react-collapsible'
import { SideBarBook } from '@/components/sideBarBook'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useEffect, useState } from 'react'
import { Card } from '@/components/card'
import { api } from '@/data/api'

export interface Ibooks {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: Date
  ratings: {
    id: string
    rate: number
  }[]
  categories: {
    category: { name: string }
  }[]
}

function rateCalculate(book: Ibooks) {
  const rate = book.ratings.reduce((acc, value) => {
    acc += value.rate
    return acc
  }, 0)

  return Math.round(rate / book.ratings.length)
}

export default function Explorar() {
  const [open, setOpen] = useState(false)
  const [books, setBooks] = useState({} as Ibooks[])
  const [loading, setLoading] = useState(true)
  const [categoyTag, setCategoryTag] = useState('TUDO')
  const [search, setSearch] = useState('')
  const [sideBarBook, setSideBarBook] = useState('')

  console.log(search)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [open])

  useEffect(() => {
    api(`/books`).then((book) =>
      book.json().then((book) => {
        setBooks(book)
        setLoading(false)
      }),
    )
  }, [])

  function getCategory(book: Ibooks) {
    const category = book.categories.map((category) => {
      return category.category.name.toLocaleUpperCase()
    })
    return category
  }

  return (
    <div className="m-4 mx-12 h-full max-w-[870px]">
      <div className="col-span-2  my-12 flex h-4 items-center justify-between gap-3 text-lg ">
        <div className="flex gap-3">
          <Binoculars size={26} color="#50B2C0" />
          <p>Explorar</p>
        </div>
        <label className="flex w-96 items-center justify-center gap-1 border border-solid border-Mll_gray_500 p-2 text-xs focus-within:border-Mll_green_200">
          <input
            className="w-full bg-transparent outline-none placeholder:text-Mll_gray_400 "
            placeholder="Buscar livro avaliado"
            value={search}
            onChange={(data) => setSearch(data.currentTarget.value)}
          />
          <button>
            <MagnifyingGlass color="#303F73" />
          </button>
        </label>
      </div>

      <TagsButtons
        category={(value) => {
          setCategoryTag(value)
        }}
      />

      <div className="flex flex-col gap-3">
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {loading ? (
            <p>Loading</p>
          ) : search ? (
            books.map((book) => {
              if (
                book.name
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                book.author
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              ) {
                return (
                  <Card
                    key={book.id}
                    onClick={() => {
                      setOpen(true)
                      setSideBarBook(book.id)
                    }}
                    title={book.name}
                    author={book.author}
                    image={book.cover_url}
                    rate={rateCalculate(book)}
                    variant="explore"
                  />
                )
              }
              return null
            })
          ) : (
            categoyTag &&
            books.map((book) => {
              const categoriBook = getCategory(book)
              if (categoriBook.includes(categoyTag) || categoyTag === 'TUDO') {
                return (
                  <Card
                    key={book.id}
                    onClick={() => {
                      setOpen(true)
                      setSideBarBook(book.id)
                    }}
                    title={book.name}
                    author={book.author}
                    image={book.cover_url}
                    rate={rateCalculate(book)}
                    variant="explore"
                  />
                )
              }

              return <></>
            })
          )}
        </div>

        <Collaps.Root open={open} onOpenChange={setOpen}>
          {open && (
            <Collaps.Trigger>
              <div className="fixed left-0 top-0 h-full w-[calc(100%-560px)] bg-black opacity-60"></div>
            </Collaps.Trigger>
          )}
          <Collaps.Content>
            <ScrollArea.Root>
              <ScrollArea.Viewport asChild>
                <div className="fixed right-0 top-0 h-full w-[560px] overflow-auto bg-Mll_gray_800 opacity-100 shadow-2xl shadow-Mll_gray_800 data-[state=closed]:animate-sideBarBookOut data-[state=open]:animate-sideBarBookIn">
                  <SideBarBook
                    closed={() => setOpen(false)}
                    bookId={sideBarBook}
                  />
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex touch-none select-none rounded-xl bg-Mll_gray_400 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-Mll_gray_500 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="bg-white" />
            </ScrollArea.Root>
          </Collaps.Content>
        </Collaps.Root>
      </div>
    </div>
  )
}
