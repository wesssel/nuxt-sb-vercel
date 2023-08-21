<template>
  <Page />
</template>

<script lang="ts" setup>
import { StoryData } from 'storyblok-js-client'
import Page from '../components/Page.vue'

const route = useRoute()
const config = useRuntimeConfig()
const { actions, mutations, state } = useData()

let slug = route.params.slug?.toString() || ''

// sometimes the _slug can be the road of the not default language
if (state.value.locales.map((locale: any) => locale.value).includes(slug)) {
  mutations.setLocale(state, slug)

  // set slug to empty because it's root
  slug = ''
}

if (slug && state.value.locales.includes(slug)) {
  await actions.loadPage({ slug: `${slug}/home` })
} else if (slug.includes('page')) {
  await actions.loadStory({ path: route.path })
} else {
  await actions.loadPage({ slug: slug || '' })
}

const story = computed(() => state.value.story)
const locale = computed(() => state.value.locale)

useHead(story.value ? useSeoMeta(story.value, locale.value) : {})

onMounted(() => {
  if (config.public.VUE_IS_PREVIEW) {
    useStoryblokBridge(story.value.id, (evStory: StoryData<any>) => {
      mutations.setStory(state, evStory)
    })
  }
})
</script>
