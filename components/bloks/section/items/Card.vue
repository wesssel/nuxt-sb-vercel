<template>
  <div
    :class="[
      blok.is_left ? 'flex' : 'text-center',
      blok.background.filename ? 'px-6 py-16' : '',
      !!blok.background.filename
        ? blok.is_dark
          ? 'text-white'
          : 'text-black'
        : state.isDark
        ? 'text-white lg:px-16'
        : 'text-black lg:py-16',
    ]"
    class="relative mb-8 flex-1 flex-col items-center overflow-hidden rounded-lg lg:min-h-96 lg:flex-row"
    :style="{
      background: blok.background_color
        ? blok.background_color.color
        : undefined,
    }"
  >
    <div
      :class="[
        blok.is_reversed
          ? 'order-2 lg:pr-0 lg:pl-28'
          : 'order-1 lg:order-none lg:pr-0',
        blok.is_left ? 'w-full lg:w-3/6 ' : 'p-0 text-center',
      ]"
      class="relative z-10"
    >
      <div class="mb-1 text-sm font-semibold uppercase text-yellow-900">
        {{ blok.label }}
      </div>
      <div
        class="mb-1 text-3xl font-semibold leading-tight lg:mb-2 lg:text-4xl"
      >
        {{ blok.title }}
      </div>
      <div
        class="text-lg leading-snug lg:text-xl"
        :class="
          !!blok.background.filename
            ? blok.is_dark
              ? 'text-gray-500'
              : 'text-gray-600'
            : state.isDark
            ? 'text-gray-500'
            : 'text-gray-600'
        "
      >
        {{ blok.subtitle }}
      </div>
      <div
        class="mt-4 flex flex-col md:flex-row lg:mt-8"
        v-if="blok.items.length"
        :class="!blok.is_left ? 'items-center justify-center' : ''"
      >
        <div
          v-for="(bottomItem, index) in blok.items"
          :key="index"
          v-editable="bottomItem"
        >
          <!-- Link -->
          <LinkC
            v-if="bottomItem.component === 'link-item'"
            :link="bottomItem.link"
            class="mb-4 inline-block text-center text-lg text-blue-400 underline underline-offset-1 sm:text-xl md:mr-4"
          >
            {{ bottomItem.text }}
          </LinkC>
          <ButtonItem
            v-if="bottomItem.component === 'button-item'"
            class="mb-2 inline-block rounded-lg py-3 px-6 text-center text-base md:mr-4 md:text-left"
            style="width: fit-content"
            :blok="bottomItem"
          />
          <LinkC
            v-if="bottomItem.component === 'section-button-image'"
            :link="bottomItem.link"
            class="mb-2 inline-block md:mr-4"
          >
            <ImageC
              v-if="bottomItem.image.filename"
              :src="bottomItem.image.filename"
              :alt="bottomItem.image.alt"
              :forceWidth="175"
              class="lol"
            />
          </LinkC>
        </div>
      </div>
    </div>

    <ImageC
      v-if="blok.image.filename"
      :src="blok.image.filename"
      :alt="blok.image.alt"
      :width="500"
      :class="[
        blok.is_left ? 'flex w-full lg:w-3/6' : '',
        blok.is_reversed ? 'lg:order-1' : 'lg:ml-28',
      ]"
      class="z-10 mb-4 rounded-lg"
    />

    <ImageC
      v-if="blok.background.filename"
      :src="blok.background.filename"
      :alt="blok.background.alt"
      :width="1040"
      class="absolute left-0 top-0 h-full w-full object-cover"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ISectionCard } from '~/types/section'
import ButtonItem from '~~/components/ButtonItem.vue'
import ImageC from '~~/components/ImageC.vue'
import LinkC from '~~/components/LinkC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionCard>,
    required: true,
  },
})

const { state } = useData()
// const state.isDark = computed(() => state.value.isDark)
</script>
