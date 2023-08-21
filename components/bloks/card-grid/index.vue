<template>
  <div
    :class="[background, { 'pt-20': blok.is_background_gray || blok.is_dark }]"
    class="pb-20 sm:pb-40"
  >
    <div class="container overflow-x-hidden sm:overflow-x-visible">
      <div v-if="blok.title" class="mb-10 max-w-6xl">
        <TextC
          class="mb-4 max-w-2xl text-left text-3xl font-semibold sm:text-4xl"
          :text="blok.title"
        />
        <TextC
          class="mb-5 mt-auto max-w-2xl text-left text-base leading-snug sm:mb-10 sm:text-xl"
          :class="{ 'text-gray-600': !blok.is_dark }"
          :text="blok.subtitle"
          v-if="blok.subtitle"
        />
      </div>
      <div
        class="grid grid-cols-1 gap-8"
        :class="
          blok.is_three_cols
            ? 'sm:grid-cols-2 lg:grid-cols-3'
            : 'sm:grid-cols-2'
        "
      >
        <div
          v-if="blok.is_first_full"
          class="card ease sm:flex' group relative rounded-xl transition-all duration-250 hover:bg-white sm:col-span-2"
          :class="blok.is_background_gray ? 'bg-white' : 'bg-gray-100'"
        >
          <LinkC
            :link="blok.items[0].link"
            class="block md:grid md:grid-cols-2 md:gap-10"
          >
            <div class="relative h-full w-full overflow-hidden sm:min-h-96">
              <figure
                class="change-transform left-0 top-0 flex h-96 w-full items-center overflow-hidden rounded-t-lg md:absolute md:h-full md:rounded-l-lg md:rounded-t-none"
                v-if="blok.items[0].image && blok.items[0].image.filename"
              >
                <ImageC
                  class="ease h-full w-full transform object-cover saturate-70 filter transition-all duration-250 group-hover:scale-105 group-hover:saturate-100"
                  :src="blok.items[0].image.filename"
                  :alt="blok.items[0].image.alt"
                />
              </figure>
            </div>
            <div
              class="direction-column ease bottom-0 flex flex flex-1 flex-col justify-center p-5 duration-250 md:p-10 md:pl-0"
            >
              <TextC
                class="mb-1 text-xs font-semibold uppercase text-yellow-300 sm:text-sm"
                :text="blok.items[0].overline"
              />
              <TextC
                class="mb-2 text-xl font-semibold text-black sm:text-2xl"
                :text="blok.items[0].title"
              />
              <TextC
                class="mb-6 text-base leading-snug text-gray-600 sm:text-lg"
                :text="blok.items[0].text"
              />
              <TextC
                class="text text-base font-semibold text-gray-600"
                :text="blok.items[0].subtitle"
              />
            </div>
            <div
              class="ease pointer-events-none absolute top-0 h-full w-full rounded-lg opacity-0 shadow-lg transition-all duration-250 group-hover:opacity-100"
            ></div>
          </LinkC>
        </div>
        <CardGridItem
          v-for="(item, index) in !blok.is_first_full
            ? blok.items
            : blok.items.slice(1)"
          :key="index"
          :item="item"
          :is_three_cols="blok.is_three_cols"
          :is_white="blok.is_background_gray"
        />
      </div>

      <div v-if="blok.is_first_full" class="mt-5 block sm:hidden">
        <div :class="`swiper-container-${id}`">
          <div class="swiper-wrapper">
            <div
              v-for="(item, index) in blok.items.slice(1)"
              :key="index"
              class="swiper-slide ease card group mb-4 rounded-xl bg-gray-100 duration-250 hover:bg-white"
            >
              <CardGridItem
                :item="item"
                :is_three_cols="blok.is_three_cols"
                :is_white="blok.is_background_gray"
              />
            </div>
          </div>
        </div>
        <div class="cardGrid-swiper-nav relative mx-auto mt-4">
          <div
            id="cardGrid-swiper_pagination"
            class="cardGrid-swiper-pagination -ml-2 p-4"
            :class="blok.is_dark ? '' : 'invert filter'"
          ></div>
          <div
            class="cardGrid-swiper-buttonWrap h-full"
            :class="blok.is_dark ? '' : 'invert filter'"
          >
            <div
              id="cardGrid-swiper_prev"
              class="cardGrid-swiper-prev mr-5 h-8 h-full w-8 p-4 text-black"
            ></div>
            <div
              id="cardGrid-swiper_next"
              class="cardGrid-swiper-next -mr-1 h-8 h-full w-8 p-4 text-black"
            ></div>
          </div>
        </div>
      </div>

      <LinkC
        class="text-decoration-underline mt-10 block text-center text-lg text-blue-400 underline underline-offset-1 sm:mt-20 sm:text-xl"
        v-if="blok.button_text && blok.button_link"
        :link="blok.button_link"
      >
        {{ blok.button_text }}
      </LinkC>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import ImageC from '~~/components/ImageC.vue'
import LinkC from '~~/components/LinkC.vue'
import TextC from '~~/components/TextC.vue'
import { IStoryAsset, IStoryLink } from '~~/types'
import { Swiper, Pagination, Navigation } from 'swiper'
import { waitForElm } from '../../../composables/use-wait'
import { slugify } from '~/utils/slug'

import 'swiper/css'
import 'swiper/css/pagination'
import CardGridItem from '~~/components/CardGridItem.vue'

interface Item {
  text: string
  image: IStoryAsset
  title: string
  overline: string
  subtitle: string
  subtitle_link: IStoryLink
  link: IStoryLink
  text_copy: string
}

const props = defineProps({
  blok: {
    type: Object as PropType<{
      title: string // optional title
      subtitle: string // optional subtitle
      is_three_cols: boolean // for 3 smaller tiles
      is_first_full: boolean // if this is true set the first element as 100%
      is_dark: boolean // black background on and off
      is_background_gray: boolean
      button_link: IStoryLink // the show more button link
      button_text: string // the show more button text
      items: Item[]
    }>,
    required: true,
  },
})

const id = slugify(props.blok.title)
const swiperContainer = '.swiper-container-' + id
const swiper = ref()

onMounted(async () => {
  await waitForElm(swiperContainer)
  swiper.value = new Swiper(swiperContainer, {
    effect: 'slide',
    grabCursor: true,
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 20,
      },
    },
    pagination: {
      el: '#cardGrid-swiper_pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '#cardGrid-swiper_next',
      prevEl: '#cardGrid-swiper_prev',
    },
    modules: [Pagination, Navigation],
  })
})

const background = computed(() => {
  if (props.blok.is_dark && props.blok.is_background_gray) {
    return 'bg-gray-800'
  }

  if (props.blok.is_dark) {
    return 'bg-black'
  }

  if (props.blok.is_background_gray) {
    return 'bg-gray-100'
  }

  return ''
})
</script>

<style lang="scss" scoped>
::v-deep {
  .swiper-container {
    overflow: visible;
  }
  .swiper-slide {
    height: auto;
  }
  .cardGrid-swiper-nav {
    display: flex;
    justify-content: space-between;
  }
  .cardGrid-swiper-next,
  .cardGrid-swiper-prev {
    height: 1em;
    width: 1em;
    border-radius: 100%;
    transition: all 0.3s ease;
    @media (hover: hover) {
      &:hover {
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.2);
      }
    }
    &:before {
      content: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0id2hpdGUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTUgM2wzLjA1Ny0zIDExLjk0MyAxMi0xMS45NDMgMTItMy4wNTctMyA5LTl6Ii8+PC9zdmc+');
    }
  }
  .cardGrid-swiper-prev {
    &:before {
      transform: scaleX(-1);
      content: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0id2hpdGUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTUgM2wzLjA1Ny0zIDExLjk0MyAxMi0xMS45NDMgMTItMy4wNTctMyA5LTl6Ii8+PC9zdmc+');
    }
  }
  .cardGrid-swiper-pagination {
    height: 1em;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-right: 1em;
      background: white;
      transition: all 0.3s ease;
      @media (hover: hover) {
        &:hover {
          transform: scale(2);
          transition: all 0.3s ease;
        }
      }
    }
  }
  .cardGrid-swiper-buttonWrap {
    display: flex;
    flex-direction: row;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
