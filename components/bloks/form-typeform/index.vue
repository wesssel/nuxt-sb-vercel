<template>
  <div :class="{ 'container md:my-24': isContainerEnabled }">
    <div
      :data-tf-widget="blok.widget_id"
      data-tf-opacity="100"
      :data-tf-iframe-props="blok.iframe_props"
      data-tf-transitive-search-params
      data-tf-medium="snippet"
      :style="{
        width: '100%',
        height: `${blok.height}px`,
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const TYPEFORM_URL = '//embed.typeform.com/next/embed.js'

const props = defineProps({
  blok: {
    type: Object as PropType<{
      height: string // like '900'
      widget_id: string // like 'ipNtEc9f'
      iframe_props: string // like 'title=Test for TakeIt'
    }>,
    required: true,
  },
  isContainerEnabled: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})

onMounted(() => {
  if (document.querySelector(`script[src="${TYPEFORM_URL}"]`)) return

  const script = document.createElement('script')
  script.src = TYPEFORM_URL
  script.async = true
  document.body.appendChild(script)
})
</script>
