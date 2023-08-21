<template>
  <div v-if="story">
    <Intro :blok="blokIntro" />
    <Breadcrumbs
      class="mb-12"
      :text="story.content.back_text"
      :link="story.content.back_link"
    />

    <MiniCardList :blok="cards" :key="currentPage" />

    <Pagination
      v-if="paginationItems"
      :items="paginationItems"
      :currentIndex="currentPage - 1"
    />
  </div>
</template>

<script lang="ts" setup>
import { getDateString } from '../../utils/date'
import { range, unique } from '~/utils/array'
import { IStoryLink } from '~/types'
import { StoryData } from 'storyblok-js-client'
import Intro from '~~/components/bloks/intro/index.vue'
import Breadcrumbs from '~~/components/Breadcrumbs.vue'
import Pagination from '~~/components/Pagination.vue'
import MiniCardList from '~~/components/bloks/mini-card-list/index.vue'

const { actions, state } = useData()
const route = useRoute()
const router = useRouter()

await actions.loadPress({ slug: 'archieve' })

// Load press posts
await actions.loadPressList({
  page: parseInt(route.params.page?.toString() || '1'),
})

// Load authors
const authorUuids = state.value.stories
  .map((story: StoryData) => story.content.author)
  .filter(unique)

await actions.loadAuthors({
  uuids: authorUuids,
})

const story = state.value.story

const currentPage = ref<number>(parseInt(route.params.page?.toString()) || 1)

watch(currentPage, () => {
  actions.loadBlogList({
    page: parseInt(route.params.page?.toString() || '1'),
    categoryId: route.query.category,
  })
})

watch(
  () => route.params,
  (params) => {
    if (params.page) {
      currentPage.value = parseInt(params.page?.toString())
      window.scrollTo({ top: 0 })
    }
  }
)

const paginationItems = computed(() => {
  const totalPages = state.value.storiesTotal / state.value.storiesPerPage

  if (totalPages < 1) {
    return []
  }

  return range(Math.ceil(totalPages)).map((_, index) => {
    const num = index + 1

    return {
      link: `/blog/archieve/${num === 0 ? '' : num}`,
      text: num,
    }
  })
})

const blokIntro = {
  is_dark: false,
  is_left: false,
  background_image: {},
  image: story?.content.image || {},
  label: '',
  title: story?.content.title,
  subtitle: story?.content.subtitle,
  items: [],
}

const cards = computed(() => ({
  is_dark: true,
  items: state.value.stories.map((st) => {
    const category = state.value.categoryMap[st.content.category]?.name || ''
    const author = state.value.authorMap[st.content.author]?.name || ''
    const date = getDateString(st.content.date)
    const link: IStoryLink = {
      id: st.uuid,
      url: '',
      linktype: 'story',
      fieldtype: 'multilink',
      cached_url: st.full_slug,
    }

    return {
      text: st.content.subtitle,
      image: st.content.image,
      title: st.name,
      overline: category,
      subtitle: `${author} - ${date}`,
      link,
    }
  }),
}))

useHead(
  state.value.story ? useSeoMeta(state.value.story, state.value.locale) : {}
)
</script>

<style scoped lang="scss"></style>
