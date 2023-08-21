<template>
  <div class="mb-10 mt-6">
    <iframe
      width="100%"
      height="360"
      :src="body.embed_url"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  body: {
    type: Object as PropType<{
      embed_url: string
    }>,
    required: true,
  },
})
</script>
