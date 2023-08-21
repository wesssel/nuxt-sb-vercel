<template>
  <div class="mb-10 flex justify-center">
    <blockquote class="twitter-tweet" v-if="body.type === 'twitter'">
      <a :href="body.url">url: {{ body.url }}</a>
    </blockquote>

    <iframe
      v-if="body.type === 'spotify'"
      :src="body.url"
      width="100%"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    >
    </iframe>

    <iframe
      v-if="body.type === 'apple-music'"
      :src="body.url"
      class="w-full"
      allow="autoplay *; encrypted-media *;"
      frameborder="0"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
    >
    </iframe>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

onMounted(() => {
  // insert twitter script if not already loaded

  const SCRIPT_SRC = 'https://platform.twitter.com/widgets.js'

  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
    return
  }

  const script = document.createElement('script')
  script.setAttribute('src', SCRIPT_SRC)
  script.setAttribute('async', 'true')
  document.head.appendChild(script)
})

const props = defineProps({
  body: {
    type: Object as PropType<{
      type: 'twitter' | 'spotify' | 'apple-music'
      url: string
    }>,
    required: true,
  },
})
</script>
