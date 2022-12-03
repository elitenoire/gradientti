import { useReducer, useCallback } from 'react'

const INC = 'INCREMENT'
const DEC = 'DECREMENT'
const GOTO = 'GOTO'

const clamp = (num, lower, upper) => (upper ? Math.min(Math.max(num, lower), upper) : Math.min(num, lower))

const reducer = (state, { type, index }) => {
  const { count, start, end } = state
  const total = end - start + 1

  switch (type) {
    case INC:
      return {
        ...state,
        direction: 1,
        count: (count + 1 + total) % total,
      }
    case DEC:
      return {
        ...state,
        direction: -1,
        count: (count - 1 + total) % total,
      }
    case GOTO:
      return { ...state, direction: 0, count: clamp(index, start, end) }
    default:
      return state
  }
}

const useSequence = ({ count, direction = 0, start = 0, end = 4 }) => {
  const defaultCount = count || start

  const initialState = { count: defaultCount, defaultCount, direction, start, end }

  const [state, dispatch] = useReducer(reducer, initialState)

  const increment = useCallback(() => dispatch({ type: INC }), [dispatch])

  const decrement = useCallback(() => dispatch({ type: DEC }), [dispatch])

  const goto = useCallback(index => dispatch({ type: GOTO, index }), [dispatch])

  return {
    ...state,
    increment,
    decrement,
    goto,
  }
}

export default useSequence
