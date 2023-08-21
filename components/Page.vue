<template>
  <section v-if="story">
    <!-- Intro -->
    <Intro
      v-editable="intro"
      :key="JSON.stringify(intro)"
      v-if="intro && intro.component === 'intro'"
      :blok="intro"
    />
    <IntroText
      v-editable="intro"
      :key="JSON.stringify(intro)"
      v-if="intro && intro.component === 'intro-text'"
      :blok="intro"
    />
    <IntroAnimation
      v-editable="intro"
      :key="JSON.stringify(intro)"
      v-if="intro && intro.component === 'intro-animation'"
      :blok="intro"
    />
    <IntroHome
      v-editable="intro"
      :key="JSON.stringify(intro)"
      v-if="intro && intro.component === 'intro-home'"
      :blok="intro"
    />

    <!-- Body -->
    <div v-for="(blok, index) in storyBody" :key="i">
      <LazyHydrate :when-visible="true">
        <Intro
          v-editable="blok"
          v-if="blok.component === 'intro'"
          :blok="blok"
        />
        <IntroText
          v-editable="blok"
          v-if="blok.component === 'intro-text'"
          :blok="blok"
        />
        <IntroAnimation
          v-editable="blok"
          v-if="blok.component === 'intro-animation'"
          :blok="blok"
        />
        <IntroHome
          v-editable="blok"
          v-if="blok.component === 'intro-home'"
          :blok="blok"
        />

        <Section
          v-if="blok.component === 'section'"
          :blok="blok"
          :id="`section-${index}`"
          v-editable="storyBody[index]"
        />
        <TextContent
          v-else-if="blok.component === 'text-content'"
          :blok="blok"
          :id="`section-${index}`"
          v-editable="storyBody[index]"
        />
        <CardCarousel
          v-else-if="blok.component === 'card-carousel'"
          :blok="blok"
          :id="`section-${index}`"
          v-editable="storyBody[index]"
        />
        <CardGrid
          v-else-if="blok.component === 'card-grid'"
          :blok="blok"
          :id="`section-${index}`"
          v-editable="storyBody[index]"
        />
        <TestiomnialCarousel
          v-else-if="blok.component === 'testimonial-carousel'"
          :blok="blok"
          :id="`section-${index}`"
          v-editable="storyBody[index]"
        />
        <MiniCardGrid
          v-else-if="blok.component === 'mini-card-grid'"
          :blok="blok"
          :id="`section-${index}`"
          v-editable="storyBody[index]"
        />
        <TimeLine
          v-else-if="blok.component === 'timeline'"
          :blok="blok"
          :id="`section-${index}`"
          v-editable="storyBody[index]"
        />
        <BuyCard
          v-else-if="blok.component === 'buy-card'"
          :blok="blok"
          :id="`section-${index}`"
          v-editable="storyBody[index]"
        />
        <IconCloud
          v-else-if="blok.component === 'icon-cloud'"
          :blok="blok"
          :id="`section-${index}`"
          v-editable="storyBody[index]"
        />
        <TechnicalSpecifications
          v-else-if="blok.component === 'technical-specifications'"
          :blok="blok"
          :id="`section-${index}`"
          v-editable="storyBody[index]"
        />
      </LazyHydrate>
    </div>
  </section>
</template>

<script lang="ts" setup>
import LazyHydrate from './LazyHydrate.vue'
const { state } = useData()

const story = state.value.story
const storyBody = state.value.storyBody
const intro = story?.content.intro ? story?.content.intro[0] : null

const Intro = defineAsyncComponent(() => import('./bloks/intro/index.vue'))
const IntroText = defineAsyncComponent(
  () => import('./bloks/intro-text/index.vue')
)
const IntroAnimation = defineAsyncComponent(
  () => import('./bloks/intro-animation/index.vue')
)
const IntroHome = defineAsyncComponent(
  () => import('./bloks/intro-home/index.vue')
)
const Section = defineAsyncComponent(() => import('./bloks/section/index.vue'))
const TextContent = defineAsyncComponent(
  () => import('./bloks/text-content/index.vue')
)
const CardCarousel = defineAsyncComponent(
  () => import('./bloks/card-carousel/index.vue')
)
const CardGrid = defineAsyncComponent(
  () => import('./bloks/card-grid/index.vue')
)
const TestiomnialCarousel = defineAsyncComponent(
  () => import('./bloks/testimonial-carousel/index.vue')
)
const MiniCardGrid = defineAsyncComponent(
  () => import('./bloks/mini-card-grid/index.vue')
)
const TimeLine = defineAsyncComponent(
  () => import('./bloks/timeline/index.vue')
)
const BuyCard = defineAsyncComponent(() => import('./bloks/buy-card/index.vue'))
const IconCloud = defineAsyncComponent(
  () => import('./bloks/icon-cloud/index.vue')
)
const TechnicalSpecifications = defineAsyncComponent(
  () => import('./bloks/section/items/TechnicalSpecifications.vue')
)

const route = useRoute()

const watchQuery = () => {
  const section = route.query.section

  if (section) {
    const $section = document.getElementById(`section-${section.toString()}`)
    const $header = document.querySelector('header')

    if ($section === null) {
      return
    }

    setTimeout(() => {
      window.scrollTo({
        top: $section.offsetTop - ($header?.clientHeight || 0),
      })
    })
  }
}

onMounted(() => {
  watchQuery()
})

watch(route.query, () => {
  watchQuery()
})
</script>
