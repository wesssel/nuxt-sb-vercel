<template>
  <div>
    <div v-if="blok.type === 'zero'">
      <div
        class="relative"
        :style="{ height: animateSequence_scrollLength + 100 + 'vh' }"
        ref="animationSequenceZero"
      >
        <div class="sticky top-0">
          <div ref="screenHeight" class="flex h-screen flex-col">
            <div>
              <div
                ref="heroZero"
                class="relative z-50 flex flex-col items-center justify-center pt-36 text-center"
              >
                <p
                  ref="labelZero"
                  class="mb-2 text-lg font-semibold uppercase text-yellow-900 opacity-0"
                >
                  {{ blok.label }}
                </p>
                <h1
                  ref="titleZero"
                  class="mb-6 text-4xl font-semibold leading-none tracking-tight opacity-0 lg:text-6xlplus"
                >
                  <TextC :text="blok.title" />
                </h1>
                <div
                  ref="subtitleZero"
                  class="mb-4 max-w-xl px-4 text-xl text-gray-500 opacity-0 lg:text-2xl"
                  v-if="blok.subtitle"
                >
                  {{ blok.subtitle }}
                </div>
                <div
                  ref="buttonZero"
                  class="pointer-events-auto mt-4 flex opacity-0"
                  v-if="blok.items"
                >
                  <ButtonItem
                    v-for="(item, index) in blok.items"
                    :key="index"
                    :blok="item"
                  />
                </div>
              </div>
            </div>
            <div
              :style="{ maxWidth: '1600px' }"
              ref="videoWrapZero"
              class="relative top-0 left-0 right-0 z-0 mx-auto flex w-10/12 transform items-center justify-center sm:w-6/12 md:-mt-24 md:items-start xl:w-180 2xl:w-230"
            >
              <video
                ref="videoZero"
                class="block h-full w-full opacity-0"
                playsinline
                muted
              >
                <source
                  src="/videos/zero/productPage-header.mp4"
                  type="video/mp4"
                />
              </video>
              <img
                ref="stillframeZero"
                class="z-70 absolute left-0 right-0 mx-auto block w-full opacity-0"
                src="/images/productpage/animation-zero/frame-off.jpg"
              />
            </div>
          </div>

          <div
            ref="blockquoteFirstWrapZero"
            class="relative left-0 right-0 top-0 mx-auto flex h-screen w-full max-w-3xl items-center justify-center px-3"
          >
            <blockquote
              ref="blockquoteFirstZero"
              class="text-center text-3xl font-semibold leading-tight lg:text-5xl"
            >
              <TextC :text="blok.text_1" />
            </blockquote>
          </div>

          <div
            ref="blockquoteSecondWrapZero"
            class="relative left-0 right-0 top-0 mx-auto flex h-screen w-full max-w-3xl items-center justify-center px-3"
          >
            <blockquote
              ref="blockquoteSecondZero"
              class="text-center text-3xl font-semibold leading-tight lg:text-5xl"
            >
              <TextC :text="blok.text_2" />
            </blockquote>
          </div>
        </div>
      </div>

      <div
        ref="canvasWrapperZero"
        class="relative z-10"
        :style="{
          height: animateKeyFrame_scrollLength + 200 + 'vh',
          marginTop: '-125vh',
        }"
      >
        <div
          ref="canvasContainerZero"
          class="pointer-events-none sticky left-0 right-0 top-0 z-30 mx-auto flex w-10/12 max-w-3xl items-center justify-center opacity-0 xl:w-180 2xl:w-230"
        >
          <canvas ref="canvasZero"></canvas>
        </div>
      </div>
      <div
        class="relative z-20 mx-auto"
        :style="{
          maxWidth: '1600px',
          height: animateExplosion_scrollLength + 100 + 'vh',
          marginTop: '-200vh',
        }"
        ref="explosionZeroWrap"
      >
        <div
          ref="explosionZero"
          class="sticky top-0 left-0 right-0 z-30 mx-auto flex h-screen w-10/12 items-center justify-center sm:w-6/12 xl:w-180 2xl:w-230"
        >
          <div ref="explosionImages" class="absolute top-0 mx-auto w-full">
            <img
              class="relative"
              ref="explosion1"
              src="/images/productpage/animation-zero/final-freeze-screen.png"
            />
            <img
              class="absolute top-0"
              ref="explosion2"
              src="/images/productpage/animation-zero/final-freeze-pcb.png"
            />
            <img
              class="absolute top-0"
              ref="explosion3"
              src="/images/productpage/animation-zero/final-freeze-housing.png"
            />
          </div>
          <div ref="explosionText" class="absolute top-0 left-0 z-50 w-full">
            <div
              class="relative mx-auto h-screen w-full md:relative md:grid md:grid-cols-2"
            >
              <div class="flex h-full flex-col justify-center md:-ml-52">
                <div
                  v-if="blok.zero_items[0]"
                  ref="explosionText1"
                  class="absolute top-20 left-0 flex transform flex-col justify-start text-white opacity-0 md:relative md:-top-10 md:left-0"
                >
                  <h3 class="text-medium mb-2 text-xl lg:text-2xl">
                    {{ blok.zero_items[0].title }}
                  </h3>
                  <span
                    ref="explosionLine1"
                    class="relative mb-3 hidden w-72 origin-right border-b-2 border-gray-300 opacity-50 md:block"
                  ></span>
                  <p class="w-72 pr-6 text-base xl:text-lg">
                    {{ blok.zero_items[0].text }}
                  </p>
                </div>
                <div
                  v-if="blok.zero_items[1]"
                  ref="explosionText2"
                  class="absolute bottom-20 left-0 flex flex-col justify-start text-white opacity-0 md:relative md:-bottom-20 md:left-10"
                >
                  <h3 class="text-medium mb-2 text-xl lg:text-2xl">
                    {{ blok.zero_items[1].title }}
                  </h3>
                  <span
                    ref="explosionLine2"
                    class="relative mb-3 hidden origin-right border-b-2 border-gray-300 opacity-50 md:block md:w-80"
                  ></span>
                  <p class="w-72 pr-20 text-base xl:text-lg">
                    {{ blok.zero_items[1].text }}
                  </p>
                </div>
              </div>
              <div class="flex h-full flex-col justify-center md:-mr-44">
                <div
                  v-if="blok.zero_items[2]"
                  ref="explosionText3"
                  class="absolute top-20 right-0 flex flex-col justify-start text-right text-white opacity-0 md:relative md:-top-10 md:right-0"
                >
                  <h3 class="text-medium mb-2 text-lg lg:text-2xl">
                    {{ blok.zero_items[2].title }}
                  </h3>
                  <span
                    ref="explosionLine3"
                    class="relative mb-3 mr-0 ml-auto hidden origin-left border-b-2 border-gray-300 opacity-50 md:block md:w-96"
                  ></span>
                  <p class="ml-auto w-80 pl-20 text-base xl:text-lg">
                    {{ blok.zero_items[2].text }}
                  </p>
                </div>
                <div
                  v-if="blok.zero_items[3]"
                  ref="explosionText4"
                  class="absolute bottom-20 right-0 flex flex-col justify-start text-right text-white opacity-0 md:relative md:-bottom-32 md:-right-10"
                >
                  <h3 class="text-medium mb-2 text-xl lg:text-2xl">
                    {{ blok.zero_items[3].title }}
                  </h3>
                  <span
                    ref="explosionLine4"
                    class="relative mb-3 ml-auto mr-0 hidden w-88 origin-left border-b-2 border-gray-300 opacity-50 md:block"
                  ></span>
                  <p class="ml-auto w-72 text-base xl:text-lg">
                    {{ blok.zero_items[3].text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="blok.type === 'graphene'">
      <div
        ref="animationSequenceGraphene"
        :style="{ height: animateSequence_scrollLength + 100 + 'vh' }"
        class="relative"
      >
        <div class="sticky top-0">
          <div class="flex h-screen flex-col">
            <div>
              <div
                ref="heroGraphene"
                class="relative z-10 flex flex-col items-center justify-center pt-36 text-center"
              >
                <p
                  ref="labelGraphene"
                  class="mb-2 text-lg font-semibold uppercase text-yellow-900 opacity-0"
                >
                  {{ blok.label }}
                </p>
                <h1
                  ref="titleGraphene"
                  class="mb-4 text-4xl font-semibold leading-none tracking-tight opacity-0 lg:text-6xlplus"
                >
                  <TextC :text="blok.title" />
                </h1>
                <div
                  ref="subtitleGraphene"
                  class="mb-4 max-w-xl px-4 text-xl text-gray-500 opacity-0 lg:text-2xl"
                  v-if="blok.subtitle"
                >
                  {{ blok.subtitle }}
                </div>
                <div
                  ref="buttonGraphene"
                  class="pointer-events-auto mt-4 flex opacity-0"
                  v-if="blok.items"
                >
                  <ButtonItem
                    v-for="(item, index) in blok.items"
                    :key="index"
                    :blok="item"
                  />
                </div>
              </div>
            </div>
            <div
              :style="{ maxWidth: '1600px' }"
              ref="videoWrapGraphene"
              class="pointer-events-none relative left-0 right-0 top-0 z-0 mx-auto flex w-10/12 transform items-center justify-center sm:w-6/12 md:items-start xl:w-180 2xl:w-215"
            >
              <video
                ref="videoGraphene"
                class="block h-full w-full opacity-0"
                playsinline
                muted
              >
                <!-- missing asset <source src="/videos/graphene/productPage-header.webm" type="video/webm">-->
                <source
                  src="/videos/graphene/productPage-header.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          <div
            ref="blockquoteFirstWrapGraphene"
            class="relative left-0 right-0 top-0 mx-auto flex h-screen w-full max-w-3xl items-center justify-center px-3"
          >
            <blockquote
              ref="blockquoteFirstGraphene"
              class="text-center text-3xl font-semibold leading-tight lg:text-5xl"
            >
              <TextC :text="blok.text_1" />
            </blockquote>
          </div>

          <div
            ref="blockquoteSecondWrapGraphene"
            class="relative left-0 right-0 top-0 mx-auto flex h-screen w-full max-w-3xl items-center justify-center px-3"
          >
            <blockquote
              ref="blockquoteSecondGraphene"
              class="text-center text-3xl font-semibold leading-tight lg:text-5xl"
            >
              <TextC :text="blok.text_2" />
            </blockquote>
          </div>
        </div>
      </div>
    </div>
    <div v-if="blok.type === 'liquid'">
      <div
        :style="{ height: animateSequence_scrollLength + 100 + 'vh' }"
        ref="animationSequenceLiquid"
        class="relative mx-0 w-full p-0"
      >
        <div class="sticky top-0">
          <div class="flex h-screen flex-col overflow-y-hidden md:min-h-248">
            <div
              ref="heroLiquid"
              class="relative z-10 flex flex-col items-center justify-center pt-36 text-center"
            >
              <p
                ref="labelLiquid"
                class="mb-2 text-lg font-semibold uppercase text-yellow-900 opacity-0"
              >
                {{ blok.label }}
              </p>
              <h1
                ref="titleLiquid"
                class="mb-4 text-4xl font-semibold leading-none tracking-tight opacity-0 lg:text-6xlplus"
              >
                <TextC :text="blok.title" />
              </h1>
              <div
                ref="subtitleLiquid"
                class="mb-4 max-w-xl px-4 text-xl text-gray-500 opacity-0 lg:text-2xl"
                v-if="blok.subtitle"
              >
                {{ blok.subtitle }}
              </div>
              <div
                ref="buttonLiquid"
                class="pointer-events-auto mt-4 flex opacity-0"
                v-if="blok.items"
              >
                <ButtonItem
                  v-for="(item, index) in blok.items"
                  :key="index"
                  :blok="item"
                />
              </div>
            </div>

            <div
              ref="videoWrapLiquid"
              class="absolute left-0 right-0 top-0 z-0 mx-auto flex h-full w-full transform items-center justify-center"
            >
              <div v-if="isMobile" class="h-full w-full">
                <video
                  ref="videoLiquid"
                  src="/videos/liquid/productPage-header-mobile.mp4"
                  class="absolute left-0 top-0 block h-full w-full object-cover opacity-100"
                  playsinline
                  muted
                ></video>
                <img
                  ref="stillframeLiquidMobile"
                  class="absolute left-0 top-0 z-50 block h-full w-full object-cover opacity-0"
                  src="/images/productpage/animation-liquid/productpage-header-mobile.jpg"
                />
              </div>

              <div v-else class="h-full w-full">
                <video
                  ref="videoLiquid"
                  src="/videos/liquid/productPage-header.mp4"
                  class="block h-full w-full object-cover opacity-0"
                  playsinline
                  muted
                ></video>
                <img
                  ref="stillframeLiquid"
                  class="absolute left-0 top-0 z-50 block h-full w-full object-cover opacity-0"
                  src="/images/productpage/animation-liquid/productpage-header.jpg"
                />
              </div>
            </div>
          </div>

          <div
            ref="blockquoteFirstWrapLiquid"
            class="relative left-0 right-0 top-0 mx-auto flex h-screen w-full max-w-3xl items-center justify-center px-3"
          >
            <blockquote
              ref="blockquoteFirstLiquid"
              class="text-center text-3xl font-semibold leading-tight lg:text-5xl"
            >
              <TextC :text="blok.text_1" />
            </blockquote>
          </div>

          <div
            ref="blockquoteSecondWrapLiquid"
            class="relative left-0 right-0 top-0 mx-auto flex h-screen w-full max-w-3xl items-center justify-center px-3"
          >
            <blockquote
              ref="blockquoteSecondLiquid"
              class="text-center text-3xl font-semibold leading-tight lg:text-5xl"
            >
              <TextC :text="blok.text_2" />
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { preloadImages, calcDrawImage } from '../../../composables/helper'
import { IButtonItem } from '~~/types'
import { Richtext } from 'storyblok-js-client'
import TextC from '~~/components/TextC.vue'
import LinkC from '~~/components/LinkC.vue'
import ButtonItem from '~~/components/ButtonItem.vue'

gsap.registerPlugin(ScrollTrigger)
let animationContext: gsap.Context
let breakpoint: gsap.Conditions

const props = defineProps({
  blok: {
    type: Object as PropType<{
      type: 'zero' | 'liquid' | 'graphene'
      label: string
      title: string
      subtitle: string
      items: IButtonItem[]
      text_1: Richtext
      text_2: Richtext
      zero_items: {
        title: string
        text: string
      }[]
    }>,
    required: true,
  },
})

const { state } = useData()
const story = computed(() => state.value.story)

const animateKeyFrame_scrollLength = ref<number>(180)
const animateExplosion_scrollLength = ref<number>(280)
const animateSequence_scrollLength = ref<number>(300)

const canvasWrapperZero = ref(null)
const canvasContainerZero = ref(null)
const videoWrapLiquid = ref(null)
const videoWrapGraphene = ref(null)
const videoWrapZero = ref(null)
const videoZero = ref(null)
const videoGraphene = ref(null)
const videoLiquid = ref(null)
const labelZero = ref(null)
const labelGraphene = ref(null)
const labelLiquid = ref(null)
const titleZero = ref(null)
const titleLiquid = ref(null)
const titleGraphene = ref(null)
const subtitleZero = ref(null)
const subtitleLiquid = ref(null)
const subtitleGraphene = ref(null)
const buttonZero = ref(null)
const buttonLiquid = ref(null)
const buttonGraphene = ref(null)
const heroZero = ref(null)
const heroLiquid = ref(null)
const heroGraphene = ref(null)
const explosionZeroWrap = ref(null)
const explosionZero = ref(null)
const explosion1 = ref(null)
const explosion2 = ref(null)
const explosion3 = ref(null)
const explosionImages = ref(null)
const explosionText1 = ref(null)
const explosionText2 = ref(null)
const explosionText3 = ref(null)
const explosionText4 = ref(null)
const explosionLine1 = ref(null)
const explosionLine2 = ref(null)
const explosionLine3 = ref(null)
const explosionLine4 = ref(null)
const animationSequenceZero = ref(null)
const animationSequenceGraphene = ref(null)
const animationSequenceLiquid = ref(null)
const canvasZero = ref(null)
const blockquoteFirstZero = ref(null)
const blockquoteSecondZero = ref(null)

const blockquoteFirstGraphene = ref(null)
const blockquoteSecondGraphene = ref(null)

const blockquoteFirstLiquid = ref(null)
const blockquoteSecondLiquid = ref(null)
const blockquoteFirstWrapZero = ref(null)
const blockquoteSecondWrapZero = ref(null)
const blockquoteFirstWrapGraphene = ref(null)
const blockquoteSecondWrapGraphene = ref(null)

const blockquoteFirstWrapLiquid = ref(null)
const blockquoteSecondWrapLiquid = ref(null)

const stillframeLiquid = ref(null)
const stillframeLiquidMobile = ref(null)
const stillframeZero = ref(null)

const animationSequence = computed(() => {
  if (props.blok.type === 'zero') {
    return animationSequenceZero.value
  }
  if (props.blok.type === 'graphene') {
    return animationSequenceGraphene.value
  }
  return animationSequenceLiquid.value
})

const blockquoteFirst = computed(() => {
  if (props.blok.type === 'zero') {
    return blockquoteFirstZero.value
  }
  if (props.blok.type === 'graphene') {
    return blockquoteFirstGraphene.value
  }
  return blockquoteFirstLiquid.value
})

const blockquoteSecond = computed(() => {
  if (props.blok.type === 'zero') {
    return blockquoteSecondZero.value
  }
  if (props.blok.type === 'graphene') {
    return blockquoteSecondGraphene.value
  }
  return blockquoteSecondLiquid.value
})

const keyframeTime = computed(() => {
  if (props.blok.type === 'zero') {
    return 1.02
  }
  if (props.blok.type === 'graphene') {
    return 3
  }
  return 3.07
})

const heroAnimationTiming = computed(() => {
  if (props.blok.type === 'zero') {
    return '-=0.05'
  }
  if (props.blok.type === 'graphene') {
    return '-=0.05'
  }
  return '+=2.2'
})

const blockquoteFirstWrap = computed(() => {
  if (props.blok.type === 'zero') {
    return blockquoteFirstWrapZero.value
  }
  if (props.blok.type === 'graphene') {
    return blockquoteFirstWrapGraphene.value
  }
  return blockquoteFirstWrapLiquid.value
})

const blockquoteSecondWrap = computed(() => {
  if (props.blok.type === 'zero') {
    return blockquoteSecondWrapZero.value
  }
  if (props.blok.type === 'graphene') {
    return blockquoteSecondWrapGraphene.value
  }
  return blockquoteSecondWrapLiquid.value
})

const label = computed(() => {
  if (props.blok.type === 'zero') {
    return labelZero.value
  }
  if (props.blok.type === 'graphene') {
    return labelGraphene.value
  }
  return labelLiquid.value
})

const hero = computed(() => {
  if (props.blok.type === 'zero') {
    return heroZero.value
  }
  if (props.blok.type === 'graphene') {
    return heroGraphene.value
  }
  return heroLiquid.value
})

const title = computed(() => {
  if (props.blok.type === 'zero') {
    return titleZero.value
  }
  if (props.blok.type === 'graphene') {
    return titleGraphene.value
  }
  return titleLiquid.value
})

const subtitle = computed(() => {
  if (props.blok.type === 'zero') {
    return subtitleZero.value
  }
  if (props.blok.type === 'graphene') {
    return subtitleGraphene.value
  }
  return subtitleLiquid.value
})

const button = computed(() => {
  if (props.blok.type === 'zero') {
    return buttonZero.value
  }
  if (props.blok.type === 'graphene') {
    return buttonGraphene.value
  }
  return buttonLiquid.value
})

const videoWrap = computed(() => {
  if (props.blok.type === 'zero') {
    return videoWrapZero.value
  }
  if (props.blok.type === 'graphene') {
    return videoWrapGraphene.value
  }
  return videoWrapLiquid.value
})

const video = computed(() => {
  if (props.blok.type === 'zero') {
    return videoZero.value
  }
  if (props.blok.type === 'graphene') {
    return videoGraphene.value
  }
  return videoLiquid.value
})

const animateKeyFrame = (images: HTMLImageElement[]) => {
  const ctx = canvasZero.value.getContext('2d') as CanvasRenderingContext2D
  let canvasWidth: number
  let ratio: number
  let canvasHeight: number

  const onResize = () => {
    canvasWidth = video.value.clientWidth
    ratio = canvasWidth / images[0].width
    canvasHeight = images[0].height * ratio
    ctx.canvas.width = canvasWidth
    ctx.canvas.height = canvasHeight
  }
  onResize()
  window.addEventListener('resize', onResize)

  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: canvasWrapperZero.value,
        scrub: true,
        toggleActions: 'play none none reverse',
        start: 'top top',
        end: '+=1',
      },
    })
    .to(
      canvasZero.value,
      { y: () => video.value.getBoundingClientRect().top },
      '<'
    )
    .to(
      explosionImages.value,
      { y: () => video.value.getBoundingClientRect().top },
      '<'
    )
    .to(canvasContainerZero.value, { opacity: 1 })
    .to(videoWrap.value, { opacity: 0 })
    .to(canvasZero.value, { opacity: 1 })
    .to(stillframeZero.value, { opacity: 0 }, '<')

  tl.value = gsap.timeline({
    scrollTrigger: {
      trigger: canvasWrapperZero.value,
      scrub: 0.7,
      start: 'top top',
      end: () => '+=' + animateKeyFrame_scrollLength.value + '%',
    },
  })

  const counter = { i: 0 }

  tl.value.to(
    counter,
    {
      i: images.length - 1,
      roundProps: 'i',
      ease: 'none',
      immediateRender: true,
      onUpdate: () => calcDrawImage(ctx, images[counter.i]),
    },
    0
  )
}

const animateExplosion = () => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: explosionZeroWrap.value,
        scrub: true,
        fastScrollEnd: true,
        start: 'top top',
        end: '+=300',
      },
    })
    .fromTo(explosionZero.value, { opacity: 0 }, { opacity: 1 }, '+=0.1')
    .to(canvasZero.value, { opacity: 0 })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: explosionZeroWrap.value,
        scrub: 1,
        fastScrollEnd: true,
        start: 'top top',
        end: 'bottom bottom',
      },
    })

    .to(explosion2.value, { opacity: 0.3 }, '<')
    .to(explosion3.value, { opacity: 0.3 }, '<')
    .fromTo(
      explosionText1.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.08 },
      '<'
    )
    .fromTo(explosionText1.value, { x: -25 }, { x: 0 }, '<')
    .fromTo(explosionLine1.value, { x: 15 }, { x: 0 }, '<')
    .to(explosion1.value, { opacity: 0.3, duration: 0.08 })
    .fromTo(
      explosionText1.value,
      { opacity: 1 },
      { opacity: 0, duration: 0.08 },
      '<'
    )
    .to(explosion2.value, { opacity: 1, duration: 0.08 }, '<50%')
    .to(explosionText2.value, { opacity: 1, duration: 0.08 }, '<50%')
    .fromTo(explosionText2.value, { x: -25 }, { x: 0 }, '<')
    .fromTo(explosionLine2.value, { x: 15 }, { x: 0 }, '<')
    .to(explosionText3.value, { opacity: 1, duration: 0.08 }, '<')
    .fromTo(explosionText3.value, { x: 25 }, { x: 0 }, '<')
    .fromTo(explosionLine3.value, { x: -15 }, { x: 0 }, '<')
    .to(explosionText2.value, { opacity: 0, duration: 0.08 })
    .to(explosionText3.value, { opacity: 0, duration: 0.08 }, '<')
    .to(explosion3.value, { opacity: 1, duration: 0.08 })
    .fromTo(
      explosion2.value,
      { opacity: 1 },
      { opacity: 0.3, duration: 0.08 },
      '<'
    )
    .to(explosionText4.value, { opacity: 1, duration: 0.08 }, '<50%')
    .fromTo(explosionText4.value, { x: 25 }, { x: 0 }, '<')
    .fromTo(explosionLine4.value, { x: -15 }, { x: 0 }, '<')
    .to(explosion3.value, { opacity: 0.3, duration: 0.08 })
    .to(explosionText4.value, { opacity: 0, duration: 0.08 }, '<')
}

let offsetFromCenter: number = 0

const animateTextSequence = () => {
  const introTl = gsap.timeline({
    scrollTrigger: {
      trigger: animationSequence.value,
      scrub: 0.3,
      start: 'top top',
      end: 'bottom bottom',
    },
  })
  gsap.set([blockquoteFirstWrap.value, blockquoteSecondWrap.value], {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  })
  gsap.set([blockquoteFirst.value, blockquoteSecond.value], { opacity: 0 })

  introTl
    .fromTo(hero.value, { yPercent: 0 }, { yPercent: -15 })
    .fromTo(hero.value, { opacity: 1 }, { opacity: 0, duration: 0.08 }, '<20%')
    .to(videoWrap.value, { opacity: 0.35, y: () => offsetFromCenter }, '<')
  if (props.blok.type === 'zero') {
    introTl.fromTo(
      video.value,
      { opacity: 1 },
      { opacity: 0, duration: 0.35 },
      '<20%'
    )
    introTl.fromTo(
      stillframeZero.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.35 },
      '<'
    )
  }
  introTl
    .fromTo(
      blockquoteFirst.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.08 },
      '<50%'
    )
    .fromTo(blockquoteFirst.value, { yPercent: 35 }, { yPercent: -35 }, '<')
    .to(blockquoteFirst.value, { opacity: 0, duration: 0.08 }, '<50%')
    .fromTo(
      blockquoteSecond.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.08 }
    )
    .fromTo(blockquoteSecond.value, { yPercent: 35 }, { yPercent: -35 }, '<')
    .to(blockquoteSecond.value, { opacity: 0, duration: 0.08 }, '<50%')
  if (props.blok.type === 'graphene' || props.blok.type === 'liquid') {
    introTl.to(videoWrap.value, { opacity: 1, duration: 0.35 }, '<20%')
  } else {
    introTl.to(videoWrap.value, { opacity: 1 })
  }
}

const animateVideoEntrance = () => {
  if (!video.value) return

  video.value.onplay = () => {
    gsap.ticker.add(animUpdate)
  }

  const animUpdate = () => {
    if (video.value.currentTime >= keyframeTime.value) {
      gsap.ticker.remove(animUpdate)
      video.value.pause()
      if (props.blok.type === 'liquid') {
        gsap.to(stillframeLiquid.value, { opacity: 1, duration: 0.1 })
        breakpoint.isMobile &&
          gsap.to(stillframeLiquidMobile.value, { opacity: 1, duration: 0.1 })
      }
    }
  }

  const playVideo = () => {
    video.value.play()
  }

  const tl = gsap
    .timeline()
    .fromTo(
      video.value,
      { opacity: 0, scale: 1.2 },
      { opacity: 1, scale: 1, duration: 1 }
    )
    .add(playVideo, '<30%')
    .fromTo(
      label.value,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5 },
      heroAnimationTiming.value
    )
    .fromTo(
      title.value,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5 },
      '<10%'
    )
  if (subtitle.value) {
    tl.fromTo(
      subtitle.value,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5 },
      '<'
    )
  }
  if (button.value) {
    tl.fromTo(
      button.value,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5 },
      '<'
    )
  }
}

function calculateVerticalOffsetFromCenter(element) {
  const elementRect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight

  const elementCenterY = elementRect.top + elementRect.height / 2
  const windowCenterY = windowHeight / 2
  const verticalOffset = Math.abs(windowCenterY - elementCenterY)

  return elementCenterY > windowCenterY ? -verticalOffset : verticalOffset
}

const animate = async () => {
  if (!animationSequence.value) return
  let resizeHandler = gsap.matchMedia()
  ScrollTrigger.config({ ignoreMobileResize: true })
  let images: HTMLImageElement[]
  if (props.blok.type === 'zero') {
    const urls: string[] = []
    for (let i = 0; i < 54; i++) {
      urls.push(`/images/productpage/animation-zero/frame${i}.jpg`)
    }
    images = await preloadImages(urls)
  }

  resizeHandler.add(
    {
      isDesktop: `(min-width: 1024px)`,
      isMobile: `(max-width: 1023px)`,
    },
    (context) => {
      breakpoint = context.conditions as gsap.Conditions
      animationContext = gsap.context(() => {
        ScrollTrigger.refresh()
        if (breakpoint.isMobile) {
          animateKeyFrame_scrollLength.value = 90
          animateSequence_scrollLength.value = 150
          animateExplosion_scrollLength.value = 140
        } else {
          animateKeyFrame_scrollLength.value = 180
          animateExplosion_scrollLength.value = 280
          animateSequence_scrollLength.value = 300
        }

        setTimeout(
          () =>
            (offsetFromCenter = calculateVerticalOffsetFromCenter(video.value)),
          100
        )
        window.addEventListener('resize', () => {
          offsetFromCenter = calculateVerticalOffsetFromCenter(video.value)
        })

        if (props.blok.type === 'graphene' && breakpoint.isDesktop) {
          offsetFromCenter = offsetFromCenter - video.value.clientHeight / 6
        }
        if (props.blok.type === 'liquid') {
          offsetFromCenter = -window.innerHeight / 12
        }

        animateVideoEntrance()
        animateTextSequence()

        if (props.blok.type === 'zero') {
          animateKeyFrame(images)
          animateExplosion()
        }
      })
    }
  )
}

const isMobile = ref(false)

const mobileCheck = () => {
  isMobile.value = window.matchMedia('(max-width: 1023px)').matches
}

onMounted(() => {
  mobileCheck()
  window.addEventListener('resize', mobileCheck)
  animate()
})

onBeforeUnmount(() => {
  animationContext.revert()
  animationContext.kill()
})
</script>
