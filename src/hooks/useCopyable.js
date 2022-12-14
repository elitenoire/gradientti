import { useCallback } from 'react'
import { useClipboard } from 'use-clipboard-copy'

const useCopyable = ({ timeout = 500, text }) => {
  const { copy, copied } = useClipboard({
    copiedTimeout: timeout,
  })

  const onCopy = useCallback(
    e => {
      e?.stopPropagation()
      copy(text)
    },
    [copy, text]
  )

  return { copied, onCopy }
}

export default useCopyable
