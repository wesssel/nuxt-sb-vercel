<template>
  <div v-if="typeof link === 'string'">
    <!-- Storyblok edge case send a string instead of object with link -->
    <slot />
  </div>
  <a
    v-else-if="isExternal"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
  <router-link v-else-if="link && link.cached_url" :to="`/${url}`">
    <slot></slot>
  </router-link>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { IStoryLink } from '~/types'
import urlShorter from '../utils/url-shorter'

const props = defineProps<{
  link: IStoryLink | undefined
}>()

const route = useRoute()
const { state } = useData()
const locale = state.value.locale

const url = computed(() => {
  const url = props.link?.cached_url

  if (isSectionQuery.value) {
    return `${route.path.replace('/', '')}${url}`
  }

  return urlShorter(url || '', locale)
})

const isExternal = computed(() => {
  return !isSectionQuery.value && !!props.link && props.link.linktype === 'url'
})

const isSectionQuery = computed(() => {
  return !!props.link?.cached_url.includes('?section')
})
</script>
