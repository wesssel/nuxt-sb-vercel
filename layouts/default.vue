<template>
  <div
    class="relative block h-full font-sequel leading-tight"
    :class="[state.isDark ? 'bg-black text-white' : 'bg-gray-200']"
    :key="state.story?.full_slug"
  >
    <Loader />
    <Header />
    <main id="main" role="main" class="min-h-screen">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_LOCALE } from '../composables/use-data'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Loader from '../components/Loader.vue'
import { ISettings } from '../types'
import {
  ANIMATION_IMAGES,
  ANIMATION_IMAGE_LOADED,
  EventBus,
  LOADER_RESET,
  NUM_OF_ANIMATION_IMAGES_LOADED,
} from '~~/event-bus'

const route = useRoute()
const config = useRuntimeConfig()
const { state, actions, mutations } = useData()

const version = config.VUE_IS_PREVIEW ? 'draft' : 'published'

mutations.setVersion(state, version)

// load all locales (needed in [...slug])
if (state.value.locales.length === 0) {
  await actions.loadLocales()
}

const isLangChanges: boolean = route.params.locale !== state.value.locale

// set locale or default locale
mutations.setLocale(state, route.params.locale?.toString() || DEFAULT_LOCALE) // maybe use first locale instead

// only load settings if does not exist
if (isLangChanges || !state.value.settings || !state.value.settings._uid) {
  await actions.loadSettings()
}

// find redirect in settings
if (process.server && state.value.settings?.redirects) {
  const redirectFound = state.value.settings?.redirects.find(
    (redirect: ISettings['redirects'][0]) => redirect.from === route.path
  )

  // redirect if foound
  if (redirectFound) {
    navigateTo(redirectFound.to)
  }
}

onMounted(() => {
  let numLoadedImages: number = 0
  let totalAnimationImages: number = 0

  EventBus.$on(ANIMATION_IMAGE_LOADED, () => {
    numLoadedImages += 1
    EventBus.$emit(NUM_OF_ANIMATION_IMAGES_LOADED, {
      numLoadedImages,
      totalAnimationImages,
    })
  })

  EventBus.$on(LOADER_RESET, () => {
    numLoadedImages = 0
    totalAnimationImages = 0
  })

  EventBus.$on(ANIMATION_IMAGES, (numOfImages: number) => {
    totalAnimationImages += numOfImages
  })
  handleTouchScreen()
})

const handleTouchScreen = () => {
  if (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  ) {
    document.body.classList.add('touch')
  }
}
</script>

<style lang="scss">
@import url('../assets/scss/styles.scss');
</style>
