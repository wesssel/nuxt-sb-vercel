<template>
  <div class="mb-12 flex justify-center">
    <LinkC :link="body.link">
      <ButtonC :text="body.text" />
    </LinkC>
  </div>
</template>

<script lang="ts" setup>
import { PropType, compile } from 'vue'
import { IStoryLink } from '~~/types'
import LinkC from './LinkC.vue'
import ButtonC from './ButtonC.vue'

const props = defineProps({
  body: {
    type: Object as PropType<{ text: string; link: IStoryLink }>,
    required: true,
  },
})
</script>
