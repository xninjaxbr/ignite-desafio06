import {
  BookOpen,
  BookmarkSimple,
  Books,
  UserList,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { Iratings } from '../app/(home)/perfil/page'

interface IperfilCard {
  id?: string
  name?: string
  avatarUrl?: string | null
  createdAt?: string
  ratings: Iratings[] | null
}

export function PerfilCard({
  name = 'Usuário não logado',
  avatarUrl = '',
  createdAt,
  ratings,
}: IperfilCard) {
  let perfilProps = ratings?.reduce(
    (acc, value) => {
      acc.totalPages += value.book.total_pages
      acc.livros += 1
      acc.autores += 1

      const categorias = value.book.categories.reduce(
        (resultado, listaCategorias) =>
          resultado.concat(listaCategorias.category.name),
        [] as Array<string>,
      )

      acc.categoriaMaisLida.push(categorias)

      return acc
    },
    {
      categoriaMaisLida: [] as Array<Array<string>>,
      totalPages: 0,
      livros: 0,
      autores: 0,
    },
  )

  function maisRepetida(array?: string[]) {
    if (!array) {
      return
    }
    const contador: { [string: string]: number } = {}

    array.forEach((str) => {
      contador[str] = (contador[str] || 0) + 1
    })

    let stringMaisRepetida = ''
    let maxContador = 0

    for (const str in contador) {
      if (contador[str] > maxContador) {
        maxContador = contador[str]
        stringMaisRepetida = str
      }
    }

    return stringMaisRepetida
  }

  const categoria = perfilProps?.categoriaMaisLida.reduce((acc, categories) => {
    return acc.concat(categories)
  })

  let categoriaMaisLida = maisRepetida(categoria)

  if (!categoriaMaisLida) {
    categoriaMaisLida = 'Sem registro'
  }

  if (!perfilProps) {
    perfilProps = {
      totalPages: 0,
      livros: 0,
      autores: 0,
      categoriaMaisLida: [['sem Registro']],
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 border-l border-solid border-Mll_gray_700">
      {/* Image */}
      <div className=" flex flex-col items-center">
        <Image
          src={avatarUrl || ''}
          width={72}
          height={72}
          alt={name}
          className="m-auto rounded-full border-2 border-solid border-Mll_green_100"
        />
        {/* Name Container */}
        <p className="mt-5 text-lg font-bold">{name}</p>
        <span className="text-sm text-Mll_gray_400 ">
          {createdAt?.toString()}
        </span>
      </div>
      {/* Separator */}
      <div className="h-1 w-8 rounded-full bg-Gradient_horizontal"></div>
      {/* Tags Container */}
      <div className="flex flex-col gap-10 ">
        <div className="flex items-center gap-5">
          <BookOpen size={32} color="#50B2C0" />
          <div>
            <p className="text-sm text-Mll_gray_200">
              {perfilProps?.totalPages}
            </p>
            <p className="text-xs text-Mll_gray_300">Páginas lidas</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Books size={32} color="#50B2C0" />
          <div>
            <p className="text-sm text-Mll_gray_200">{perfilProps?.livros}</p>
            <p className="text-xs text-Mll_gray_300">Livros avaliados</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <UserList size={32} color="#50B2C0" />
          <div>
            <p className="text-sm text-Mll_gray_200">{perfilProps?.autores}</p>
            <p className="text-xs text-Mll_gray_300">Autores lidos</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <BookmarkSimple size={32} color="#50B2C0" />
          <div>
            <p className="text-sm text-Mll_gray_200">{categoriaMaisLida}</p>
            <p className="text-xs text-Mll_gray_300">Categoria mais lida</p>
          </div>
        </div>
      </div>
    </div>
  )
}
