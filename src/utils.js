export const clamp = (num, lower, upper) => (upper ? Math.min(Math.max(num, lower), upper) : Math.min(num, lower))

export const insertAt = (arr, index, ...items) => {
  const newArr = [...arr]
  newArr.splice(index, 0, ...items)
  return newArr
}
