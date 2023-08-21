<template>
  <div class="container max-w-4xl pb-20">
    <LinkC
      v-for="(item, index) in blok.items"
      :key="index"
      class="ease group mb-16 block cursor-pointer rounded-xl transition-all duration-250 sm:mb-4 sm:p-4 sm:hover:bg-gray-200"
      :link="item.link"
    >
      <div class="sm:flex">
        <figure
          class="change-transform relative mr-4 mb-4 flex h-80 w-full flex-none items-center justify-center overflow-hidden rounded-xl sm:mr-10 sm:mb-0 sm:h-48 sm:w-48"
          v-if="item.image && item.image.filename"
        >
          <ImageC
            class="ease h-80 w-full transform rounded-xl object-cover saturate-70 filter transition-all duration-250 group-hover:scale-105 group-hover:saturate-100 sm:h-48 sm:w-48"
            :src="item.image.filename"
            :alt="item.image.alt"
            :width="700"
            :height="350"
          />
        </figure>
        <div class="sm:flex sm:flex-col sm:justify-center">
          <TextC
            class="mb-1 text-xs font-semibold uppercase text-yellow-300"
            :text="item.overline"
          />
          <TextC class="mb-2 text-lg font-semibold" :text="item.title" />
          <TextC
            class="mb-6 text-base leading-snug text-gray-600"
            :text="item.text"
          />
          <TextC
            class="text text-base font-semibold text-gray-600"
            :text="item.subtitle"
          />
        </div>
      </div>
    </LinkC>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import ImageC from '~~/components/ImageC.vue'
import LinkC from '~~/components/LinkC.vue'
import TextC from '~~/components/TextC.vue'
import { IStoryAsset, IStoryLink } from '~~/types'

const props = defineProps({
  blok: {
    type: Object as PropType<{
      items: {
        image: IStoryAsset
        title: string
        overline: string
        text: string
        link: IStoryLink
        subtitle: string
      }[]
    }>,
    required: true,
  },
})
</script>
