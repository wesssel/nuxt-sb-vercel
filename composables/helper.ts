import {
  EventBus,
  ANIMATION_IMAGE_LOADED,
  ANIMATION_IMAGES,
} from '../event-bus'

// @TODO refactor to composable

export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const xhr = new XMLHttpRequest()

    xhr.open('GET', src, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      img.src = URL.createObjectURL(xhr.response)
      img.onload = () => {
        resolve(img)
        EventBus.$emit(ANIMATION_IMAGE_LOADED)
      }
    }
    xhr.onerror = () => reject()
    xhr.send()
  })
}

export const preloadImages = (urls: string[]): Promise<HTMLImageElement[]> => {
  EventBus.$emit(ANIMATION_IMAGES, urls.length)

  return Promise.all(urls.map((src: string) => preloadImage(src)))
}

export const calcDrawImage = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  left: number = 0.5,
  top: number = 0.5
) => {
  const cWidth = ctx.canvas.width
  const cHeight = ctx.canvas.height
  const width = image.width
  const height = image.height
  const ratio = width / height
  const cRatio = cWidth / cHeight
  let resultHeight, resultWidth

  if (ratio > cRatio) {
    resultHeight = cHeight
    resultWidth = cHeight * ratio
  } else {
    resultWidth = cWidth
    resultHeight = cWidth / ratio
  }

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, cWidth, cHeight)
  ctx.drawImage(
    image,
    (cWidth - resultWidth) * left,
    (cHeight - resultHeight) * top,
    resultWidth,
    resultHeight
  )
}

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
