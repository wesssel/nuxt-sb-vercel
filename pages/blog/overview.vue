<template>
  <Page />
</template>

<script lang="ts" setup>
import { StoryblokComponent, StoryData } from 'storyblok-js-client'
import { unique } from '~/utils/array'
import { asyncForEach } from '~/utils/async-foreach'
import {
  BLOK_CATEGORY_CARDS,
  transformBlogCategories,
} from '~/utils/transformer'
import Page from '~~/components/Page.vue'

const config = useRuntimeConfig()
const { actions, state, mutations } = useData()

// const story = state.value.story
// const authorMap = state.value.authorMap
// const categoryMap = state.value.categoryMap
// const stories = state.value.stories

await actions.loadBlog({ slug: 'overview' })

const body: StoryblokComponent<string>[] = state.value.story.content.body

// Load data from category body
const categoryBloks = (body || []).filter(
  (blok) => blok.component === BLOK_CATEGORY_CARDS
)

// Load categories
await actions.loadBlogCategories({
  uuids: categoryBloks.map((blok) => (blok as any).category),
})

// Load blogs
// empty first stories because wil be concatenated with the blogs
mutations.setStories(state, [])
await asyncForEach(
  categoryBloks.map((blok) => (blok as any).category),
  async (categoryId: string) => {
    await actions.loadBlogsByCategory({
      categoryIds: [categoryId],
      perPage: 6,
      isStoriesConcat: true,
    })
  }
)

// Load authors
const authorUuids = state.value.stories
  .map((story: StoryData) => story.content.author)
  .filter(unique)

await actions.loadAuthors({
  uuids: authorUuids,
})

// set bloks
const bloks = transformBlogCategories(
  state.value.storyBody,
  state.value.categoryMap,
  state.value.authorMap,
  state.value.stories
)

mutations.setStoryBody(state, bloks)

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
