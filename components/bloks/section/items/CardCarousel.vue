<template>
  <div class="overflow-hidden">
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
    <div class="carousel -mb-20">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in blok.items"
            :key="index"
            class="swiper-slide card group relative rounded-xl pb-0"
          >
            <div
              class="flex h-full flex-col-reverse items-center rounded p-6 md:flex-row"
              :class="background(item)"
              v-if="item.component === 'card-carousel-item-split'"
            >
              <figure
                class="relative flex h-full shrink-0 items-center justify-center"
                :class="
                  !item.title && !item.text
                    ? 'mx-auto w-full'
                    : 'w-3/5 md:w-2/5'
                "
                v-if="item.image && item.image.filename"
              >
                <ImageC
                  :src="item.image.filename"
                  :alt="item.image.alt"
                  :width="305"
                />
              </figure>
              <div
                v-if="item.title || item.text"
                class="flex shrink-0 flex-col justify-center md:w-3/5 md:pl-6"
              >
                <div
                  class="mb-1 text-center text-3xl font-semibold leading-tight md:mb-2 md:text-left"
                  :class="item.is_dark ? 'text-white' : 'text-black'"
                >
                  {{ item.title }}
                </div>
                <div
                  class="mb-4 text-center text-lg leading-snug md:text-left"
                  :class="item.is_dark ? 'text-white' : 'text-black'"
                >
                  {{ item.text }}
                </div>
                <div
                  v-for="(button, index) in item.link"
                  :key="index"
                  v-editable="button"
                >
                  <ButtonItem
                    style="width: fit-content"
                    class="mx-auto mb-2 table rounded-lg py-3 px-6 text-center text-base md:mr-4 md:inline-block md:text-left"
                    :blok="button"
                  />
                </div>
              </div>
            </div>
            <LinkC
              :link="item.link"
              v-if="item.component === 'card-carousel-item'"
            >
              <div
                class="overlay ease absolute z-10 h-full w-full rounded-xl bg-gradient-to-t from-black to-transparent opacity-75 filter transition-all group-hover:opacity-30"
              ></div>
              <figure
                class="change-transform flex h-80 items-center justify-items-center overflow-hidden rounded-xl sm:h-128"
                v-if="item.image && item.image.filename"
              >
                <ImageC
                  class="ease h-full w-full transform object-cover saturate-70 filter transition-all duration-250 group-hover:scale-102 group-hover:saturate-100"
                  :width="825"
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

      <div
        class="cardGrid-swiper-nav relative mx-auto mt-8 w-full md:w-9/12 lg:w-8/12 xl:w-1/2"
        v-if="swiper"
      >
        <div
          :id="`${blok._uid}cardCarousel-swiper_pagination`"
          class="cardGrid-swiper-pagination -ml-2 p-4"
        ></div>
        <div class="cardGrid-swiper-buttonWrap h-full">
          <div
            @click="swiper.slidePrev()"
            :id="`${blok._uid}cardCarousel-swiper_prev`"
            class="cardGrid-swiper-prev mr-5 h-8 w-8 p-4 text-white cursor-pointer"
          ></div>
          <div
            @click="swiper.slideNext()"
            :id="`${blok._uid}cardCarousel-swiper_next`"
            class="cardGrid-swiper-next h-8 w-8 p-4 text-white cursor-pointer"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISectionCardCarousel } from '~/types/section'
import { PropType } from 'vue'
import { Swiper } from 'swiper'
import LinkC from '~/components/LinkC.vue'
import TextC from '~/components/TextC.vue'
import ImageC from '~/components/ImageC.vue'
import ButtonItem from '~~/components/ButtonItem.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionCardCarousel>,
    required: true,
  },
  isHighlight: {
    type: Boolean,
    required: true,
  },
})

const background = (item: any) => {
  if (props.isHighlight) {
    return item.is_dark ? 'bg-black' : 'bg-white'
  }
  return item.is_dark ? 'bg-gray-900' : 'bg-white'
}

const swiper = ref<Swiper>()
const swiperContainer = '.swiper-container'

onMounted(async () => {
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
        slidesPerView: 1.125,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
    },
  })  
})
</script>
<style lang="scss" scoped>
::v-deep {
  .cardGrid-swiper-nav {
    display: flex;
    justify-content: space-between;
    padding: 0 5% 0 5%;
    @media only screen and (min-width: 1024px) {
      padding: 0;
    }
    @media only screen and (min-width: 1280px) {
      padding: 0 4px 0 4px;
    }
  }
  .cardGrid-swiper-next,
  .cardGrid-swiper-prev {
    height: 1rem;
    width: 1rem;
    border-radius: 100%;
    transition: all 0.3s ease;
    background: grey;
    &:hover {
      transition: all 0.3s ease;
      opacity: .6;
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
