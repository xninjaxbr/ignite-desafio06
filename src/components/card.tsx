'use client'

import Image from 'next/image'
import { tv, VariantProps } from 'tailwind-variants'
import { Rate } from './rate'
import { useState } from 'react'
import { BookmarkSimple, BookOpen } from '@phosphor-icons/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const card = tv({
  base: ['flex gap-4 py-4 px-5 text-sm bg-Mll_gray_700 rounded-xl'],
})

const desc = tv({
  base: ['mt-4 text-sm text-Mll_gray_300'],
  variants: {
    vermais: {
      true: '',
      false: 'line-clamp-3',
    },
  },
})

interface Icard extends VariantProps<typeof card> {
  title: string
  author: string
  image: string
  rate: number
  variant?:
    | 'trends'
    | 'main'
    | 'self'
    | 'profile'
    | 'explore'
    | 'exploreDetail'
    | 'comments'
    | 'newcomments'
  profileImg?: string
  profileName?: string
  createdAt?: Date
  description?: string
  className?: string
  onClick?: () => void
  rateLength?: number
  categories?: string[]
  pagesTotal?: number
}

export function Card({
  title,
  image,
  rate,
  author,
  variant = 'trends',
  profileImg = '',
  profileName,
  createdAt,
  description = '',
  className,
  onClick,
  rateLength,
  categories,
  pagesTotal,
}: Icard) {
  const [verMais, setVerMais] = useState<boolean>(false)

  return (
    <>
      {(() => {
        switch (variant) {
          case 'trends':
            return (
              <div className={card({ className })}>
                <Image src={image} width={48} height={94} alt="" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="font-bold">{title}</h2>
                    <p className="text-xs text-Mll_gray_400">{author}</p>
                  </div>
                  <div className="relative bottom-0">
                    {<Rate rate={rate} />}
                  </div>
                </div>
              </div>
            )
          case 'comments':
            return (
              <div
                className={card({
                  className: 'flex flex-grow flex-col gap-5',
                })}
              >
                <div className="flex  items-center justify-between px-0 py-2 text-sm ">
                  <div className="flex gap-4">
                    <Image
                      src={profileImg}
                      width={40}
                      height={40}
                      alt="avatar"
                      className="h-10 w-10 rounded-full border border-Mll_green_100 object-cover"
                    />
                    <div>
                      <p>{profileName}</p>
                      <span className="text-Mll_gray_400">
                        {formatDistanceToNow(createdAt!, { locale: ptBR })}
                      </span>
                    </div>
                  </div>

                  <div className="relative right-0">{<Rate rate={rate} />}</div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-Mll_gray_300 ">{description}</p>
                  </div>
                </div>
              </div>
            )
          case 'newcomments':
            return (
              <div className="flex flex-grow flex-col gap-5 rounded-xl bg-Mll_gray_600 px-5 py-4 text-sm">
                <div className="flex  items-center justify-between px-0 py-2 text-sm ">
                  <div className="flex gap-4">
                    <Image
                      src={profileImg}
                      width={40}
                      height={40}
                      alt="avatar"
                      className="rounded-full border border-Mll_green_100 object-cover"
                    />
                    <div>
                      <p>{profileName}</p>
                      <span className="text-Mll_gray_400">
                        {formatDistanceToNow(createdAt!, { locale: ptBR })}
                      </span>
                    </div>
                  </div>

                  <div className="relative right-0">{<Rate rate={rate} />}</div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-Mll_gray_300 ">{description}</p>
                  </div>
                </div>
              </div>
            )
          case 'explore':
            return (
              <div
                className={card({
                  className: 'w-64 max-w-[256px] flex-grow cursor-pointer',
                })}
                onClick={onClick}
              >
                <Image src={image} width={88} height={132} alt="" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="font-bold">{title}</h2>
                    <p className="text-xs text-Mll_gray_400">{author}</p>
                  </div>
                  <div className="relative bottom-0">
                    {<Rate rate={rate} />}
                  </div>
                </div>
              </div>
            )
          case 'exploreDetail':
            return (
              <div
                className={card({
                  className: 'flex flex-grow flex-col px-0 py-0 ',
                })}
              >
                <div className="flex w-full gap-8 border-b border-solid border-Mll_gray_600 pb-10">
                  <Image src={image} width={108} height={152} alt="" />
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-bold">{title}</h2>
                      <p className="text-xs text-Mll_gray_400">{author}</p>
                    </div>
                    <div>
                      {<Rate rate={rate} />}
                      <p className="text-xs text-Mll_gray_400">
                        {rateLength} avaliações
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="flex items-center justify-center gap-4">
                    <BookmarkSimple size={24} color="#50B2C0" />
                    <div>
                      <p className="text-sm text-Mll_gray_300">Categoria</p>
                      <p className="font-bold text-Mll_gray_200">
                        {categories?.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className=" flex items-center justify-center gap-4">
                    <BookOpen size={24} color="#50B2C0" />
                    <div>
                      <p className="text-sm text-Mll_gray_300">Páginas</p>
                      <p className="font-bold text-Mll_gray_200">
                        {pagesTotal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'main':
            return (
              <div className={card({ className })}>
                <div className="flex w-full flex-col gap-8  text-Mll_gray_100">
                  <div className="flex items-center justify-between px-0 py-2 text-sm ">
                    <div className="flex gap-4">
                      <Image
                        src={profileImg}
                        width={40}
                        height={40}
                        alt="avatar"
                        className="h-10 w-10 rounded-full border border-Mll_green_100 object-cover"
                      />
                      <div>
                        <p>{profileName}</p>
                        <span className="text-Mll_gray_400">
                          {formatDistanceToNow(createdAt!, { locale: ptBR })}
                        </span>
                      </div>
                    </div>

                    <div className="relative right-0">
                      {<Rate rate={rate} />}
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <Image
                      src={image}
                      width={94}
                      height={94}
                      alt=""
                      className="object-cover"
                    />
                    <div className="flex flex-col justify-between ">
                      <div>
                        <h2 className="font-bold">{title}</h2>
                        <p className="text-xs text-Mll_gray_400">{author}</p>
                        <p className={desc({ vermais: verMais })}>
                          {description}
                        </p>
                        {description.length > 222 && (
                          <button
                            onClick={() => {
                              setVerMais(!verMais)
                            }}
                            className="text-sm text-Mll_purple_100"
                          >
                            {verMais ? 'Ver menos' : 'Ver mais'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'self':
            return (
              <div className={card({ className: 'bg-Mll_gray_600' })}>
                <div className="flex w-full flex-col gap-8  text-Mll_gray_100">
                  <div className="flex items-start gap-5">
                    <Image
                      src={image}
                      width={94}
                      height={94}
                      alt=""
                      className="object-cover"
                    />
                    <div className="flex w-full flex-col justify-between">
                      <div className="flex items-center justify-between px-0 pb-4 text-sm ">
                        <div className="flex gap-4">
                          <div>
                            <span className="text-Mll_gray_400">
                              {formatDistanceToNow(createdAt!, {
                                locale: ptBR,
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="relative right-0">
                          {<Rate rate={rate} />}
                        </div>
                      </div>
                      <div>
                        <h2 className="font-bold">{title}</h2>
                        <p className="text-xs text-Mll_gray_400">{author}</p>
                        <p className="mt-4 line-clamp-2 text-sm text-Mll_gray_300">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'profile':
            return (
              <div>
                <p className="mb-4 text-sm text-Mll_gray_300">
                  {formatDistanceToNow(createdAt!, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </p>
                <div className={card({ className })}>
                  <div className="flex w-full flex-col gap-2  text-Mll_gray_100">
                    <div className="flex items-start gap-5">
                      <Image
                        src={image}
                        width={94}
                        height={94}
                        alt=""
                        className="object-cover"
                      />
                      <div className="flex h-full flex-col justify-between">
                        <div>
                          <h2 className="font-bold">{title}</h2>
                          <p className="text-xs text-Mll_gray_400">{author}</p>
                        </div>
                        <div>{<Rate rate={rate} />}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-Mll_gray_300">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            )
          default:
            return <></>
        }
      })()}
    </>
  )
}
