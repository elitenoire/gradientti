import { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft, faPlus, faCode, faBars } from '@fortawesome/free-solid-svg-icons'
import Splash from './Splash'
import GradientCopy from './GradientCopy'
import useSequence from './useSequence'
import { gradients } from './gradients'

const initialGradient = {
  name: 'Cosmic Tail',
  start: '#780206',
  end: '#061161',
}

const palette = [initialGradient, ...gradients]

function App() {
  const [loading, setLoading] = useState(true)
  const [openCopyModal, setOpenCopyModal] = useState(false)
  const { count, increment, decrement } = useSequence({
    end: palette.length - 1,
  })

  const { name, start, end } = palette[count]

  const handleOpenCopyModal = useCallback(() => {
    setOpenCopyModal(true)
  }, [])

  const handleCloseCopyModal = useCallback(() => {
    setOpenCopyModal(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="relative h-full" aria-live="polite" aria-busy={loading}>
      {loading ? (
        <Splash />
      ) : (
        <div className="animate-fadeIn h-full">
          <header className="fixed inset-x-0 top-0 px-4 pt-2 text-white sm:pt-4">
            <div className="flex flex-wrap items-center justify-end gap-y-6">
              <div className="mr-auto flex items-center gap-x-2">
                <img className="w-9" src="/logo.svg" alt="Gradientti logo" />
                <span className="hidden text-2xl font-bold drop-shadow md:inline">Gradientti</span>
              </div>
              <div className=" order-last w-full text-center sm:order-none sm:mr-4 sm:w-auto lg:mr-6">
                <div className="inline-flex gap-x-4 overflow-hidden rounded-full bg-white/10 py-2 px-3 font-bold sm:py-4 sm:px-6 ">
                  <p className="flex flex-wrap items-center justify-center gap-1 text-sm sm:text-base">
                    <span className="h-4 w-4 rounded-full shadow-inner" style={{ backgroundColor: start }} />
                    {start}
                  </p>
                  <span>→</span>
                  <p className="flex flex-wrap items-center justify-center gap-1 text-sm sm:text-base">
                    <span className="h-4 w-4 rounded-full shadow-inner" style={{ backgroundColor: end }} />
                    {end}
                  </p>
                </div>
              </div>
              <div className="flex gap-x-2 lg:gap-x-4">
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition duration-200 ease-in-out hover:scale-110 hover:bg-white/20 active:scale-95"
                  onClick={handleOpenCopyModal}
                >
                  <FontAwesomeIcon icon={faCode} />
                </button>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition duration-200 ease-in-out hover:scale-110 hover:bg-white/20 active:scale-95"
                  // onClick={handleOpenAddModal}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 font-medium transition duration-200 ease-in-out hover:scale-110 hover:bg-white/20 active:scale-95 md:w-auto md:px-4"
                >
                  <span className="mr-2 hidden md:inline">View Gradients</span>
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
            </div>
            <GradientCopy start={start} end={end} open={openCopyModal} onClose={handleCloseCopyModal} />
          </header>
          <main className="h-full">
            <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-between px-4 text-white">
              <button
                type="button"
                className="rounded-full bg-white/10 p-4 transition duration-200 ease-in-out hover:scale-110 hover:bg-white/20 active:scale-95"
                onClick={decrement}
              >
                <FontAwesomeIcon icon={faAnglesLeft} size="lg" />
              </button>
              <p className="text-center text-lg font-bold opacity-70 drop-shadow sm:text-3xl lg:text-5xl">{name}</p>
              <button
                type="button"
                className="rounded-full bg-white/10 p-4 transition duration-200 ease-in-out hover:scale-110 hover:bg-white/20 active:scale-95"
                onClick={increment}
              >
                <FontAwesomeIcon icon={faAnglesLeft} display="block" size="lg" flip="horizontal" />
              </button>
            </div>
            <div className="h-full" style={{ backgroundImage: `linear-gradient(to right, ${start}, ${end})` }} />
          </main>
          <footer className="fixed inset-x-0 bottom-0 py-2 text-center text-white">
            <a
              href="https://github.com/elitenoire/gradientti"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 text-sm font-bold underline decoration-dotted underline-offset-4"
            >
              github ❤ elitenoire
            </a>
          </footer>
        </div>
      )}
    </div>
  )
}

export default App
