<template>
  <div v-if="settings">
    <Post
      :backText="settings.press_back"
      :backLink="settings.press_back_link"
      class="mb-32"
    />
  </div>
</template>

<script lang="ts" setup>
import { StoryData } from 'storyblok-js-client'
import Post from '~~/components/Post.vue'

const config = useRuntimeConfig()
const { state, actions, mutations } = useData()
const route = useRoute()

const settings = computed(() => state.value.settings)

await actions.loadPress({ slug: `post/${route.params.slug || ''}` })
await actions.loadAuthors({ uuids: [state.value.story.content.author] })

useHead(
  state.value.story
    ? useSeoMeta(state.value.story, state.value.locale, state.value.authorMap)
    : {}
)

onMounted(() => {
  if (config.public.VUE_IS_PREVIEW) {
    useStoryblokBridge(state.value.story.id, (evStory: StoryData<any>) => {
      mutations.setStory(state, evStory)
    })
  }
})
</script>
