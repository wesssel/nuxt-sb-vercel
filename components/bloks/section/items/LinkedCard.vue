<template>
  <LinkC :link="blok.link" class="">
    <div class="textblock absolute bottom-0 z-20 flex flex-col p-4 pb-8 md:p-8">
      <div
        v-if="blok.label"
        class="mb-1 text-sm font-semibold uppercase text-yellow-900"
      >
        {{ blok.label }}
      </div>
      <div
        v-if="blok.title"
        class="mb-1 text-3xl font-semibold leading-tight lg:mb-2 lg:text-4xl"
        :class="blok.is_dark ? 'text-white' : 'text-black'"
      >
        {{ blok.title }}
      </div>
      <div
        v-if="blok.subtitle"
        class="text-lg leading-snug lg:text-xl"
        :class="blok.is_dark ? 'text-gray-500' : 'text-gray-600'"
      >
        {{ blok.subtitle }}
      </div>
    </div>
    <figure class="change-transform z-0 h-180 overflow-hidden rounded-xl">
      <ImageC
        v-if="blok.image.filename"
        :src="blok.image.filename"
        :alt="blok.image.alt"
        :width="552"
        class="ease h-full w-full transform object-cover saturate-70 filter transition-all duration-250 group-hover:scale-105 group-hover:saturate-100"
      />
    </figure>
  </LinkC>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ISectionLinkedCard } from '~/types/section'
import ImageC from '~~/components/ImageC.vue'
import LinkC from '~~/components/LinkC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionLinkedCard>,
    required: true,
  },
})
</script>
