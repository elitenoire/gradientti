export const clamp = (num, lower, upper) => (upper ? Math.min(Math.max(num, lower), upper) : Math.min(num, lower))

export const insertAt = (arr, index, ...items) => {
  const newArr = [...arr]
  newArr.splice(index, 0, ...items)
  return newArr
}

// uses two loops
export const checkIfExistAlt = (list, item) => {
  const nameExist = list.some(_item => _item.name === item.name)
  const gradientExist = list.some(_item => _item.start === item.start && _item.end === item.end)
  return { gradientExist, nameExist }
}
// one loop - slightly performant
export const checkIfExist = (list, item) => {
  const acc = {}
  list.some(_item => {
    if (_item.name === item.name) {
      acc.nameExist = true
    }
    if (_item.start === item.start && _item.end === item.end) {
      acc.gradientExist = true
    }
    return !!(acc.nameExist && acc.gradientExist)
  })
  return acc
}
