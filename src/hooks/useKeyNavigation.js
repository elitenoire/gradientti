export const SPACE = 32
// export const PAGEUP = 33
// export const PAGEDOWN = 34
// export const END = 35
// export const HOME = 36
export const LEFT = 37
export const UP = 38
export const RIGHT = 39
export const DOWN = 40
export const C_KEY = 67

const useKeyNavigation = ({ prev, next, space, cKey }) => {
  const onKey = e => {
    e.stopPropagation()
    switch (e.keyCode) {
      case LEFT:
      case UP:
        e.preventDefault()
        prev?.()
        break
      case RIGHT:
      case DOWN:
        e.preventDefault()
        next?.()
        break
      case SPACE:
        e.preventDefault()
        space?.()
        break
      case C_KEY:
        e.preventDefault()
        cKey?.()
        break
      default:
        break
    }
  }
  return onKey
}

export default useKeyNavigation
