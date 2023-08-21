<template>
  <div class="my-32 bg-white text-black">
    <div class="container py-20 text-center">
      <div class="mx-auto mb-8 w-full lg:max-w-4xl">
        <div class="mb-8 text-3xl font-semibold md:text-6xl">
          {{ blok.title }}
        </div>

        <div class="mb-12 text-xl leading-snug md:text-2xl">
          {{ blok.subtitle }}
        </div>

        <LinkC
          :link="blok.link"
          class="block text-center text-lg text-blue-400 underline underline-offset-1 sm:text-xl"
        >
          {{ blok.link_text }}
        </LinkC>
      </div>
    </div>
    <ImageC
      class="w-100 h-96 object-cover"
      :src="blok.image.filename"
      :alt="blok.image.alt"
    />
  </div>
</template>

<script lang="ts" setup>
import { IStoryAsset, IStoryLink } from '~/types'
import { PropType } from 'vue'
import LinkC from '~/components/LinkC.vue'
import ImageC from '~/components/ImageC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<{
      title: string
      subtitle: string
      link_text: string
      link: IStoryLink
      image: IStoryAsset
    }>,
    required: true,
  },
})
</script>
