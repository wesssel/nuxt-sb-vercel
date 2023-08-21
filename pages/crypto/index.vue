<template>
  <div class="container" v-if="story">
    <Intro :blok="story.content.intro[0]" v-if="story.content.intro[0]" />

    <div class="w-xs relative mx-auto mb-12 md:mb-20 md:w-160">
      <div class="absolute top-4 right-4">
        <IconC id="search" />
      </div>
      <input
        v-model="query"
        id="search-query"
        name="search-query"
        type="text"
        :placeholder="story.content.search_placeholder"
        class="block w-full w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
    <p v-if="dataSourcesFiltered.length === 0" class="text-center text-2xl">
      {{ story.content.search_empty }}
    </p>

    <div class="mb-20 grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-6">
      <div
        class="flex flex-col"
        v-for="item in dataSourcesFiltered"
        :key="item.id"
      >
        <div class="mb-2 rounded-lg bg-white p-6">
          <img
            class="w-44"
            :src="`/images/icons/${item.name.toLocaleLowerCase()}.svg`"
            :alt="item.value"
          />
        </div>
        <span class="text-lg font-semibold">{{ item.value }}</span>
        <span class="text-lg text-gray-500">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconC from '~~/components/IconC.vue'
import Intro from '../../components/bloks/intro/index.vue'
import { StoryData } from 'storyblok-js-client'

const config = useRuntimeConfig()
const { actions, state, mutations } = useData()

await actions.loadCryptoPage()
await actions.loadCryptoCoins()

const story = computed(() => state.value.story)
const dataSources = computed(() => state.value.dataSources)

const query = ref('')

const dataSourcesFiltered = computed(() => {
  if (query.value === '') {
    return dataSources.value
  }

  return dataSources.value.filter(
    (source) =>
      source.value.toLocaleLowerCase().includes(query.value) ||
      source.name.toLocaleLowerCase().includes(query.value)
  )
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
