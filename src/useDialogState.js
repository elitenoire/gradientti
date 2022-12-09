import { useState, useCallback } from 'react'

const useDialogState = (initial = false) => {
  const [open, setOpen] = useState(initial)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return [open, handleOpen, handleClose]
}

export default useDialogState
