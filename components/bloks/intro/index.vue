<template>
  <div class="relative" :class="{ 'bg-black text-white': state.isDark }">
    <div
      :class="[
        blok.is_left ? 'justify-start ' : 'flex-col items-center text-center',
        blok.newsletter && blok.newsletter[0]
          ? 'pt-32 lg:pt-40'
          : 'pt-32 lg:pt-48',
      ]"
      class="container pb-20 lg:flex lg:pb-36"
    >
      <div
        :class="[
          blok.is_left
            ? 'flex flex-col justify-center lg:mb-0 lg:w-3/5 lg:pr-28'
            : 'flex flex-col items-center lg:w-3/5',
          blok.image.filename ? 'mb-20' : '',
        ]"
        class="relative z-10"
      >
        <p
          class="mb-2 text-lg font-semibold uppercase text-yellow-900"
          v-if="blok.label"
        >
          {{ blok.label }}
        </p>
        <Component
          :is="blok.is_title_h2 ? 'h2' : 'h1'"
          class="mb-4 text-4xl font-semibold leading-none tracking-tight lg:text-6xlplus"
          :class="[
            blok.is_left ? 'leading-none' : 'lg:leading-tight',
            !!blok.background_image.filename
              ? blok.is_dark
                ? 'text-white'
                : 'text-black'
              : state.isDark
              ? 'text-white'
              : 'text-black',
          ]"
        >
          <TextC :text="blok.title" />
        </Component>
        <p
          class="text-xl leading-snug lg:text-2xl"
          :class="[
            !!blok.background_image.filename
              ? blok.is_dark
                ? 'text-gray-500'
                : 'text-gray-600'
              : state.isDark
              ? 'text-gray-500'
              : 'text-gray-600',
            blok.newsletter && blok.newsletter[0] && 'mb-10',
          ]"
          v-if="blok.subtitle"
        >
          {{ blok.subtitle }}
        </p>
        <IntroNewsletter
          v-if="blok.newsletter && blok.newsletter[0]"
          :blok="blok.newsletter[0]"
          v-editable="blok.newsletter[0]"
        />

        <div class="mt-8 flex" v-if="blok.items && blok.items.length">
          <ButtonItem
            v-for="(item, index) in blok.items"
            :key="index"
            :blok="item"
          />
        </div>
      </div>
      <div
        :class="blok.is_left ? 'flex lg:w-2/5' : 'w-full'"
        class="relative z-10"
      >
        <ImageC
          :class="blok.is_left ? 'self-center' : ''"
          class="rounded"
          v-if="blok.image.filename"
          :src="blok.image.filename"
          :alt="blok.image.alt"
          :lazy="false"
          :width="blok.is_left ? 455 : 1136"
        />
      </div>

      <!-- Background -->
      <ImageC
        class="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 transform object-cover"
        v-if="blok.background_image.filename"
        :src="blok.background_image.filename"
        :alt="blok.background_image.alt"
        :width="1680"
        :lazy="false"
        :style="{ maxWidth: '1680px' }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import ImageC from '~~/components/ImageC.vue'
import LinkC from '~~/components/LinkC.vue'
import IntroNewsletter from './items/Newsletter.vue'
import TextC from '~~/components/TextC.vue'
import ButtonItem from '~~/components/ButtonItem.vue'

const { state } = useData()
// const isDark = computed(() => state.value.isDark)

const props = defineProps({
  blok: {
    type: Object as PropType<any>,
    required: true,
  },
})
</script>
