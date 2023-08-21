<template>
  <Page />
</template>

<script lang="ts" setup>
import { StoryData } from 'storyblok-js-client'
import Page from '~~/components/Page.vue'

const { actions, state, mutations } = useData()
const config = useRuntimeConfig()

await actions.loadJob({ slug: 'overview' })

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
