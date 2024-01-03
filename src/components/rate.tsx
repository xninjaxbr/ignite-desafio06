'use client'

import { Star } from '@phosphor-icons/react'
import { useState } from 'react'

interface Irateprops {
  rate: number
  changeable?: boolean
  handleRate?: (rate: number) => void
}

export function Rate({ rate, changeable = false, handleRate }: Irateprops) {
  const stars = [1, 2, 3, 4, 5]
  const [currentRate, setCurrentRate] = useState(rate)

  if (changeable) {
    handleRate!(currentRate)
  }

  return (
    <div className="flex">
      {changeable ? (
        <div className="flex">
          {stars.map((step) => {
            if (step <= currentRate) {
              return (
                <button key={step} onClick={() => setCurrentRate(step)}>
                  <Star weight="fill" color="#8381D9" />
                </button>
              )
            } else {
              return (
                <button key={step} onClick={() => setCurrentRate(step)}>
                  <Star color="#8381D9" />
                </button>
              )
            }
          })}
        </div>
      ) : (
        stars.map((step) => {
          if (step <= rate) {
            return <Star key={step} weight="fill" color="#8381D9" />
          } else {
            return <Star key={step} color="#8381D9" />
          }
        })
      )}
    </div>
  )
}
