import { useCopyable } from '../hooks'

function ColorButton({ color }) {
  const { copied, onCopy } = useCopyable({
    timeout: 500,
    text: color,
  })

  return (
    <button
      type="button"
      onClick={onCopy}
      className="flex flex-wrap items-center justify-center gap-1 rounded-lg py-1 px-2 text-sm hover:bg-white/5 sm:text-base"
    >
      <span className="h-4 w-4 rounded-full shadow-inner" style={{ backgroundColor: color }} />
      {copied ? 'copied!' : color}
    </button>
  )
}

function ColorPanel({ start, end }) {
  return (
    <div className="inline-flex gap-x-4 overflow-hidden rounded-full bg-white/10 py-2 px-3 font-bold sm:py-3 sm:px-4">
      <ColorButton color={start} />
      <span>→</span>
      <ColorButton color={end} />
    </div>
  )
}

export default ColorPanel
