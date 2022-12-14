import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

function DrawerStyle({ children }) {
  return (
    <Transition as={Fragment}>
      <div className="fixed z-50">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600/75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-0 flex justify-end sm:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out sm:delay-75 duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-full max-w-5xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="relative flex-1">{children}</div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default DrawerStyle
