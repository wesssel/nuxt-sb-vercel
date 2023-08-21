<template>
  <div
    :id="`wrapper-${blok._uid}`"
    class="relative flex w-full items-center justify-center"
  >
    <div v-if="blok.type === 'zero'">
      <div
        v-if="isAnimationShown"
        id="containerZero"
        style="height: 150vh; margin-top: 238px; margin-bottom: -340px"
        class="relative"
      >
        <div
          style="top: 50%; transform: translateY(-50%)"
          class="sticky flex h-auto w-full flex-col items-center justify-start"
        >
          <div class="w-full px-72 xl:px-60">
            <canvas
              class="relative z-50 mb-10 h-full w-full origin-top"
              id="canvasZero"
            ></canvas>
          </div>
          <div
            id="featuresZero"
            class="grid gap-8 md:grid-cols-2 md:gap-20 lg:grid-cols-3"
          >
            <div
              :id="`feature${index + 1}Zero`"
              class="opacity-1 flex md:opacity-0"
              v-for="(entry, index) in blok.items"
              :key="index"
            >
              <div class="flex flex-1 flex-col">
                <div class="flex flex-1 flex-col">
                  <div>
                    <div
                      class="mb-1 text-2xl font-semibold leading-tight md:mb-2"
                    >
                      {{ entry.title }}
                    </div>
                    <div class="text-lg leading-snug text-gray-500 lg:text-xl">
                      {{ entry.subtitle }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <Image class="mb-12" :blok="blok" :imageWidth="1136" />
        <div
          id="featuresZero"
          class="grid gap-8 md:grid-cols-2 md:gap-20 lg:grid-cols-3"
        >
          <div
            :id="`feature${index + 1}Zero`"
            class="opacity-1 flex md:opacity-0"
            v-for="(entry, index) in blok.items"
            :key="index"
          >
            <div class="flex flex-1 flex-col">
              <div class="flex flex-1 flex-col">
                <div>
                  <div
                    class="mb-1 text-2xl font-semibold leading-tight md:mb-2"
                  >
                    {{ entry.title }}
                  </div>
                  <div class="text-lg leading-snug text-gray-500 lg:text-xl">
                    {{ entry.subtitle }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="blok.type === 'graphene'">
      <div
        v-if="isAnimationShown"
        id="containerGraphene"
        style="height: 150vh; margin-top: 200px; margin-bottom: -320px"
        class="relative"
      >
        <div
          style="top: 50%; transform: translateY(-50%)"
          class="sticky flex h-auto w-full flex-col items-center justify-start"
        >
          <div class="w-full px-72 xl:px-60">
            <canvas
              class="relative z-50 mb-10 h-full w-full origin-top"
              id="canvasGraphene"
            ></canvas>
          </div>
          <div
            id="featuresGraphene"
            class="grid gap-8 md:grid-cols-2 md:gap-20 lg:grid-cols-3"
          >
            <div
              :id="`feature${index + 1}Graphene`"
              class="opacity-1 flex md:opacity-0"
              v-for="(entry, index) in blok.items"
              :key="index"
            >
              <div class="flex flex-1 flex-col">
                <div class="flex flex-1 flex-col">
                  <div>
                    <div
                      class="mb-1 text-2xl font-semibold leading-tight md:mb-2"
                    >
                      {{ entry.title }}
                    </div>
                    <div class="text-lg leading-snug text-gray-500 lg:text-xl">
                      {{ entry.subtitle }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <Image class="mb-12" :blok="blok" :imageWidth="1136" />
        <div class="grid gap-8 md:grid-cols-2 md:gap-20 lg:grid-cols-3">
          <div
            :id="`feature${index + 1}Graphene`"
            class="opacity-1 flex md:opacity-0"
            v-for="(entry, index) in blok.items"
            :key="index"
          >
            <div class="flex flex-1 flex-col">
              <div class="flex flex-1 flex-col">
                <div>
                  <div
                    class="mb-1 text-2xl font-semibold leading-tight md:mb-2"
                  >
                    {{ entry.title }}
                  </div>
                  <div class="text-lg leading-snug text-gray-500 lg:text-xl">
                    {{ entry.subtitle }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="blok.type === 'liquid'">
      <div
        v-if="isAnimationShown"
        id="containerLiquid"
        style="height: 150vh; margin-top: 35vh; margin-bottom: -320px"
        class="relative"
      >
        <div
          style="top: 50%; transform: translateY(-50%)"
          class="sticky flex h-auto w-full flex-col items-center justify-start"
        >
          <div class="relative mb-20">
            <picture
              id="frameLeftB"
              class="absolute top-0 bottom-0 h-auto w-auto origin-center transform"
            >
              <source
                srcset="/images/animation-liquid/frame-left-b.webp"
                type="image/webp"
              />
              <source
                srcset="/images/animation-liquid/frame-left-b.png"
                type="image/png"
              />
              <img
                class="h-full"
                src="/images/animation-liquid/frame-left-b.png"
              />
            </picture>

            <picture
              id="frameRightB"
              class="absolute top-0 bottom-0 h-full w-auto origin-center transform"
            >
              <source
                srcset="/images/animation-liquid/frame-right-b.webp"
                type="image/webp"
              />
              <source
                srcset="/images/animation-liquid/frame-right-b.png"
                type="image/png"
              />
              <img
                class="h-full w-full"
                src="/images/animation-liquid/frame-right-b.png"
              />
            </picture>

            <picture
              id="frameLeftA"
              class="absolute top-0 bottom-0 h-full w-auto origin-center transform shadow-2xl"
            >
              <source
                srcset="/images/animation-liquid/frame-left-a.webp"
                type="image/webp"
              />
              <source
                srcset="/images/animation-liquid/frame-left-a.png"
                type="image/png"
              />
              <img
                class="h-full w-full"
                src="/images/animation-liquid/frame-left-a.png"
              />
            </picture>

            <picture
              id="frameRightA"
              class="absolute top-0 bottom-0 h-full w-auto origin-center transform shadow-2xl"
            >
              <source
                srcset="/images/animation-liquid/frame-right-a.webp"
                type="image/webp"
              />
              <source
                srcset="/images/animation-liquid/frame-right-a.png"
                type="image/png"
              />
              <img
                class="h-full w-full"
                src="/images/animation-liquid/frame-right-a.png"
              />
            </picture>

            <picture class="relative">
              <source
                srcset="/images/animation-liquid/frame-center.webp"
                type="image/webp"
              />
              <source
                srcset="/images/animation-liquid/frame-center.png"
                type="image/png"
              />
              <img
                class="relative mx-auto h-full object-scale-down shadow-2xl"
                style="height: 48vh"
                src="/images/animation-liquid/frame-center.png"
              />
            </picture>
          </div>
          <div
            id="featuresLiquid"
            class="grid gap-8 md:grid-cols-2 md:gap-20 lg:grid-cols-3"
          >
            <div
              :id="`feature${index + 1}Liquid`"
              class="opacity-1 flex md:opacity-0"
              v-for="(entry, index) in blok.items"
              :key="index"
            >
              <div class="flex flex-1 flex-col">
                <div class="flex flex-1 flex-col">
                  <div>
                    <div
                      class="mb-1 text-2xl font-semibold leading-tight md:mb-2"
                    >
                      {{ entry.title }}
                    </div>
                    <div class="text-lg leading-snug text-gray-500 lg:text-xl">
                      {{ entry.subtitle }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <Image class="mb-12" :blok="blok" :imageWidth="1136" />
        <div class="grid gap-8 md:grid-cols-2 md:gap-20 lg:grid-cols-3">
          <div
            :id="`feature${index + 1}Liquid`"
            class="opacity-1 flex md:opacity-0"
            v-for="(entry, index) in blok.items"
            :key="index"
          >
            <div class="flex flex-1 flex-col">
              <div class="flex flex-1 flex-col">
                <div>
                  <div
                    class="mb-1 text-2xl font-semibold leading-tight md:mb-2"
                  >
                    {{ entry.title }}
                  </div>
                  <div class="text-lg leading-snug text-gray-500 lg:text-xl">
                    {{ entry.subtitle }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { PropType } from 'vue'
import { ISectionAnimation } from '~~/types/section'
import { preloadImages, calcDrawImage } from '~/composables/helper'
import Image from './Image.vue'

const BREAK_POINT_SHOW = 768

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionAnimation>,
    required: true,
  },
})

const isAnimationShown = ref(true)
const imageWidth = ref(930)
const tl = ref<GSAPTimeline>()

const imageHeight = computed(() => {
  return props.blok.type === 'graphene' ? 460 : 523
})

const features = computed(() => {
  if (props.blok.type === 'zero') {
    return document.querySelector(`#wrapper-${props.blok._uid} #featuresZero`)
  }
  if (props.blok.type === 'liquid') {
    return document.querySelector(`#wrapper-${props.blok._uid} #featuresLiquid`)
  }

  return document.querySelector(`#wrapper-${props.blok._uid} #featuresGraphene`)
})

const feature1 = computed(() => {
  if (props.blok.type === 'zero') {
    return document.querySelector(`#wrapper-${props.blok._uid} #feature1Zero`)
  }
  if (props.blok.type === 'liquid') {
    return document.querySelector(`#wrapper-${props.blok._uid} #feature1Liquid`)
  }

  return document.querySelector(`#wrapper-${props.blok._uid} #feature1Graphene`)
})

const feature2 = computed(() => {
  if (props.blok.type === 'zero') {
    return document.querySelector(`#wrapper-${props.blok._uid} #feature2Zero`)
  }
  if (props.blok.type === 'liquid') {
    return document.querySelector(`#wrapper-${props.blok._uid} #feature2Liquid`)
  }

  return document.querySelector(`#wrapper-${props.blok._uid} #feature2Graphene`)
})

const feature3 = computed(() => {
  if (props.blok.type === 'zero') {
    return document.querySelector(`#wrapper-${props.blok._uid} #feature3Zero`)
  }
  if (props.blok.type === 'liquid') {
    return document.querySelector(`#wrapper-${props.blok._uid} #feature3Liquid`)
  }

  return document.querySelector(`#wrapper-${props.blok._uid} #feature3Graphene`)
})

const canvas = computed(() => {
  if (props.blok.type === 'zero') {
    return document.querySelector(`#wrapper-${props.blok._uid} #canvasZero`)
  }

  return document.querySelector(`#wrapper-${props.blok._uid} #canvasGraphene`)
})

const frames = computed(() => {
  return props.blok.type === 'graphene' ? 23 : 29
})

const container = computed(() => {
  if (props.blok.type === 'zero') {
    return document.querySelector(`#wrapper-${props.blok._uid} #containerZero`)
  }

  return document.querySelector(
    `#wrapper-${props.blok._uid} #containerGraphene`
  )
})

const frameRightA = computed(() =>
  document.querySelector(`#wrapper-${props.blok._uid} #frameRightA`)
)
const frameLeftA = computed(() =>
  document.querySelector(`#wrapper-${props.blok._uid} #frameLeftA`)
)
const frameRightB = computed(() =>
  document.querySelector(`#wrapper-${props.blok._uid} #frameRightB`)
)
const frameLeftB = computed(() =>
  document.querySelector(`#wrapper-${props.blok._uid} #frameLeftB`)
)
const containerLiquid = computed(() =>
  document.querySelector(`#wrapper-${props.blok._uid} #containerLiquid`)
)

const animateKeyFrame = (images: HTMLImageElement[]) => {
  if (canvas.value) {
    const ctx = (canvas.value as HTMLCanvasElement).getContext('2d', {
      alpha: false,
    }) as CanvasRenderingContext2D

    const canvasWidth = imageWidth.value * window.devicePixelRatio
    const canvasHeight = imageHeight.value * window.devicePixelRatio

    ctx.canvas.width = canvasWidth
    ctx.canvas.height = canvasHeight

    const counter = { i: 0 }

    tl.value = gsap
      .timeline({
        scrollTrigger: {
          trigger: container.value,
          scrub: 0.5,
          start: 'top center',
          end: '+=80%',
        },
      })
      .to(
        counter,
        {
          i: images.length - 1,
          roundProps: 'i',
          ease: 'none',
          immediateRender: true,
          onUpdate() {
            return calcDrawImage(ctx, images[counter.i])
          },
        },
        0
      )
      .fromTo(feature1.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '<')
      .fromTo(
        feature2.value,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        '<20%'
      )
      .fromTo(
        feature3.value,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        '<20%'
      )
  }
}

const animateSlide = () => {
  if (
    !frameRightA.value ||
    !frameLeftA.value ||
    !frameRightB.value ||
    !frameLeftB.value ||
    !feature1.value ||
    !feature2.value ||
    !feature3.value
  ) {
    return
  }

  tl.value = gsap
    .timeline({
      scrollTrigger: {
        trigger: containerLiquid.value,
        scrub: 0.5,
        start: 'top center',
        end: '+=80%',
      },
    })
    .fromTo(
      frameLeftA.value,
      { scale: 0.85, xPercent: 0 },
      { xPercent: -70, ease: 'none' }
    )
    .fromTo(
      frameRightA.value,
      { scale: 0.85, xPercent: 0 },
      { xPercent: 70, ease: 'none' },
      '<'
    )
    .fromTo(
      frameLeftB.value,
      { scale: 0.85, xPercent: 0 },
      { xPercent: -130, ease: 'none' },
      '<30%'
    )
    .fromTo(
      frameRightB.value,
      { scale: 0.85, xPercent: 0 },
      { xPercent: 130, ease: 'none' },
      '<'
    )
    .fromTo(feature1.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '<')
    .fromTo(feature2.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '<20%')
    .fromTo(feature3.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '<20%')
}

const checkWebpSupport = () => {
  const $canvas = document.createElement('canvas')

  return $canvas.getContext &&
    $canvas.getContext('2d') &&
    $canvas.toDataURL('image/webp').includes('data:image/webp')
    ? 'webp'
    : 'jpg'
}

const createUrls = (fileformat: 'webp' | 'jpg') => {
  const urls: string[] = []
  for (let i = 0; i < frames.value; i++) {
    urls.push(`/images/animation-${props.blok.type}/frame${i}.${fileformat}`)
  }

  return urls
}

const preloadImagesAnimation = async () => {
  const fileformat = checkWebpSupport()
  const urls = createUrls(fileformat)

  return preloadImages(urls)
}

const animate = () => {
  if (window.innerWidth > BREAK_POINT_SHOW) {
    isAnimationShown.value = true
  } else {
    isAnimationShown.value = false
  }
  if (isAnimationShown.value) {
    setTimeout(async () => {
      if (props.blok.type === 'zero' || props.blok.type === 'graphene') {
        const images = await preloadImagesAnimation()
        animateKeyFrame(images)
      }
    })
    if (props.blok.type === 'liquid') {
      animateSlide()
    }
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  animate()
  window.addEventListener('resize', animate)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', animate)
  tl.value?.kill()
})
</script>

<style scoped>
/* todo: create a tailwind class for transparent png image shadows */
img {
  -webkit-filter: drop-shadow(0px 0px 40px black);
  filter: drop-shadow(0px 0px 40px black);
}
</style>
