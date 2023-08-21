<template>
  <div class="mb-10 rounded bg-gray-100 p-10 lg:p-16">
    <div class="mb-8 text-xl leading-loose">{{ body.text }}</div>
    <div class="flex items-center">
      <div class="mr-4 w-6 bg-black" :style="{ height: '1px' }"></div>
      <span class="text-xl">{{ body.author }} </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  body: {
    type: Object as PropType<{
      text: string
      author: string
    }>,
  },
})
</script>
