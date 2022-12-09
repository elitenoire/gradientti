import { useCallback } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import Drawer from './Drawer'

function GradientsView({ open, onClose, gradientList, value, onSelect }) {
  const handleChange = useCallback(
    selected => {
      onSelect?.(selected)
      onClose?.()
    },
    [onSelect, onClose]
  )

  return (
    <Drawer title="Gradient Swatches" open={open} onClose={onClose}>
      <Listbox horizontal by="name" value={value} onChange={handleChange}>
        <Listbox.Options static className="flex flex-wrap gap-8">
          {gradientList.map((gradient, i) => {
            const { name, start, end } = gradient
            return (
              <Transition.Child
                as={Listbox.Option}
                key={name}
                value={i}
                enter="ease duration-500"
                enterFrom="opacity-0 translate-y-1/4 sm:translate-y-0 sm:scale-0"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease duration-500"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-1/4 sm:translate-y-0 sm:scale-0"
                className="grow basis-52 rounded-lg md:basis-60"
                style={{
                  transitionDelay: `${0.05 * i + (open ? 0.35 : 0)}s`,
                }}
              >
                <span
                  className="relative flex min-h-swatch items-center justify-center overflow-hidden rounded-lg"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${start}, ${end})`,
                  }}
                >
                  <span className="font-medium text-white opacity-90 transition-opacity">{name}</span>
                  <span className="absolute inset-x-0 bottom-0 flex text-center text-sm text-white/50">
                    <span className="flex-1 py-1 font-medium" style={{ background: start }}>
                      {start.toUpperCase()}
                    </span>
                    <span className="flex-1 py-1 font-medium" style={{ background: end }}>
                      {end.toUpperCase()}
                    </span>
                  </span>
                </span>
              </Transition.Child>
            )
          })}
        </Listbox.Options>
      </Listbox>
    </Drawer>
  )
}

export default GradientsView
