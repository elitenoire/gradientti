import { useState, useCallback, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { highlightAll } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-css'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
import 'prism-themes/themes/prism-duotone-dark.css'
import Modal from './Modal'
import { useCopyable } from '../hooks'

const gradientCode = ({ start, end, prefix }) =>
  prefix
    ? `
  background: ${start}; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, ${start}, ${end}); /* Chrome 10-25, Safari 5.1-6 */
  background: -moz-linear-gradient(to right, ${start}, ${end});
  background: linear-gradient(to right, ${start}, ${end}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */`
    : `
  background: ${start};
  background: linear-gradient(to right, ${start}, ${end});
  `

function CodeBlock({ code }) {
  useEffect(() => {
    highlightAll()
  }, [code])

  return (
    <div className="overflow-auto">
      <pre className="language-css line-numbers">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function GradientCopy({ start, end, open, onClose }) {
  const [prefix, setPrefix] = useState(true)

  const code = gradientCode({ start, end, prefix })

  const { copied, onCopy } = useCopyable({
    timeout: 2000,
    text: code,
  })

  const handleChange = useCallback(e => {
    setPrefix(e.target.checked)
  }, [])

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Title className="flex items-center justify-end">
        <span className="mr-auto">Copy CSS Code</span>
        <span className="color-ring" style={{ backgroundColor: start }} />
        <span className="color-ring" style={{ backgroundColor: end }} />
      </Modal.Title>
      <div className="relative mb-4">
        <CodeBlock code={code} />
        <Transition
          show={copied}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute inset-0 flex items-center justify-center rounded-md bg-white/75 backdrop-blur-sm"
        >
          <p className="font-medium">✅ Yay! Make magic with it.</p>
        </Transition>
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="prefix-check" className="flex items-center font-medium">
          <input
            id="prefix-check"
            checked={prefix}
            onChange={handleChange}
            className="mr-2 rounded leading-tight text-violet-500 focus:ring-violet-300"
            type="checkbox"
          />
          <span className="text-sm">Vendor Prefix</span>
        </label>
        <button type="button" className="btn btn-primary" onClick={onCopy}>
          Copy CSS
        </button>
      </div>
    </Modal>
  )
}

export default GradientCopy
