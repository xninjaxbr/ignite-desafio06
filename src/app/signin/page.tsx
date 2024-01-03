'use client'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const session = useSession()
  const route = useRouter()
  if (session.status === 'authenticated') {
    return route.push('/')
  }

  function login() {
    signIn()
  }

  return (
    <>
      <div className="mx-auto grid  min-h-screen grid-cols-signIn">
        <div className="relative m-4 rounded-xl bg-[url('/ImgLogin.png')] bg-cover">
          <Image
            src="/logo.svg"
            alt=""
            width={180}
            height={48}
            className="relative mx-auto my-auto h-full"
          />
        </div>
        <div className="flex flex-col items-center justify-center text-Mll_gray_200">
          <div className="flex w-[372px] flex-col gap-10 ">
            <div>
              <h2 className="text-xl font-bold text-gray-100">Boas Vindas!</h2>
              <p className="text-sm text-Mll_gray_300">
                Faça seu login ou acesse como visitante.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={login}
                className="w-[332px] rounded-lg bg-Mll_gray_600 px-6 py-4 "
              >
                Entrar com Google
              </button>
              <button className="w-[332px] rounded-lg bg-Mll_gray_600 px-6 py-4 ">
                Entrar com GitHub
              </button>
              <button className="w-[332px] rounded-lg bg-Mll_gray_600 px-6 py-4 ">
                Entrar como Visitante
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
