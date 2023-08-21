<template>
  <div class="container pb-20">
    <div class="rounded-xl bg-white text-black">
      <div class="md:flex md:h-128 md:items-center">
        <div class="pt-16 md:order-2 md:w-3/5 md:pt-0">
          <ImageC
            :src="blok.image.filename"
            :alt="blok.image.alt"
            :width="682"
          />
        </div>
        <div class="p-10 md:order-1 md:w-2/5 md:p-0 md:pl-20">
          <div class="text-lg text-yellow-700">{{ blok.overline }}</div>
          <div class="mb-2 text-4xl font-semibold lg:text-5xl">
            {{ blok.title }}
          </div>
          <div class="mb-8 text-lg md:mb-4 lg:text-2xl">{{ blok.text }}</div>
          <LinkC
            class="block max-w-max rounded border border-black px-8 pt-3 pb-3.5 text-base md:px-6 md:pt-2 md:pb-2.5"
            :link="blok.button_link"
          >
            {{ blok.button_text }}
          </LinkC>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { IStoryAsset, IStoryLink } from '~/types'
import ImageC from '~/components/ImageC.vue'
import LinkC from '~/components/LinkC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<{
      overline: string
      title: string
      text: string
      button_text: string
      button_link: IStoryLink
      image: IStoryAsset
    }>,
  },
})
</script>
