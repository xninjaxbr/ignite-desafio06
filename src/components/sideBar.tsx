'use client'

import { ChartLineUp, Binoculars, SignIn, User } from '@phosphor-icons/react'
import Image from 'next/image'
import { SideButton } from './sideButton'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function SideBar() {
  const sessionConst = useSession()

  const [session, setSession] = useState(sessionConst)
  useEffect(() => {
    setSession(sessionConst)
  }, [sessionConst])

  return (
    <div className="my-3 flex h-[36rem] flex-col items-center justify-between rounded-xl bg-gradient-to-b from-Mll_purple_200 from-10% via-Mll_gray_600 via-20% to-Mll_green_200 to-95% py-10 ">
      <div>
        <Image src="/logo.svg" alt="" width={118} height={48} />
        <div className="flex flex-col gap-2 pt-16">
          <SideButton
            href="/"
            icon={<ChartLineUp size={22} />}
            label="Início"
          />

          <SideButton
            href="/explorar"
            icon={<Binoculars size={22} />}
            label="Explorar"
          />

          {session.status === 'authenticated' && (
            <SideButton
              href="/perfil"
              icon={<User size={22} />}
              label="Perfil"
            />
          )}
        </div>
      </div>
      {session.status === 'authenticated' ? (
        <div className="flex items-center gap-1 px-0 py-2 text-sm ">
          <Image
            src={session.data.user.avatar_url || ''}
            width={28}
            height={28}
            alt={session.data.user.username}
            className="rounded-full border border-Mll_green_100"
          />
          {session.data.user.username}
          <button onClick={() => signOut()}>
            <SignIn size={22} color="#F75A68" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 px-0 py-2 text-sm ">
          <Link href={'/signin'}>Fazer login</Link>
          <SignIn size={22} />
        </div>
      )}
    </div>
  )
}
