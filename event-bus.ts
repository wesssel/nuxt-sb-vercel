class Event {
  events: any

  constructor() {
    this.events = {}
  }

  $on(eventName: string, fn: any) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(fn)
  }

  $off(eventName: string, fn: any) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1)
          break
        }
      }
    }
  }

  $emit(eventName: string, data?: any) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(data)
      })
    }
  }
}

export const EventBus = new Event()

export const EVENT_CLOSE_FAQ = 'EVENT_CLOSE_FAQ'
export const LOADER_FINISHED = 'LOADER_FINISHED'
export const LOADER_RESET = 'LOADER_RESET'
export const ANIMATION_IMAGE_LOADED = 'ANIMATION_IMAGE_LOADED'
export const NUM_OF_ANIMATION_IMAGES_LOADED = 'NUM_OF_ANIMATION_IMAGES_LOADED'
export const ANIMATION_IMAGES = 'ANIMATION_IMAGES'
