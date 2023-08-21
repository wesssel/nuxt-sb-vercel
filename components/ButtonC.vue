<template>
  <button
    class="mr-4 rounded px-6 text-base text-black shadow hover:bg-yellow-1000"
    :class="[themeClassnames, isLoading ? 'py-1' : 'py-4']"
    type="button"
  >
    <IconC
      v-if="isLoading"
      id="loading"
      color="#fff"
      class="mx-auto h-11 w-11"
    />
    {{ isLoading ? '' : text }}
  </button>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import IconC from './IconC.vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isOutlined: {
    type: Boolean,
    default: false,
  },
})

const themeClassnames = computed(() => {
  if (props.isDisabled) {
    return 'bg-gray-700 text-gray-200 border-gray-600 pointer-events-none opacity-30'
  }

  return [
    'border-yellow-700',
    props.isOutlined ? 'text-yellow-700' : 'text-black bg-yellow-700',
  ]
})
</script>
