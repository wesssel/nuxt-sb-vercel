<template>
  <ImageC
    v-if="blok.image.filename"
    :src="blok.image.filename"
    :alt="blok.image.alt"
    :width="imageWidth"
    class="w-full"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ISectionImage } from '~/types/section'
import ImageC from '~~/components/ImageC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionImage>,
    required: true,
  },
  imageWidth: {
    type: Number,
    default: 358,
  },
})
</script>
