export async function asyncForEach(array: any[], callback: Function) {
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array)
  }
}
