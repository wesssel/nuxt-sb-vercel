<template>
  <div class="">
    <div class="container">
      <div class="flex h-20 justify-between border-b border-gray-700 sm:h-12">
        <LinkC class="flex h-20 items-center px-2 sm:h-12" :link="link">
          <IconC
            id="arrowLeft"
            class="mr-2"
            :color="state.isDark ? '#fff' : '#000'"
          />
          <div class="hidden md:block">
            {{ text }}
          </div>
        </LinkC>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import LinkC from './LinkC.vue'
import IconC from './IconC.vue'

const { state } = useData()
// const isDark = computed(() => state.value.isDark)

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: Object as PropType<{ linktype: string; url: string }>,
    required: true,
  },
})
</script>
