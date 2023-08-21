<template>
  <img
    v-if="src"
    :srcset="srcSet"
    :key="getSrcResized(width, height)"
    :src="isSVG ? src : getSrcResized(width, height)"
    :alt="altString"
    :loading="lazy ? 'lazy' : undefined"
    :width="forceWidth || width || undefined"
    :height="height || undefined"
  />
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  fullSize: {
    type: Boolean,
    default: false,
  },
  alt: {
    type: String,
  },
  height: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
  forceWidth: {
    type: Number,
  },
  lazy: {
    type: Boolean,
    default: true,
  },
})

const altString = computed(() => {
  if (props.alt) {
    return props.alt
  }

  return props.src.split('/').slice(-1)[0].split('.')[0]
})

const isSVG = computed(() => {
  return props.src.includes('.svg')
})

const srcSet = computed(() => {
  if (
    isSVG.value ||
    (props.height === 0 && props.width === 0) ||
    props.fullSize
  ) {
    return undefined
  }

  return [
    getSrcResized(props.width, props.height),
    `${getSrcResized(props.width * 1.5, props.height * 1.5)} 1.5x`,
    `${getSrcResized(props.width * 2, props.height * 2)} 2x`,
  ].join(', ')
})

function getSrcResized(width: number, height: number) {
  return `${props.src}/m/${width}x${height || 0}`
}
</script>
