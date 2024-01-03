import Link from 'next/link'
import { ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const sideButton = tv({
  base: ['flex items-center gap-4 py-2 px-0 text-sm '],
  variants: {
    variant: {
      true: 'font-bold',
      false: 'text-Mll_gray_400 hover:text-Mll_gray_100',
    },
  },
  defaultVariants: {
    variant: false,
  },
})

interface IsideButton extends VariantProps<typeof sideButton> {
  href: string
  icon: ReactNode
  label: string
}

export function SideButton({ href, icon, label }: IsideButton) {
  const pathName = usePathname()
  const checked = pathName === href

  return (
    <div className="flex items-center justify-start gap-4">
      {checked ? (
        <motion.div
          layoutId="sideBar"
          className="h-6 w-1 rounded-xl bg-Gradient_horizontal"
        ></motion.div>
      ) : (
        <div className="h-6 w-1 "></div>
      )}
      <Link href={href} className={sideButton({ variant: checked })}>
        {!!icon && <>{icon}</>}
        <p>{label}</p>
      </Link>
    </div>
  )
}
