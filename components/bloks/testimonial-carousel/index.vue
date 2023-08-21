<template>
  <div class="mb-20 overflow-x-hidden pb-10 pt-20 sm:mb-40">
    <div class="container">
      <div v-if="blok.title" class="mb-10 max-w-xl">
        <TextC
          class="mb-4 text-3xl font-semibold sm:text-5xl"
          :text="blok.title"
        />
      </div>
    </div>
    <div class="carousel">
      <div :class="`swiper-container-${id}`">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in blok.items"
            :key="index"
            class="swiper-slide"
          >
            <div
              class="bottom-0 flex h-full flex-grow flex-col rounded-xl bg-white p-10 sm:h-128 lg:h-96"
            >
              <div
                class="mb-14 text-xl font-light leading-relaxed text-gray-900 sm:mb-0 xl:text-2xl"
              >
                {{ item.text }}
              </div>
              <div class="mt-auto flex">
                <ImageC
                  :src="item.author_image.filename"
                  :alt="item.author_image.alt"
                  :width="70"
                  :height="70"
                  class="mr-5 h-18 w-18 rounded-full object-cover"
                />
                <div class="flex flex-col justify-center text-base">
                  <div class="text-gray-900">{{ item.author_name }}</div>
                  <div class="text-gray-900">{{ item.author_role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cardGrid-swiper-nav container relative mt-8">
        <div
          id="cardCarousel-swiper_pagination"
          class="cardGrid-swiper-pagination -ml-2 p-4"
          :class="{ dark: state.isDark }"
        ></div>
        <div class="cardGrid-swiper-buttonWrap h-full lg:pr-52">
          <div
            id="cardCarousel-swiper_prev"
            class="cardGrid-swiper-prev mr-5 h-8 w-8 p-4 text-black"
            :class="{ dark: state.isDark }"
          ></div>
          <div
            id="cardCarousel-swiper_next"
            class="cardGrid-swiper-next -mr-1 h-8 w-8 p-4 text-black"
            :class="{ dark: state.isDark }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import ImageC from '~~/components/ImageC.vue'
import TextC from '~~/components/TextC.vue'
import { IStoryAsset } from '~~/types'
import { Swiper, Pagination, Navigation } from 'swiper'
import { waitForElm } from '../../../composables/use-wait'
import { slugify } from '~/utils/slug'

import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps({
  blok: {
    type: Object as PropType<{
      title: string
      items: {
        text: string
        author_name: string
        author_role: string
        author_image: IStoryAsset
      }[]
    }>,
    required: true,
  },
})

const { state } = useData()

// const state.isDark = computed(() => state.value.state.isDark)

const id = slugify(props.blok.title)
const swiperContainer = '.swiper-container-' + id
const swiper = ref()

onMounted(async () => {
  await waitForElm(swiperContainer)
  swiper.value = new Swiper(swiperContainer, {
    allowTouchMove: false,
    centeredSlides: true,
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
      el: '#cardCarousel-swiper_pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '#cardCarousel-swiper_next',
      prevEl: '#cardCarousel-swiper_prev',
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
      content: url('data:image/svg+xml;utf8,<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.49922 6.30078L1.89922 0.600781C1.49922 0.200781 0.899219 0.200781 0.499219 0.600781C0.0992189 1.00078 0.0992189 1.60078 0.499219 2.00078L5.39922 6.90078L0.499219 11.8008C0.299219 12.0008 0.199219 12.2008 0.199219 12.5008C0.199219 13.1008 0.599219 13.5008 1.19922 13.5008C1.49922 13.5008 1.69922 13.4008 1.89922 13.2008L7.59922 7.50078C7.89922 7.30078 7.89922 6.70078 7.49922 6.30078Z" fill="black"/> </svg> ');
    }

    &.dark {
      &:before {
        content: url('data:image/svg+xml;utf8,<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.49922 6.30078L1.89922 0.600781C1.49922 0.200781 0.899219 0.200781 0.499219 0.600781C0.0992189 1.00078 0.0992189 1.60078 0.499219 2.00078L5.39922 6.90078L0.499219 11.8008C0.299219 12.0008 0.199219 12.2008 0.199219 12.5008C0.199219 13.1008 0.599219 13.5008 1.19922 13.5008C1.49922 13.5008 1.69922 13.4008 1.89922 13.2008L7.59922 7.50078C7.89922 7.30078 7.89922 6.70078 7.49922 6.30078Z" fill="white"/> </svg> ');
      }
    }
  }
  .cardGrid-swiper-prev {
    &:before {
      content: url('data:image/svg+xml;utf8,<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.500781 7.69922L6.10078 13.3992C6.50078 13.7992 7.10078 13.7992 7.50078 13.3992C7.90078 12.9992 7.90078 12.3992 7.50078 11.9992L2.60078 7.09922L7.50078 2.19922C7.70078 1.99922 7.80078 1.79922 7.80078 1.49922C7.80078 0.899219 7.40078 0.499219 6.80078 0.499219C6.50078 0.499219 6.30078 0.599218 6.10078 0.799218L0.40078 6.49922C0.10078 6.69922 0.10078 7.29922 0.500781 7.69922Z" fill="black"/> </svg> ');
    }

    &.dark {
      &:before {
        content: url('data:image/svg+xml;utf8,<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.500781 7.69922L6.10078 13.3992C6.50078 13.7992 7.10078 13.7992 7.50078 13.3992C7.90078 12.9992 7.90078 12.3992 7.50078 11.9992L2.60078 7.09922L7.50078 2.19922C7.70078 1.99922 7.80078 1.79922 7.80078 1.49922C7.80078 0.899219 7.40078 0.499219 6.80078 0.499219C6.50078 0.499219 6.30078 0.599218 6.10078 0.799218L0.40078 6.49922C0.10078 6.69922 0.10078 7.29922 0.500781 7.69922Z" fill="white"/> </svg> ');
      }
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
      background: #000000;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(2);
        transition: all 0.3s ease;
      }
    }

    &.dark {
      span {
        background: #fff;
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
