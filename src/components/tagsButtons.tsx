import * as RadioGroup from '@radix-ui/react-radio-group'
import * as ScrollArea from '@radix-ui/react-scroll-area'

interface Icategory {
  category: (value: string) => void
}

export function TagsButtons({ category }: Icategory) {
  const tags = [
    'Tudo',
    'Geek',
    'Romance',
    'Suspense',
    'Ficção',
    'Fábula',
    'Terror',
    'Alegoria',
    'Arquitetura',
    'Autoajuda',
    'Programação',
    'Aventura',
    'Educação',
  ]
  return (
    <ScrollArea.Root className="h-14">
      <ScrollArea.Viewport>
        <RadioGroup.Root
          className="flex gap-1 overflow-x-auto"
          defaultValue="Tudo"
          aria-label="View"
          onValueChange={(value: string) => {
            category(value.toLocaleUpperCase())
          }}
        >
          {tags.map((tag) => {
            return (
              <RadioGroup.Item
                key={tag}
                className={
                  'flex flex-col items-center justify-center rounded-full border border-solid border-Mll_purple_100 px-4 py-1 text-Mll_purple_100 transition-colors delay-150 hover:bg-Mll_purple_200 hover:text-Mll_gray_100 data-[state=checked]:bg-Mll_purple_200 data-[state=checked]:text-Mll_gray_100'
                }
                value={tag}
              >
                {tag}
                <RadioGroup.Indicator className="bg-Mll_purple_200" />
              </RadioGroup.Item>
            )
          })}
        </RadioGroup.Root>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none rounded-xl bg-Mll_gray_400 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-Mll_gray_500 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-white" />
    </ScrollArea.Root>
  )
}
