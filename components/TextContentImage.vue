<template>
  <LinkC class="mx-auto mb-10 block" :link="body.link">
    <ImageC
      class="rounded"
      :src="body.image.filename"
      :alt="body.image.alt"
      :width="840"
    />
    <div v-if="body.title" class="mt-2 text-sm leading-tight text-gray-600">
      {{ body.title }}
    </div>
  </LinkC>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IStoryAsset, IStoryLink } from '~/types'
import ImageC from './ImageC.vue'
import LinkC from './LinkC.vue'

const props = defineProps({
  body: {
    type: Object as PropType<{
      image: IStoryAsset
      title: string
      link: IStoryLink
    }>,
    required: true,
  },
})
</script>
