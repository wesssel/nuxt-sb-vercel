<template>
  <LinkC
    :link="item.link"
    class="card justiy-between group relative flex flex-col rounded-xl sm:flex"
    :class="linkClasses"
    @click.native="onCopy(item)"
  >
    <div
      :class="{ 'relative h-full w-full overflow-hidden sm:min-h-96': is_full }"
    >
      <figure
        class="change-transform flex h-80 overflow-hidden rounded-t-lg"
        :class="[is_three_cols ? 'sm:h-64' : 'sm:h-72', { 'h-96': is_full }]"
        v-if="item.image && item.image.filename"
      >
        <ImageC
          class="ease change-transform h-full w-full transform object-cover saturate-70 filter transition-all duration-250"
          :class="
            isHoverActive
              ? 'group-hover:scale-102 group-hover:saturate-100'
              : ''
          "
          :src="item.image.filename"
          :alt="item.image.alt"
        />
      </figure>
    </div>
    <div
      class="bottom-0 flex flex-grow flex-col p-5"
      :class="is_three_cols ? 'md:p-6' : 'md:p-8'"
    >
      <TextC
        v-if="item.overline"
        class="mb-1 text-xs font-semibold uppercase text-yellow-300"
        :text="item.overline"
      />
      <TextC
        v-if="item.title"
        class="mb-2 text-lg font-semibold text-black sm:text-xl"
        :text="item.title"
      />
      <TextC
        v-if="item.text"
        class="mb-6 text-sm leading-snug text-gray-600 sm:text-base"
        :text="item.text"
      />
      <div class="mt-auto flex items-center">
        <ImageC
          v-if="item.subtitle_icon && item.subtitle_icon.filename"
          :src="item.subtitle_icon.filename"
          :alt="item.subtitle_icon.alt"
          class="mr-2 h-5 w-5"
        />
        <TextC
          v-if="item.subtitle"
          :class="
            item.is_subtitle_blue
              ? 'text-sm text-blue-400 sm:text-lg'
              : 'text text-base font-semibold text-gray-600'
          "
          :text="isCopied ? settings.copy_complete : item.subtitle"
        />
      </div>
    </div>
    <div
      class="pointer-events-none absolute left-0 top-0 h-full w-full rounded-lg opacity-0 shadow-lg"
      :class="
        isHoverActive
          ? 'ease transition-all duration-250 group-hover:opacity-100'
          : ''
      "
    ></div>
  </LinkC>
</template>

<script lang="ts" setup>
import { copyToClipboard } from '../utils/copy'
import { IStoryAsset, IStoryLink } from '~/types'
import { PropType } from 'vue'
import LinkC from './LinkC.vue'
import ImageC from './ImageC.vue'
import TextC from './TextC.vue'

interface Item {
  link: IStoryLink
  text: string
  image: IStoryAsset
  title: string
  overline: string
  subtitle: string
  subtitle_icon: IStoryAsset
  is_subtitle_blue: boolean
  text_copy: string
}

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
  is_three_cols: {
    type: Boolean,
    required: true,
  },
  is_full: {
    type: Boolean,
    required: true,
  },
  is_white: {
    type: Boolean,
    required: true,
  },
})

const { state } = useData()

const settings = computed(() => state.value.settings)

const isCopied = ref(false)

const isHoverActive = computed(() => {
  return !!props.item.link && !!props.item.link.cached_url
    ? !!props.item.link.cached_url
    : !!props.item.text_copy
})

const linkClasses = computed(() => {
  return [
    props.is_full ? 'md:grid md:gap-10 md:grid-cols-2' : '',
    props.is_white ? 'bg-white' : 'bg-gray-100',
    isHoverActive.value
      ? 'cursor-pointer ease duration-250 hover:bg-white'
      : '',
  ]
})

const onCopy = async (item: Item) => {
  if (item.text_copy) {
    await copyToClipboard(item.text_copy)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }
}
</script>

<style lang="scss" scoped></style>
