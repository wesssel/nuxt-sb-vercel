<script lang="ts">
// from: https://github.com/maoberlehner/vue-lazy-hydration/issues/68#issuecomment-814638889
import { Component, defineAsyncComponent, defineComponent, h } from 'vue'

export function hydrateNever(componentOrFactory: Component): Component {
  return makeHydrationBlocker(componentOrFactory, {
    beforeCreate() {
      this.never = true
    },
  })
}

export function hydrateWhenVisible(
  componentOrFactory: Component,
  { observerOptions = undefined } = {}
): Component {
  return makeHydrationBlocker(componentOrFactory, {
    beforeCreate() {
      this.whenVisible = observerOptions || true
    },
  })
}

export function hydrateWhenIdle(
  componentOrFactory: Component,
  { timeout = 2000 } = {}
): Component {
  return makeHydrationBlocker(componentOrFactory, {
    beforeCreate() {
      this.whenIdle = true
      this.idleTimeout = timeout
    },
  })
}

export function hydrateOnInteraction(
  componentOrFactory: Component,
  { event = 'focus' } = {}
): Component {
  const events = Array.isArray(event) ? event : [event]

  return makeHydrationBlocker(componentOrFactory, {
    beforeCreate() {
      this.interactionEvents = events
    },
  })
}

const LazyHydrate = makeHydrationBlocker(null, {
  props: {
    idleTimeout: {
      default: 2000,
      type: Number,
    },
    never: {
      type: Boolean,
    },
    onInteraction: {
      type: [Array, Boolean, String],
    },
    triggerHydration: {
      default: false,
      type: Boolean,
    },
    whenIdle: {
      type: Boolean,
    },
    whenVisible: {
      type: [Boolean, Object],
    },
  },
  computed: {
    interactionEvents() {
      if (!this.onInteraction) return []

      // @ts-ignore
      if (this.onInteraction === true) return ['focus']

      return Array.isArray(this.onInteraction)
        ? this.onInteraction
        : [this.onInteraction]
    },
  },
  watch: {
    triggerHydration: {
      immediate: true,
      handler(isTriggered) {
        // @ts-ignore
        if (isTriggered) this.hydrate()
      },
    },
  },
} as Partial<Component>)

export default LazyHydrate

const observers = new Map()
const isServer = typeof window === 'undefined'

function resolveComponent(componentOrFactory: Component): Component {
  if (typeof componentOrFactory === 'function') {
    return (componentOrFactory as any)().then(
      (componentModule: any) => componentModule.default
    )
  }
  return componentOrFactory
}

function makeNonce({
  component,
  hydrationPromise,
}: {
  component: Component
  hydrationPromise: Promise<unknown>
}) {
  if (isServer) {
    if (typeof component === 'function') {
      return defineAsyncComponent(component as any)
    } else {
      return component
    }
  }

  return defineAsyncComponent(() =>
    hydrationPromise.then(() => {
      return resolveComponent(component)
    })
  )
}

function makeHydrationObserver(options: any) {
  if (typeof IntersectionObserver === 'undefined') return null

  const optionKey = JSON.stringify(options)
  if (observers.has(optionKey)) return observers.get(optionKey)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Use `intersectionRatio` because of Edge 15's
      // lack of support for `isIntersecting`.
      // See: https://github.com/w3c/IntersectionObserver/issues/211
      const isIntersecting = entry.isIntersecting || entry.intersectionRatio > 0
      const target = entry.target as any
      if (!isIntersecting || !target.hydrate) return
      target.hydrate()
    })
  }, options)
  observers.set(optionKey, observer)

  return observer
}

function makeHydrationPromise() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let hydrate: (value: unknown) => void = () => {}
  const hydrationPromise = new Promise((resolve) => {
    hydrate = resolve
  })

  return {
    hydrate,
    hydrationPromise,
  }
}

function makeHydrationBlocker(component: Component | null, options: any) {
  return defineComponent(
    Object.assign(
      {
        mixins: [
          {
            beforeCreate() {
              this.cleanupHandlers = []
              const { hydrate, hydrationPromise } = makeHydrationPromise()
              if (component) {
                this.Nonce = makeNonce({ component, hydrationPromise })
              }
              this.hydrate = hydrate
              this.hydrationPromise = hydrationPromise
            },
            beforeUnmount() {
              this.cleanup()
            },
            mounted() {
              if (this.$el.nodeType === Node.COMMENT_NODE) {
                // No SSR rendered content, hydrate immediately.
                this.hydrate()
                return
              }

              if (this.never) return

              if (this.whenVisible) {
                const observerOptions =
                  this.whenVisible !== true ? this.whenVisible : undefined
                const observer = makeHydrationObserver(observerOptions)

                // If Intersection Observer API is not supported, hydrate immediately.
                if (!observer) {
                  this.hydrate()
                  return
                }

                this.$el.hydrate = this.hydrate
                // const cleanup = () => observer.unobserve(this.$el)
                // this.cleanupHandlers.push(cleanup)
                // this.hydrationPromise.then(cleanup)
                // observer.observe(this.$el)
                return
              }

              if (this.whenIdle) {
                // If `requestIdleCallback()` or `requestAnimationFrame()`
                // is not supported, hydrate immediately.
                if (
                  !('requestIdleCallback' in window) ||
                  !('requestAnimationFrame' in window)
                ) {
                  this.hydrate()
                  return
                }

                // @ts-ignore
                const id = requestIdleCallback(
                  () => {
                    requestAnimationFrame(this.hydrate)
                  },
                  { timeout: this.idleTimeout }
                )
                // @ts-ignore
                const cleanup = () => cancelIdleCallback(id)
                this.cleanupHandlers.push(cleanup)
                this.hydrationPromise.then(cleanup)
              }

              if (this.interactionEvents && this.interactionEvents.length) {
                const eventListenerOptions = {
                  capture: true,
                  once: true,
                  passive: true,
                }

                this.interactionEvents.forEach((eventName: string) => {
                  this.$el.addEventListener(
                    eventName,
                    this.hydrate,
                    eventListenerOptions
                  )
                  const cleanup = () => {
                    this.$el.removeEventListener(
                      eventName,
                      this.hydrate,
                      eventListenerOptions
                    )
                  }
                  this.cleanupHandlers.push(cleanup)
                })
              }
            },
            methods: {
              cleanup() {
                this.cleanupHandlers.forEach((handler: any) => handler())
              },
            },
            render() {
              return component
                ? h(this.Nonce, {
                    attrs: this.$attrs,
                    // on: this.$listeners,
                    // scopedSlots: this.$scopedSlots,
                  }) // prefer sending function as slot
                : this.$slots.default()
            },
          } as Component,
        ],
      },
      options
    )
  )
}
</script>
