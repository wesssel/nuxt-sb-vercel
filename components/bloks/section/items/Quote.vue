<template>
  <div
    :class="
      (blok.items.length > 1 || !blok.items[0].image.filename) &&
      'pb-20 lg:pb-40'
    "
    class=""
  >
    <div
      :class="[
        blok.items.length > 1 && 'grid grid-cols-1',
        blok.items.length === 2 && 'lg:grid-cols-2',
        blok.items.length === 3 && 'lg:grid-cols-3',
      ]"
    >
      <div
        :class="[
          item.image.filename && '-mb-4 lg:-mb-24',
          blok.items.length > 1 && 'mb-6 last:mb-0 lg:mb-0',
        ]"
        v-for="(item, index) in blok.items"
        :key="index"
        v-editable="item"
      >
        <div v-if="item.image.filename && blok.items.length <= 1">
          <div>
            <ImageC
              class="pl-8 lg:pl-60"
              :src="item.image.filename"
              :alt="item.image.alt"
            />
          </div>
          <div
            :class="
              state.isDark ? 'bg-black text-white' : 'bg-gray-200 text-black'
            "
            class="relative mr-10 inline-flex -translate-y-20 transform flex-col pt-6 pr-10 lg:mr-0 lg:-translate-y-64 lg:pt-20 lg:pr-44 lg:pl-0"
          >
            <TextC
              class="self-start text-3xl font-normal leading-normal lg:text-6xl lg:leading-snug"
              :class="item.link_text ? 'mb-4 lg:mb-6' : ''"
              :text="item.title"
            />
            <div
              v-if="item.link_text"
              class="flex items-center justify-start self-start"
            >
              <LinkC
                :link="item.link"
                v-if="item.link"
                class="flex items-center self-start text-left text-lg text-blue-400 sm:text-xl"
              >
                {{ item.link_text }}
                <IconC
                  class="ml-2 h-4 w-4 lg:ml-3 lg:h-6 lg:w-6"
                  id="arrowRightAlternative"
                  color="#3197FF"
                />
              </LinkC>
            </div>
            <ImageC
              class="mt-4 w-36 self-start lg:mt-8 lg:w-auto"
              :src="item.logo.filename"
              v-if="item.logo.filename"
            />
          </div>
        </div>
        <div v-else>
          <div
            :class="blok.items.length > 1 ? 'items-start' : 'items-center'"
            class="flex flex-col justify-center"
          >
            <ImageC
              :class="
                blok.items.length > 1 ? 'order-3 mt-4 lg:mt-8' : ' mb-4 lg:mb-8'
              "
              class="w-36 lg:w-auto"
              :src="item.logo.filename"
              v-if="item.logo.filename"
            />
            <TextC
              :class="[
                blok.items.length > 1
                  ? 'pr-12 text-left text-xl lg:text-2xl'
                  : 'text-center text-3xl lg:text-4xl',
                blok.items.length > 1 && item.link_text && 'mb-2 lg:mb-3 ',
                blok.items.length <= 1 && item.link_text && 'mb-6 lg:mb-8',
              ]"
              class="font-normal leading-normal lg:leading-snug"
              :text="item.title"
            />
            <div v-if="item.link_text" class="flex items-center justify-start">
              <LinkC
                :link="item.link"
                v-if="item.link"
                class="flex items-center self-start text-left text-lg text-blue-400 sm:text-xl"
              >
                {{ item.link_text }}
                <IconC
                  class="ml-2 h-4 w-4 lg:ml-3 lg:h-6 lg:w-6"
                  id="arrowRightAlternative"
                  color="#3197FF"
                />
              </LinkC>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ISectionQuote } from '~/types/section'
import ImageC from '~~/components/ImageC.vue'
import LinkC from '~~/components/LinkC.vue'
import TextC from '~~/components/TextC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionQuote>,
    required: true,
  },
})

const { state } = useData()
// const state.isDark = computed(() => state.value.isDark)
</script>
