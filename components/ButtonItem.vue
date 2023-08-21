<template>
  <Component
    :is="blok.is_copy ? 'div' : LinkC"
    :class="
      blok.is_secondary
        ? 'bg-white text-black hover:bg-gray-100'
        : 'bg-yellow-900 text-black  hover:bg-yellow-1000'
    "
    class="mr-4 cursor-pointer rounded py-3 px-6 text-base shadow"
    :link="blok.is_copy ? undefined : blok.link"
    @click="onCopy"
  >
    {{ isCopied ? settings.copy_complete : blok.text }}
  </Component>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref } from 'vue'
import { IButtonItem } from '~~/types'
import LinkC from '~~/components/LinkC.vue'

const isCopied = ref(false)

const { state } = useData()
const settings = computed(() => state.value.settings)

const props = defineProps({
  blok: {
    type: Object as PropType<IButtonItem>,
    required: true,
  },
})

const onCopy = async () => {
  if (props.blok.link.cached_url && props.blok.is_copy) {
    if (typeof window.navigator.share === 'function') {
      await navigator.share({
        title: document.title,
        url: props.blok.link.cached_url,
      })
      return
    }

    await copyToClipboard(props.blok.link.cached_url)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }
}
</script>
