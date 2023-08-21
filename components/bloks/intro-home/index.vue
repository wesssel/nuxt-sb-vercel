<template>
  <div
    class="relative overflow-hidden bg-black pt-32 text-white md:pt-40"
    :class="{ 'h-home': blok.logo_grid[0] }"
  >
    <div class="container">
      <div class="mb-104 md:mb-65/100">
        <!-- <p
          v-if="blok.headline_1"
          id="label"
          class="relative z-30 mb-2 origin-center text-center text-lg font-semibold uppercase text-yellow-900 opacity-0"
        >
          {{ blok.headline_1 }}
        </p> -->
        <h1
          v-show="isLoaded"
          id="title"
          class="header-title tracking-tightmd:mb-0 relative z-30 mb-10 mt-10 origin-center text-center text-4xl font-semibold leading-none lg:text-6xlplus"
        >
          {{ blok.headline_2 }}
        </h1>
        <div>
          <div
            class="gradient pointer-events-none absolute left-0 top-0 z-20 hidden h-52 w-full md:block"
          ></div>
          <!-- render only on desktop -->
          <div
            :style="{ maxWidth: '1600px' }"
            class="y-20 absolute left-0 right-0 top-1/4 z-0 mx-auto -mt-1 flex h-auto w-screen transform md:top-14 xl:top-0"
          >
            <video
              v-show="isMobile"
              id="videoMobile"
              class="h-full w-full object-cover opacity-0"
              playsinline
              muted
            >
              <source
                src="/videos/home/header-intro-mobile.mp4"
                type="video/mp4"
              />
            </video>
            <video
              v-show="!isMobile"
              id="video"
              class="h-full w-full object-cover opacity-0"
              playsinline
              muted
            >
              <source src="/videos/home/header-intro.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            :style="{ maxWidth: '1600px' }"
            class="y-0 absolute left-0 right-0 top-1/4 z-10 mx-auto -mt-1 flex h-auto w-screen transform md:top-14 xl:top-0"
          >
            <video
              v-show="isMobile"
              id="videoLoopMobile"
              playsinline
              loop
              muted
              class="h-full w-full object-cover opacity-0"
            >
              <source
                src="/videos/home/header-loop-mobile.mp4"
                type="video/mp4"
              />
            </video>
            <video
              v-show="!isMobile"
              id="videoLoop"
              playsinline
              loop
              muted
              class="h-full w-full object-cover opacity-0"
            >
              <source src="/videos/home/header-loop.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div class="relative z-20 mb-0 sm:mx-auto sm:max-w-3xl sm:px-4">
        <div class="absolute top-0 left-0 h-full w-full blur-4xl filter"></div>
        <TextContent
          class="relative"
          v-editable="blok.text"
          :blok="blok.text[0]"
          :isTransparent="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { StoryblokComponent } from 'storyblok-js-client'
import { PropType } from 'vue'
import { gsap } from 'gsap'
import { EventBus, LOADER_FINISHED } from '~/event-bus'
import TextContent from '../text-content/index.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<{
      headline_1: string
      headline_2: string
      text: StoryblokComponent<string>[]
      logo_grid: StoryblokComponent<string>[]
    }>,
    required: true,
  },
})

const isMobile = ref(false)
const isLoaded = ref(false)

onBeforeUnmount(() => {
  const videoLoop = document.querySelector<HTMLVideoElement>('[id="videoLoop"]')

  videoLoop?.pause()
})

const mobileCheck = () => {
  isMobile.value = window.matchMedia('(max-width: 1023px)').matches
}

onMounted(() => {
  isLoaded.value = true
  const video =
    isMobile.value === false
      ? document.querySelector<HTMLVideoElement>('[id="video"]')
      : document.querySelector<HTMLVideoElement>('[id="videoMobile"]')
  const videoLoop =
    isMobile.value === false
      ? document.querySelector<HTMLVideoElement>('[id="videoLoop"]')
      : document.querySelector<HTMLVideoElement>('[id="videoLoopMobile"]')
  const title = document.querySelector('[id="title"]')

  if (!video || !title || !videoLoop) {
    return
  }

  const VIDEO_TIME_SECONDS_FIRST = 0.5

  if (!isMobile) {
    EventBus.$on(LOADER_FINISHED, () => {
      if (video) {
        video.play()
      }
    })
  } else {
    video.play()
  }

  video.onplay = () => {
    if (video) {
      gsap.ticker.add(checkTime)
      gsap.ticker.add(checkEnd)
      gsap.fromTo(video, { opacity: 0 }, { opacity: 1 })
    }
  }

  const heroTL = gsap.timeline()
  const loopTl = gsap.timeline()

  const checkTime = () => {
    if (video && video.currentTime >= VIDEO_TIME_SECONDS_FIRST) {
      heroTL.play()
      gsap.ticker.remove(checkTime)
    }
  }

  const checkEnd = () => {
    if (video && videoLoop && video?.currentTime >= video?.duration - 0.3) {
      gsap.ticker.remove(checkEnd)
      videoLoop.play()
      loopTl.play()
    }
  }

  heroTL
    .pause()
    .fromTo(
      title,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1 },
      '<70%'
    )

  loopTl.pause().to(videoLoop, { opacity: 1, duration: 0.3 })
})
</script>

<style scoped>
/* To do: add tailwind gradient class  */
.gradient {
  background: linear-gradient(180deg, rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%);
}
</style>
