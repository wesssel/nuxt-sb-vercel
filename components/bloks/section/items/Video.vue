<template>
  <div class="w-full py-8 sm:py-20 md:container">
    <div
      class="group relative h-screen w-full cursor-pointer overflow-hidden md:h-160 md:rounded-xl"
      @click="onimage"
    >
      <IconC
        id="play"
        class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform"
        :class="{ invisible: !isImageShown }"
        color="#fff"
      />
      <div
        class="absolute bottom-12 left-8 z-10 max-w-3xl text-2xl font-semibold lg:left-12 lg:text-4xl"
        :class="[
          { invisible: !isImageShown },
          blok.is_dark ? 'text-white' : 'text-black',
        ]"
      >
        {{ blok.title }}
      </div>
      <figure
        class="item-center change-transform absolute top-0 flex h-screen justify-center overflow-hidden object-cover md:h-160 lg:rounded-xl"
        :class="{ invisible: !isImageShown }"
        v-if="blok.placeholder_image && blok.placeholder_image.filename"
      >
        <ImageC
          v-if="blok.placeholder_image.filename"
          class="ease h-full w-full transform object-cover saturate-70 filter transition-all duration-250 group-hover:scale-102 group-hover:saturate-100 lg:rounded-lg"
          :src="blok.placeholder_image.filename"
          :alt="blok.placeholder_image.alt"
          :width="1136"
        />
      </figure>
      <iframe
        v-if="blok.embed_url && !isImageShown"
        class="h-screen w-full md:h-160"
        :src="`${blok.embed_url}?autoplay=1`"
        frameborder="0"
        autoplay
      />
      <video
        ref="video"
        v-if="blok.video.filename"
        class="h-screen w-full md:h-160"
        controls
        :src="blok.video.filename"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ISectionVideo } from '~/types/section'
import IconC from '~~/components/IconC.vue'
import ImageC from '~~/components/ImageC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionVideo>,
    required: true,
  },
})

const isImageShown = ref(!!props.blok.placeholder_image.filename)

const video = ref<HTMLVideoElement>()

const onimage = () => {
  isImageShown.value = false

  if (props.blok.video.filename && video.value) {
    video.value.play()
  }
}
</script>
