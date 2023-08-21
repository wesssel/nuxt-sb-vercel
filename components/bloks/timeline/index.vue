<template>
  <div class="timeline bg-black text-white">
    <div class="container py-32 md:py-20">
      <div class="mx-auto mb-32 w-full text-center lg:max-w-4xl">
        <div class="mb-4 text-3xl font-semibold lg:text-6xl">
          {{ blok.title }}
        </div>

        <div class="mb-12 text-xl lg:text-2xl">
          {{ blok.subtitle }}
        </div>
      </div>

      <ul
        class="relative mx-auto max-w-xl before:absolute before:top-0 before:left-0 before:block before:h-full md:max-w-5xl"
      >
        <li
          v-for="(item, index) in blok.items"
          :key="index"
          class="last:pb-20 md:flex"
        >
          <div class="md:w-2/5">
            <ImageC
              v-if="item.image.filename"
              class="mb-20 hidden w-88 md:mb-0 md:block lg:mx-auto"
              :src="item.image.filename"
              :alt="item.image.alt"
              :width="356"
            />
          </div>
          <div class="md:w-3/5">
            <div
              class="relative h-full pl-4 pb-20 md:ml-10 lg:pl-12"
              :class="isLast(index) ? 'md:pb-0' : 'md:pb-48'"
            >
              <!-- dot -->
              <div
                class="z-4 absolute -left-2 top-1 h-4 w-4 rounded-full border border-gray-500 bg-gray-600"
                :class="
                  isLast(index) && blok.end_title
                    ? 'border-yellow-900 bg-yellow-900'
                    : ''
                "
              ></div>

              <!-- line -->
              <div
                v-if="!isLast(index) || blok.end_title"
                class="absolute left-0 top-4 h-full w-px bg-gray-600"
                :class="isLast(index) ? 'bg-yellow-900' : ''"
              ></div>

              <div class="mb-2 text-lg text-yellow-900">
                {{ item.overline }}
              </div>
              <ImageC
                v-if="item.image.filename"
                class="mb-10 w-88 pl-24 md:hidden"
                :src="item.image.filename"
                :alt="item.image.alt"
                :width="356"
              />
              <div
                class="leading-right mb-4 text-2xl font-semibold lg:text-4xl"
              >
                {{ item.title }}
              </div>
              <TextC
                class="max-w-md text-base text-gray-500 lg:text-lg"
                v-if="item.text_content"
                :text="item.text_content"
              />
              <div class="max-w-md text-base text-gray-500 lg:text-lg" v-else>
                {{ item.text }}
              </div>
            </div>
          </div>
        </li>
        <li class="md:flex" v-if="blok.end_title">
          <div class="md:w-2/5"></div>
          <div class="md:w-3/5">
            <div class="relative h-full pl-4 pb-20 md:ml-10 md:pb-48 lg:pl-12">
              <!-- dot -->
              <div
                class="z-4 absolute -left-3 top-1 h-6 w-6 rounded-full border border-yellow-900 bg-black lg:-left-4 lg:top-2 lg:h-8 lg:w-8"
              >
                <IconC
                  id="arrowRightAlternative"
                  class="w-4.5 m-0.5 lg:m-1.5"
                  color="#FDAB0E"
                />
              </div>
              <div
                class="leading-right mb-4 text-2xl font-semibold lg:text-4xl"
              >
                {{ blok.end_title }}
              </div>
              <div class="max-w-md text-base text-gray-500 lg:text-lg">
                {{ blok.end_text }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Richtext } from 'storyblok-js-client'
import { IStoryAsset } from '~/types'
import ImageC from '~/components/ImageC.vue'
import IconC from '~/components/IconC.vue'
import TextC from '~/components/TextC.vue'
import { PropType } from 'vue'

const props = defineProps({
  blok: {
    type: Object as PropType<{
      title: string
      subtitle: string
      items: {
        overline: string
        title: string
        text: string // this is the old one
        text_content: Richtext
        image: IStoryAsset
      }[]
      end_title: string
      end_text: string
    }>,
  },
})

const isLast = (index: number) => {
  return props.blok.items.length - 1 === index
}
</script>

<style lang="scss" scoped>
/* .timeline {
  ul:before {
    content: "";
    height: 100%;
    width: 1px;
    display: block;
    background: white;
    position: absolute;
    left: 0;
    top: 0;
  }
  li:last-child{
    position: relative;
    &:after {
      content: "";
      height: 100%;
      width: 1px;
      display: block;
      background: red;
      position: absolute;
      left: 0;
      bottom: 0;
    }

  }
} */
</style>
