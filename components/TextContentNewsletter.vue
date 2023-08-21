<template>
  <div class="">
    <Newsletter :isContentBlock="true" :blok="body.newsletter[0]" />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ISectionNewsletter } from '~~/types/section'
import Newsletter from './bloks/section/items/Newsletter.vue'

const props = defineProps({
  body: {
    type: Object as PropType<{
      newsletter: ISectionNewsletter
    }>,
    required: true,
  },
})
</script>
