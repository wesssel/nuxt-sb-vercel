<template>
  <div class="" v-if="story">
    <Intro :blok="blokIntro" :is-dark="true" />

    <Page />

    <Section :blok="section" />
  </div>
</template>

<script lang="ts" setup>
import { StoryData } from 'storyblok-js-client'
import { unique } from '~/utils/array'
import Intro from '~/components/bloks/intro/index.vue'
import Section from '~/components/bloks/section/index.vue'
import { ISectionFeature } from '~~/types/section'
import Page from '~~/components/Page.vue'

const config = useRuntimeConfig()
const route = useRoute()
const { actions, state, mutations } = useData()

const story = computed(() => state.value.story)
const stories = computed(() => state.value.stories)
const settings = computed(() => state.value.settings)
const authorMap = computed(() => state.value.authorMap)

await actions.loadAcademyCategory({
  slug: route.params.slug?.toString() || '',
})

await actions.loadAcademiesByCategory({
  categoryIds: [story.value?.uuid],
})

const blokIntro = computed(() => {
  return {
    is_dark: false,
    is_left: false,
    background_image: {},
    image: story.value?.content.image || {},
    label: '',
    title: story.value?.content.title,
    subtitle: story.value?.content.subtitle,
    items: [],
  }
})

const section = computed(() => {
  return {
    component: 'section',
    is_highlight: false,
    head_is_left: true,
    head_items: [],
    head_title: '',
    head_subtitle: '',
    body_rows: [
      {
        component: 'section-row',
        cols: 2,
        is_feature_background: true,
        items: stories.value.map((st: StoryData): ISectionFeature => {
          const authorName = authorMap.value[st.content.author]?.name || ''
          const date = getDateString(st.content.date)

          return {
            component: 'section-feature',
            link: {
              id: st.uuid,
              url: '',
              linktype: 'story',
              fieldtype: 'multilink',
              cached_url: st.full_slug,
            },
            image: st.content.image,
            title: st.name,
            label: story.value?.name || '',
            subtitle: st.content.subtitle,

            bottom_text: `${authorName} - ${date}`,
            bottom_link_title: '',
            bottom_link: {},
            bottom_social_items: [],
          }
        }),
      },
    ],
    bottom_items: [],
  }
})

useHead(
  state.value.story ? useSeoMeta(state.value.story, state.value.locale) : {}
)

onMounted(() => {
  if (config.public.VUE_IS_PREVIEW) {
    useStoryblokBridge(state.value.story.id, (evStory: StoryData<any>) => {
      mutations.setStory(state, evStory)
    })
  }
})
</script>

<style scoped lang="scss"></style>
