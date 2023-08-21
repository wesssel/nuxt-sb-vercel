<template>
  <div v-if="story && settings">
    <Post
      :backText="settings.blog_back"
      :backLink="settings.blog_back_link"
      class="mb-32"
    />
    <Section :blok="relatedSection" />
  </div>
</template>

<script lang="ts" setup>
import Post from '@/components/Post.vue'
import { StoryData } from 'storyblok-js-client'
import { getDateString } from '~/utils/date'
import { unique } from '~/utils/array'
import { ISection, ISectionFeature } from '~/types/section'
import Section from '~~/components/bloks/section/index.vue'

const config = useRuntimeConfig()
const { actions, state, mutations } = useData()
const route = useRoute()

await actions.loadBlog({ slug: `post/${route.params.slug || ''}` })

// Load categories
await actions.loadBlogCategories({
  uuids: [state.value.story.content.category],
})

// load related academies
await actions.loadBlogsByCategory({
  categoryIds: [state.value.story.content.category],
  perPage: 2,
})

// Load authors
await actions.loadAuthors({
  uuids: [
    state.value.story.content.author,
    ...state.value.stories
      .map((story: StoryData) => story.content.author)
      .filter(unique),
  ],
})

const story = state.value.story
const settings = state.value.settings
const authorMap = state.value.authorMap
const categoryMap = state.value.categoryMap
const stories = state.value.stories

const relatedSection: ISection = {
  component: 'section',
  is_highlight: false,
  head_is_left: true,
  head_items: [],
  head_title: 'Related posts',
  head_subtitle: '',
  body_rows: [
    {
      component: 'section-row',
      cols: 2,
      is_feature_background: true,
      items: stories.map((st: StoryData): ISectionFeature => {
        const author = authorMap[st.content.author]?.name || ''
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
          label: categoryMap[st.content.category]?.name || '',
          subtitle: st.content.subtitle,

          bottom_text: `${author} - ${date}`,
          bottom_link_title: '',
          bottom_link: {},
          bottom_social_items: [],
        }
      }),
    },
  ],
  bottom_items: [],
}

useHead(
  state.value.story
    ? useSeoMeta(state.value.story, state.value.locale, authorMap)
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

<style scoped lang="scss"></style>
