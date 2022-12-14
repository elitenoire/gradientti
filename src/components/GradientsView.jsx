import { useCallback, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import DrawerStyle from './DrawerStyle'
import { useCopyable } from '../hooks'

function CopyableColor({ color, className = '' }) {
  const { copied, onCopy } = useCopyable({
    timeout: 500,
    text: color,
  })

  return (
    <span
      role="presentation"
      onClick={onCopy}
      className={`flex-1 origin-bottom py-1 font-medium transition-transform hover:scale-110 ${className}`}
      style={{ background: color }}
    >
      {copied ? 'Copied!' : color.toUpperCase()}
    </span>
  )
}

function GradientsView({ gradientList, value, onSelect }) {
  const handleChange = useCallback(
    selected => {
      onSelect?.(selected)
    },
    [onSelect]
  )

  return (
    <Listbox horizontal value={value} onChange={handleChange}>
      <Listbox.Button className="btn-menu btn-ghost font-medium md:w-auto md:px-4">
        <span className="mr-2 hidden md:inline">View Gradients</span>
        <FontAwesomeIcon icon={faBars} />
      </Listbox.Button>
      <DrawerStyle title="Gradient Swatches">
        <div className="absolute inset-x-0 flex flex-row-reverse items-center justify-between py-4 px-6 sm:px-8">
          <div
            role="button"
            className="z-10 flex h-11 w-11 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            <span className="sr-only">Close panel</span>
            <FontAwesomeIcon icon={faClose} size="lg" aria-hidden="true" />
          </div>
          <div className="pointer-events-none text-lg font-bold text-gray-900">Gradient Swatches</div>
        </div>
        <Listbox.Options as={Fragment}>
          {({ open }) => (
            <ul className="relative flex flex-wrap gap-8 rounded-xl px-6 pt-20 pb-10 focus:outline-none focus:ring-2 focus:ring-gray-300 sm:px-8">
              {gradientList.map((gradient, i) => {
                const { name, start, end } = gradient
                return (
                  <Listbox.Option as={Fragment} key={name} value={i}>
                    {({ active }) => (
                      <Transition.Child
                        as="li"
                        enter="ease-ease duration-400"
                        enterFrom="opacity-0 translate-y-1/4 sm:translate-y-0 sm:scale-0"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-elastic duration-300"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-1/4 sm:translate-y-0 sm:scale-0"
                        className="grow basis-52 cursor-pointer md:basis-60"
                        style={{
                          transitionDelay: `${0.05 * i + (open ? 0.35 : 0)}s`,
                        }}
                      >
                        <span
                          className={`group relative flex min-h-swatch items-center justify-center overflow-hidden rounded-xl transition-shadow ease-ease${
                            active ? ' ring-2 ring-black ring-offset-4' : ''
                          }`}
                          style={{
                            backgroundImage: `linear-gradient(to right, ${start}, ${end})`,
                          }}
                        >
                          <span
                            className={`font-medium text-white ${
                              active ? 'opacity-75' : 'opacity-90'
                            } transition-opacity duration-200 group-hover:opacity-75`}
                          >
                            {name}
                          </span>
                          <span
                            className={`absolute inset-x-0 bottom-0 flex ${
                              active ? 'translate-y-0' : 'translate-y-full'
                            } text-center text-sm text-white transition-transform duration-200 group-hover:translate-y-0`}
                          >
                            <CopyableColor color={start} className="hover:z-10" />
                            <CopyableColor color={end} />
                          </span>
                        </span>
                      </Transition.Child>
                    )}
                  </Listbox.Option>
                )
              })}
            </ul>
          )}
        </Listbox.Options>
      </DrawerStyle>
    </Listbox>
  )
}

export default GradientsView
