<template>
  <div class="mb-12 rounded border border-gray-300 bg-gray-250 p-4 md:p-6">
    <h3 class="mb-2 font-bold text-gray-800">{{ body.title }}</h3>
    <ul class="list-disc pl-4">
      <li
        v-for="(post, postIndex) in body.posts"
        :key="postIndex"
        class="mb-3 pl-4 text-gray-800"
      >
        <router-link :to="`/${post.full_slug}`" class="text-blue-400 underline">
          {{ post.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IStoryLink } from '~~/types'

const props = defineProps({
  body: {
    type: Object as PropType<{
      title: string
      posts: IStoryLink[]
    }>,
    required: true,
  },
})
</script>
