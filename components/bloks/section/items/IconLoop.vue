<template>
  <div
    id="container"
    class="relative left-1/2 right-1/2 -ml-half-screen -mr-half-screen h-52 w-screen overflow-x-hidden md:h-96"
  >
    <div id="row-1">
      <div class="absolute left-0" id="image-A-1">
        <ImageC
          class="w-full max-w-none"
          :fullSize="true"
          v-if="blok.items[0].filename"
          :src="blok.items[0].filename"
          :alt="blok.items[0].alt"
        />
      </div>
      <div class="absolute left-0" id="image-B-1">
        <ImageC
          class="w-full max-w-none"
          :fullSize="true"
          v-if="blok.items[0].filename"
          :src="blok.items[0].filename"
          :alt="blok.items[0].alt"
        />
      </div>
    </div>
    <div id="row-2">
      <div class="absolute left-0" id="image-A-2">
        <ImageC
          class="w-full max-w-none"
          :fullSize="true"
          v-if="blok.items[1].filename"
          :src="blok.items[1].filename"
          :alt="blok.items[1].alt"
        />
      </div>
      <div class="absolute left-0" id="image-B-2">
        <ImageC
          class="w-full max-w-none"
          :fullSize="true"
          v-if="blok.items[1].filename"
          :src="blok.items[1].filename"
          :alt="blok.items[1].alt"
        />
      </div>
    </div>
    <div id="row-3">
      <div class="absolute left-0" id="image-A-3">
        <ImageC
          class="w-full max-w-none"
          :fullSize="true"
          v-if="blok.items[2].filename"
          :src="blok.items[2].filename"
          :alt="blok.items[2].alt"
        />
      </div>
      <div class="absolute left-0" id="image-B-3">
        <ImageC
          class="w-full max-w-none"
          :fullSize="true"
          v-if="blok.items[2].filename"
          :src="blok.items[2].filename"
          :alt="blok.items[2].alt"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { ISectionIconLoop } from '~/types/section'
import { PropType, ref } from 'vue'
import ImageC from '~/components/ImageC.vue'

gsap.registerPlugin(ScrollTrigger)

const IMAGE_WIDTH = 2860

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionIconLoop>,
    required: true,
  },
})

const container = ref(null)

const timelines = ref([])
const scrollbarWidth = ref(0)
const imageWidth = ref(IMAGE_WIDTH)
const offsetY = ref(0)
const offsetX = ref(0)
const animDirection = ref(1)

const animateLoop = () => {
  props.blok.items.forEach((_, index) => {
    const num = index + 1
    const row = document.getElementById('row-' + num)
    const imageA = document.getElementById('image-A-' + num)
    const imageB = document.getElementById('image-B-' + num)
    scrollbarWidth.value = window.innerWidth - document.body.clientWidth - 7
    const tl = gsap.timeline({})

    const onResize = () => {
      animDirection.value = num === 2 ? -1 : 1 // if num is two go other direction
      gsap.set(row, { y: () => (num - 1) * offsetY.value })
      gsap.set(imageA, {
        x: () =>
          -imageWidth.value * animDirection.value -
          offsetX.value * animDirection.value,
        width: imageWidth.value,
      })
      gsap.set(imageB, { x: () => 0, width: imageWidth.value })
    }
    onResize()
    ScrollTrigger.addEventListener('refresh', onResize)

    timelines.value.push(tl)

    tl.to(row, {
      duration: 300,
      ease: 'none',
      invalidateOnRefresh: true,
      x: '+=' + imageWidth.value * animDirection.value,
      repeat: -1,
    })
  })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: container.value,
        scrub: 1,
        start: 'top center',
        end: '200% 90%',
      },
    })
    .to(timelines.value[0], { timeScale: 3 })
    .to(timelines.value[1], { timeScale: 2 })
    .to(timelines.value[2], { timeScale: 1 })
}

const setImageSizes = () => {
  ScrollTrigger.matchMedia({
    '(max-width: 768px)': () => {
      imageWidth.value = 1600
      offsetY.value = 66
      offsetX.value = 12
    },
    '(min-width: 769px)': () => {
      imageWidth.value = 2860
      offsetY.value = 120
      offsetX.value = 20
    },
  })
}

onMounted(() => {
  setImageSizes()
  animateLoop()
})
</script>
