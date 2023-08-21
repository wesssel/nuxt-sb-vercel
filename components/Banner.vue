<template>
  <div v-if="isVisible && settings">
    <div
      v-for="(banner, index) in settings.header_banner"
      :class="getVisibility(banner)"
      :style="getBgColor(banner)"
      :key="index"
      class="flex items-center justify-around py-2 md:justify-center"
    >
      <div
        v-for="(item, i) in banner.items"
        :key="i"
        class="relative mr-3 inline-flex flex-col items-center justify-center last:mr-0 sm:mr-12 md:flex-row lg:mr-24"
      >
        <LinkC
          :link="item.link"
          class="absolute top-0 left-0 h-full w-full"
          v-if="item.link && item.link.cached_url"
        ></LinkC>
        <ImageC
          class="mr-2 mb-2 max-h-4 md:mb-0"
          v-if="item.image.filename"
          :src="item.image.filename"
          :alt="item.image.alt"
          :lazy="false"
        />
        <TextC
          class="text-center text-xs md:text-sm"
          :class="isWhite ? 'text-gray-650' : 'text-gray-400'"
          :text="item.text"
        />
      </div>
      <button
        type="button"
        @click="closeBanner"
        class="absolute right-1 top-3 z-50 hidden h-5 w-5 cursor-pointer items-center justify-center md:flex"
      >
        <IconC
          id="closeSmall"
          class="h-full w-full opacity-50"
          :color="isWhite ? 'black' : 'white'"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, watch } from 'vue'
import LinkC from './LinkC.vue'
import ImageC from './ImageC.vue'
import TextC from './TextC.vue'
import IconC from './IconC.vue'

const props = defineProps({
  isWhite: {
    type: Boolean,
    default: false,
  },
})

const { state } = useData()
const settings = state.value.settings

const isVisible = ref(true)

const getVisibility = (banner: any) => {
  if (banner.visibility === 'Hidden') {
    return 'hidden'
  }
  if (banner.visibility === 'Mobile') {
    return 'flex md:hidden'
  }
  if (banner.visibility === 'Desktop') {
    return 'hidden md:flex'
  }
}

const closeBanner = () => {
  isVisible.value = !isVisible.value
}

const getBgColor = (banner: any) => {
  if (props.isWhite) {
    return {
      'background-color': banner.color_dark.color,
    }
  } else {
    return {
      'background-color': banner.color_light.color,
    }
  }
}
</script>
