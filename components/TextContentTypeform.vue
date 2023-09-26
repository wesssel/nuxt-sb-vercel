<template>
  <FormTypeform class="mb-10 mt-6" :blok="body" :isContainerEnabled="false" />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import FormTypeform from './bloks/form-typeform/index.vue'

const props = defineProps({
  body: {
    type: Object as PropType<{}>,
    required: true,
  },
})
</script>
