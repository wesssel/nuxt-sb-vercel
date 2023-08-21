<template>
  <div v-show="(isHome && !isMobile) || isZero">
    <div
      ref="loader"
      class="pointer-events-none fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black opacity-100"
    >
      <div
        ref="progressBar"
        class="absolute top-0 left-0 block h-1 bg-yellow-200"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { gsap } from 'gsap'
import {
  EventBus,
  NUM_OF_ANIMATION_IMAGES_LOADED,
  LOADER_RESET,
  LOADER_FINISHED,
} from '../event-bus'

const route = useRoute()
const { state } = useData()
const story = computed(() => state.value.story)
const locale = computed(() => state.value.locale)

const isHome = computed(
  () => story.value?.full_slug === `${locale.value}/page/`
)
const isZero = computed(() => route.params.slug === 'zero' || story.value?.slug === 'zero')

// useHead(
//   isHome.value || isZero.value
//     ? {
//         bodyAttrs: {
//           style: 'overflow: hidden;',
//         },
//         htmlAttrs: {
//           style: 'overflow: hidden;',
//         },
//       }
//     : {}
// )

const loader = ref<HTMLElement>()
const progressBar = ref<HTMLElement>()

const progressBarTimeline = ref()
const isMobile = ref(false)

const mobileCheck = () => {
  isMobile.value = window.matchMedia('(max-width: 1023px)').matches
}

const handleLoader = () => {
  if ((isHome.value && !isMobile.value) || isZero.value) {
    progressBarTimeline.value = gsap.timeline()

    EventBus.$on(
      NUM_OF_ANIMATION_IMAGES_LOADED,
      (data: { numLoadedImages: number; totalAnimationImages: number }) => {
        const { numLoadedImages, totalAnimationImages } = data

        progressBarTimeline.value.fromTo(
          progressBar.value,
          {
            width: ((numLoadedImages - 1) / totalAnimationImages) * 100 + '%',
          },
          {
            width: (numLoadedImages / totalAnimationImages) * 100 + '%',
            duration: 0.001,
          }
        )

        if (numLoadedImages >= totalAnimationImages) {
          EventBus.$emit(LOADER_FINISHED)
          document.body.style.overflow = ''
          document.documentElement.style.overflow = ''
          gsap.timeline().to(loader.value, { opacity: 0 })
        }
      }
    )
  } else {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }
}

const resetLoader = () => {
  progressBarTimeline.value?.fromTo(
    progressBar.value,
    { width: '0%' },
    { width: '0%' }
  )
}

onMounted(() => {
  mobileCheck()
  handleLoader()
})

watch(
  story,
  () => {
    mobileCheck()
    if ((isHome && !isMobile.value) || isZero) {
      resetLoader()
      handleLoader()
      EventBus.$emit(LOADER_RESET)
    }
  },
  { deep: true }
)

// @Component({
//   head() {
//     if ((this as any).isHome || (this as any).isZero) {
//       return {
//         bodyAttrs: {
//           style: 'overflow: hidden;',
//         },
//         htmlAttrs: {
//           style: 'overflow: hidden;',
//         },
//       }
//     }

//     return {}
//   },
// })
// export default class Loader extends Vue {
//   @Getter story!: StoryData
//   @Getter locale!: string

//   $refs!: {
//     loader: HTMLElement
//     progressBar: HTMLElement
//   }

//   progressBarTimeline: GSAPTimeline = gsap.timeline()
//   isMobile: boolean = false

//   get isHome(): boolean {
//     return this.story?.full_slug === `${this.locale}/page/`
//   }

//   get isZero(): boolean {
//     return this.$route.params.slug === 'zero'
//   }

//   mobileCheck() {
//     this.isMobile = window.matchMedia('(max-width: 1023px)').matches
//   }

//   handleLoader() {
//     if ((this.isHome && !this.isMobile) || this.isZero) {
//       EventBus.$on(
//         NUM_OF_ANIMATION_IMAGES_LOADED,
//         (numOfAnimationImagesLoaded: number, totalAnimationImages: number) => {
//           this.progressBarTimeline.fromTo(
//             this.$refs.progressBar,
//             {
//               width:
//                 ((numOfAnimationImagesLoaded - 1) / totalAnimationImages) *
//                   100 +
//                 '%',
//             },
//             {
//               width:
//                 (numOfAnimationImagesLoaded / totalAnimationImages) * 100 + '%',
//               duration: 0.001,
//             }
//           )
//           if (numOfAnimationImagesLoaded >= totalAnimationImages) {
//             EventBus.$emit(LOADER_FINISHED)
//             document.body.style.overflow = ''
//             document.documentElement.style.overflow = ''
//             gsap.timeline().to(this.$refs.loader, { opacity: 0 })
//           }
//         }
//       )
//     } else {
//       document.body.style.overflow = ''
//       document.documentElement.style.overflow = ''
//     }
//   }

//   resetAnimation() {
//     this.progressBarTimeline.kill()
//     if (this.$refs.progressBar && this.$refs.loader) {
//       gsap.set(this.$refs.progressBar, { clearProps: 'all' })
//       gsap.set(this.$refs.loader, { clearProps: 'all' })
//     }
//   }

//   mounted() {
//     this.mobileCheck()
//     this.handleLoader()
//   }

//   @Watch('$route', { deep: true })
//   onUrlChange() {
//     if ((this.isHome && !this.isMobile) || this.isZero) {
//       this.resetAnimation()
//       this.handleLoader()
//       EventBus.$emit(LOADER_RESET)
//     }
//   }
// }
</script>
