<template>
  <div class="mb-20 bg-black pb-10 pt-20 sm:mb-40">
    <div v-if="blok.title" class="container mb-10">
      <TextC
        class="mb-4 text-3xl font-semibold text-white sm:text-4xl"
        :class="{ 'text-center': blok.is_title_center }"
        :text="blok.title"
      />
      <TextC
        class="mb-10 max-w-2xl text-base leading-snug text-white sm:text-xl"
        :class="blok.is_title_center ? 'mx-auto text-center' : 'text-left'"
        :text="blok.subtitle"
        v-if="blok.subtitle"
      />
    </div>
    <div class="carousel">
      <div :class="`swiper-container-${id} overflow-hidden`">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in blok.items"
            :key="index"
            class="swiper-slide card group relative rounded-xl pb-0"
          >
            <LinkC :link="item.link">
              <div
                class="overlay ease absolute z-10 h-full w-full rounded-xl bg-gradient-to-t from-black to-transparent opacity-75 filter transition-all group-hover:opacity-30"
              ></div>
              <figure
                class="change-transform flex h-80 items-center justify-items-center overflow-hidden rounded-xl sm:h-128"
                v-if="item.image && item.image.filename"
              >
                <ImageC
                  class="ease h-full w-full transform object-cover saturate-70 filter transition-all duration-250 group-hover:scale-102 group-hover:saturate-100"
                  :src="item.image.filename"
                  :alt="item.image.alt"
                />
              </figure>
              <div
                class="absolute bottom-0 z-20 flex flex-col p-4 md:p-8 md:pb-8"
              >
                <TextC
                  class="text-xs font-semibold uppercase text-yellow-300 sm:text-sm"
                  :text="item.overline"
                />
                <TextC
                  class="mt-2 max-w-xl text-base font-semibold leading-snug text-white sm:text-2xl"
                  :text="item.title"
                />
              </div>
            </LinkC>
          </div>
        </div>
      </div>

      <div class="cardGrid-swiper-nav container relative mt-8">
        <div
          :id="`${id}cardCarousel-swiper_pagination`"
          class="cardGrid-swiper-pagination -ml-2 p-4"
        ></div>
        <div class="cardGrid-swiper-buttonWrap h-full lg:pr-52">
          <div
            :id="`${id}cardCarousel-swiper_prev`"
            class="cardGrid-swiper-prev mr-5 h-8 w-8 p-4 text-white"
          ></div>
          <div
            :id="`${id}cardCarousel-swiper_next`"
            class="cardGrid-swiper-next -mr-1 h-8 w-8 p-4 text-white"
          ></div>
        </div>
      </div>
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

const props = defineProps({
  blok: {
    type: Object as PropType<{
      _uid: string
      title: string
      subtitle: string
      is_title_center: boolean
      items: {
        image: IStoryAsset
        title: string
        overline: string
        link: IStoryLink
      }[]
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
    allowTouchMove: true,
    centeredSlides: true,
    slideToClickedSlide: true,
    loop: true,
    initialSlide: 0,
    effect: 'slide',
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1.05,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
    pagination: {
      el: `#${id}cardCarousel-swiper_pagination`,
      clickable: true,
    },
    navigation: {
      nextEl: `#${id}cardCarousel-swiper_next`,
      prevEl: `#${id}cardCarousel-swiper_prev`,
    },
    modules: [Pagination, Navigation],
  })
})
</script>

<style lang="scss" scoped>
::v-deep {
  .cardGrid-swiper-nav {
    display: flex;
    justify-content: space-between;
    /* width: calc(100% / 2 - 1em);
    @media only screen and (max-width: 1024px) {
      width: calc(100% / 1.2);
    } */
  }
  .cardGrid-swiper-next,
  .cardGrid-swiper-prev {
    height: 1rem;
    width: 1rem;
    border-radius: 100%;
    transition: all 0.3s ease;
    &:hover {
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.2);
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
    height: 1rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-right: 1rem;
      background: white;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(2);
        transition: all 0.3s ease;
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
