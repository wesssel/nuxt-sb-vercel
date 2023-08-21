<template>
  <div class="" :class="{ 'bg-black text-white': state.isDark && !isTransparent }">
    <div
      class="break-words pb-20 text-xl leading-normal sm:leading-relaxed lg:px-0 lg:pb-40"
      :class="[
        blok.is_text_white ? 'text-white' : 'text-gray-800',
        isNoPadding ? '' : ' px-4 sm:mx-auto sm:max-w-3xl',
      ]"
    >
      <TextC :applyStyles="true" :text="blok.text" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Richtext } from 'storyblok-js-client'
import { PropType } from 'vue'
import TextC from '~~/components/TextC.vue'

const props = defineProps({
  isTransparent: {
    type: Boolean,
    default: false,
  },
  isNoPadding: {
    type: Boolean,
    default: false,
  },
  blok: {
    type: Object as PropType<{
      text: Richtext
      is_text_white: boolean
    }>,
    required: true,
  },
})

const { state } = useData()

// const state.isDark = computed(() => state.value.state.isDark)
</script>

<style lang="scss" scoped>
::v-deep {
  // margin in plugins/rich-text-renderer.ts caused to many problems
  p {
    margin-bottom: 3rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
