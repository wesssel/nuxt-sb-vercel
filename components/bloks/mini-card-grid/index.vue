<template>
  <div class="container overflow-x-hidden pb-20 sm:overflow-x-visible sm:pb-40">
    <div v-if="blok.title" class="mb-10 max-w-6xl">
      <TextC
        class="mb-4 max-w-2xl text-left text-3xl font-semibold sm:text-4xl"
        :text="blok.title"
      />
      <TextC
        class="mb-5 mt-auto max-w-2xl text-left text-base leading-snug text-gray-600 sm:mb-10 sm:text-xl"
        :text="blok.subtitle"
        v-if="blok.subtitle"
      />
    </div>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <LinkC
        v-for="(item, index) in blok.items"
        :key="index"
        class="ease group mb-16 block cursor-pointer rounded-xl transition-all duration-250 sm:mb-4 sm:p-4 sm:hover:bg-gray-200"
        :link="item.link"
      >
        <div class="sm:flex">
          <figure
            class="change-transform relative mr-4 mb-4 flex h-80 w-full flex-none items-center justify-center overflow-hidden rounded-xl sm:mr-10 sm:mb-0 sm:h-36 sm:w-36"
            v-if="item.image && item.image.filename"
          >
            <ImageC
              class="ease h-80 w-full transform rounded-xl object-cover saturate-70 filter transition-all duration-250 group-hover:scale-105 group-hover:saturate-100 sm:h-36 sm:w-36"
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
              class="text text-base font-semibold text-gray-600"
              :text="item.subtitle"
            />
          </div>
        </div>
      </LinkC>
    </div>
    <LinkC
      class="text-decoration-underline mt-10 block text-center text-lg text-blue-400 underline underline-offset-1 sm:mt-20 sm:text-xl"
      v-if="blok.button_text && blok.button_link"
      :link="blok.button_link"
    >
      {{ blok.button_text }}
    </LinkC>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IStoryAsset, IStoryLink } from '~/types'
import ImageC from '~~/components/ImageC.vue'
import LinkC from '~~/components/LinkC.vue'
import TextC from '~~/components/TextC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<{
      title: string
      subtitle: string
      items: {
        image: IStoryAsset
        title: string
        overline: string
        text: string
        link: IStoryLink
        subtitle: string
      }[]
      button_link: IStoryLink
      button_text: string
    }>,
    required: true,
  },
})
</script>
