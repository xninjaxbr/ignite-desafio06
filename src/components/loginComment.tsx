import Image from 'next/image'

interface IloginCommentPorps {
  close: () => void
  login: () => void
}

export function LoginComment({ close, login }: IloginCommentPorps) {
  function loginButton() {
    login()
    close()
  }

  return (
    <div>
      <div
        onClick={close}
        className="fixed left-0 top-0 h-screen w-screen overflow-hidden bg-black opacity-60"
      ></div>
      <div className="fixed right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-xl bg-Mll_gray_700 px-20 py-14 opacity-100">
        <p className="mb-10 font-bold text-Mll_gray_200">
          Faça o login para deixar sua avaliação
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={loginButton}
            className="flex items-center justify-center gap-5 rounded-lg bg-Mll_gray_600 px-6 py-5 text-lg font-bold"
          >
            <Image src="/google.svg" width={32} height={32} alt="Google" />
            Entrar com o Google
          </button>
          <button
            onClick={loginButton}
            className="flex items-center justify-center gap-5 rounded-lg bg-Mll_gray_600 px-6 py-5 text-lg font-bold"
          >
            <Image src="/github.svg" width={32} height={32} alt="GitHub" />
            Entrar com o GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
