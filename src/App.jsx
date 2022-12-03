import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import useSequence from './useSequence'
import { gradients } from './gradients'

const initialGradient = {
  start: '#780206',
  end: '#061161',
}

const palette = [initialGradient, ...gradients]

function App() {
  const { count, increment, decrement } = useSequence({
    end: palette.length - 1,
  })

  const gradientStart = palette[count].start
  const gradientEnd = palette[count].end

  return (
    <div className="relative h-full">
      <div className="fixed inset-x-0 top-0 p-4">
        <div className="flex items-center justify-center">
          <div className="flex rounded-full bg-white/10 py-4 px-6 font-bold text-white">
            <p className="flex items-center">
              <span className="mr-1 h-4 w-4 rounded-full shadow-inner" style={{ backgroundColor: gradientStart }} />
              {gradientStart}
            </p>
            <span className="mx-4">→</span>
            <p className="flex items-center">
              <span className="mr-1 h-4 w-4 rounded-full shadow-inner" style={{ backgroundColor: gradientEnd }} />
              {gradientEnd}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-4 text-white">
        <button
          type="button"
          className="rounded-full bg-white/10 p-4 transition duration-200 ease-in-out hover:scale-110 hover:bg-white/20 active:scale-95"
          onClick={decrement}
        >
          <FontAwesomeIcon icon={faAnglesLeft} size="lg" />
        </button>
        <button
          type="button"
          className="rounded-full bg-white/10 p-4 transition duration-200 ease-in-out hover:scale-110 hover:bg-white/20 active:scale-95"
          onClick={increment}
        >
          <FontAwesomeIcon icon={faAnglesLeft} display="block" size="lg" flip="horizontal" />
        </button>
      </div>
      <div
        className="h-full"
        style={{ backgroundImage: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})` }}
      />
    </div>
  )
}

export default App
