export function throttle(func: Function, delay: number) {
  let flag = true

  return function () {
    if (flag) {
      func()
      flag = false
      setTimeout(() => (flag = true), delay)
    }
  }
}
