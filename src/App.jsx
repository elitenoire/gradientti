import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

import { gradients } from './gradients'

function App() {
  return (
    <div className="relative h-full">
      <div className="fixed inset-x-0 top-0 p-4">
        <div className="flex items-center justify-center">
          <div className="flex rounded-full bg-white/10 p-4 font-bold text-white">
            <p className="flex items-center">
              <span className="mr-1 h-4 w-4 rounded-full bg-[#780206] shadow-inner" />
              #780206
            </p>
            <span className="mx-4">→</span>
            <p className="flex items-center">
              <span className="mr-1 h-4 w-4 rounded-full bg-[#061161] shadow-inner" />
              #061161
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-4 text-white">
        <button
          type="button"
          className="rounded-full bg-white/10 p-4 transition duration-200 ease-in-out hover:scale-110 hover:bg-white/20 active:scale-95"
        >
          <FontAwesomeIcon icon={faAnglesLeft} size="lg" />
        </button>
        <button
          type="button"
          className="rounded-full bg-white/10 p-4 transition duration-200 ease-in-out hover:scale-110 hover:bg-white/20 active:scale-95"
        >
          <FontAwesomeIcon icon={faAnglesLeft} display="block" size="lg" flip="horizontal" />
        </button>
      </div>
      <div className="h-full bg-gradient-to-r from-[#780206] to-[#061161]" />
    </div>
  )
}

export default App
