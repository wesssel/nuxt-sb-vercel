<template>
  <div v-if="isOpen" class="absolute w-full px-5 py-5 md:p-0 md:py-12">
    <div
      class="fixed left-1/2 z-30 mx-auto w-11/12 -translate-x-1/2 transform overflow-scroll rounded-lg bg-white py-8 px-5 md:w-full md:max-w-2xl md:py-20 md:px-14"
      :style="{ height: '80vh', top: '10vh' }"
    >
      <button
        type="button"
        @click="closeModal"
        class="absolute right-6 top-6 z-40 cursor-pointer"
      >
        <IconC id="close" />
      </button>
      <slot />
      <TextC v-if="text" class="text-black" :text="text" />
    </div>
    <div
      @click="closeModal"
      class="modal-bg fixed left-0 top-0 z-10 h-screen w-screen cursor-pointer bg-black/82"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Richtext } from 'storyblok-js-client'
import TextC from './TextC.vue'
import IconC from './IconC.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  text: {
    type: Object as PropType<Richtext>,
    required: false,
  },
})

const emit = defineEmits(['close'])

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }
)

const closeModal = () => {
  emit('close')
}
</script>
