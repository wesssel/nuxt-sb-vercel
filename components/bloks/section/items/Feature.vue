<template>
  <LinkC
    :link="blok.link"
    class="flex flex-1 flex-col"
    :class="[
      isSplit ? 'h-auto md:h-96 md:flex-row' : '',
      isBackground
        ? state.isDark
          ? 'rounded-lg bg-gray-900'
          : 'rounded-lg bg-white'
        : '',
    ]"
  >
    <iframe
      v-if="blok.video_embed_url"
      :src="blok.video_embed_url"
      :width="imageWidth"
      class="w-full"
      :class="[
        isSplit
          ? 'rounded-t-lg md:rounded-l-lg md:rounded-tr-none'
          : isBackground
          ? 'rounded-t-lg'
          : 'mb-4 rounded-lg',
        isSplit ? 'md:w-1/2 md:flex-1' : '',
      ]"
      frameborder="0"
      :style="{ height: `${videoEmbedHeight}px` }"
    />
    <video
      v-else-if="blok.video && blok.video.filename"
      :src="blok.video.filename"
      :alt="blok.video.alt"
      :width="imageWidth"
      class="min-h-56 w-full object-cover"
      :class="[
        isSplit
          ? 'rounded-t-lg md:rounded-l-lg md:rounded-tr-none'
          : isBackground
          ? 'rounded-t-lg'
          : 'mb-4 rounded-lg',
        isSplit ? 'md:w-1/2 md:flex-1' : '',
      ]"
      controls
    />
    <ImageC
      v-else-if="blok.image && blok.image.filename"
      :src="blok.image.filename"
      :alt="blok.image.alt"
      :width="imageWidth"
      class="min-h-56 w-full object-cover"
      :class="[
        isSplit
          ? 'rounded-t-lg md:rounded-l-lg md:rounded-tr-none'
          : isBackground
          ? 'rounded-t-lg'
          : 'mb-4 rounded-lg',
        isSplit ? 'md:w-1/2 md:flex-1' : '',
      ]"
    />
    <div
      class="flex flex-1 flex-col"
      ref="container"
      :class="[isBackground ? 'p-6' : '', isSplit ? 'md:justify-center' : '']"
    >
      <div ref="feature">
        <div
          v-if="blok.label"
          class="mb-1 text-sm font-semibold uppercase text-yellow-900"
        >
          {{ blok.label }}
        </div>
        <div
          v-if="blok.title"
          class="mb-1 text-2xl font-semibold leading-tight md:mb-2"
        >
          {{ blok.title }}
        </div>
        <div
          v-if="blok.subtitle"
          class="text-lg leading-snug lg:text-xl"
          :class="state.isDark ? 'text-gray-500' : 'text-gray-600'"
        >
          {{ blok.subtitle }}
        </div>
      </div>

      <div :class="isSplit ? '' : 'mt-auto'">
        <p
          class="text-l mt-8 font-semibold leading-snug text-gray-600"
          v-if="blok.bottom_text"
        >
          {{ blok.bottom_text }}
        </p>
        <LinkC
          class="mt-8 block text-lg leading-snug text-blue-400 sm:text-xl"
          :link="blok.bottom_link"
          v-if="blok.bottom_link_title"
        >
          {{ blok.bottom_link_title }}
        </LinkC>

        <ul class="mt-8 flex" v-if="blok.bottom_social_items.length">
          <li
            v-for="(item, index) in blok.bottom_social_items"
            :key="index"
            class="mr-6"
          >
            <span class="sr-only">{{ item.name }}</span>
            <LinkC :link="item.link">
              <IconC
                v-if="item.icon && item.icon.icon"
                :id="item.icon.icon"
                type="fa"
              />
            </LinkC>
          </li>
        </ul>
      </div>
    </div>
  </LinkC>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ISectionFeature } from '~/types/section'
import IconC from '~~/components/IconC.vue'
import ImageC from '~~/components/ImageC.vue'
import LinkC from '~~/components/LinkC.vue'

const props = defineProps({
  isBackground: {
    type: Boolean,
    default: false,
  },
  isSplit: {
    type: Boolean,
    default: false,
  },
  blok: {
    type: Object as PropType<ISectionFeature>,
    required: true,
  },
  imageWidth: {
    type: Number,
    default: 358,
  },
  videoEmbedHeight: {
    type: Number,
    default: 224,
  },
})

const { state } = useData()
// const isDark = computed(() => state.value.isDark)

const container = ref<HTMLElement>()
const feature = ref<HTMLElement>()
</script>
