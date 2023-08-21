export const unique = (value: any, index: number, self: any) => {
  const findIndex = (element: any) => element && element[0] == value[0]

  return self.findIndex(findIndex) === index
}

export const range = (num: number): number[] => [...Array(num).keys()]
