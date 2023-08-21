<template>
  <div class="w-full overflow-x-hidden bg-white" v-if="story && content">
    <Modal
      class="z-30"
      :isOpen="isModalOpen.features"
      @close="isModalOpen.features = false"
    >
      <div v-for="(item, index) in content.carousel_v2" :key="index">
        <p class="mb-3 text-xl font-semibold text-black">{{ item.title }}</p>
        <div
          class="mb-6 flex items-center justify-start"
          :class="index === item.features.length - 1 ? 'last:mb-0' : ''"
          :key="featureIndex"
          v-for="(feature, featureIndex) in item.features"
        >
          <ImageC :src="feature.filename" :alt="feature.alt" />
          <p class="ml-4 text-left text-gray-600">{{ feature.title }}</p>
        </div>
      </div>
    </Modal>

    <Modal
      class="z-30"
      :isOpen="isModalOpen.paymentOptions"
      @close="isModalOpen.paymentOptions = false"
    >
      <h2 class="mb-9 text-lg font-bold text-gray-800">
        {{ content.payment_options_title }}
      </h2>
      <div>
        <div
          class="mb-9 flex justify-between"
          v-for="(item, index) in content.payment_options"
          :key="index"
        >
          <div class="text-sm font-semibold text-gray-600">{{ item.text }}</div>
          <div class="flex items-center justify-center">
            <div
              class="mr-3 last:mr-0"
              v-for="(logo, logoIndex) in item.logos"
              :key="logoIndex"
            >
              <ImageC
                v-if="logo.image_color && !logo.is_hidden"
                :src="logo.image_color.filename"
                :alt="logo.image_color.alt"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <div class="relative grid h-full grid-cols-1 md:grid-cols-12">
      <div
        ref="left"
        class="pointer-events-auto relative col-span-7 mb-8 bg-gray-100 md:mb-0 xl:col-span-7"
      >
        <router-link to="/" aria-label="Home page">
          <IconC
            class="relative top-0 left-0 z-10 m-3 md:absolute md:left-12 md:top-8 md:m-0"
            id="logo"
          />
        </router-link>
        <div
          class="left-0 top-0 flex w-full flex-col items-center justify-center pt-0 md:absolute md:h-screen md:py-20"
        >
          <div class="carousel z-10 w-full lg:mb-10">
            <div
              id="swiper_next"
              @click="swiper.slideNext()"
              class="cursor-pointer swiper-next absolute top-1/2 right-0 z-20 flex h-14 w-14 -translate-y-1/2 transform items-center justify-center rounded-full p-4 text-black md:right-2 md:hover:bg-white xl:right-20"
            >
              <IconC id="arrowRight" />
            </div>
            <div
              id="swiper_prev"
              @click="swiper.slidePrev()"
              class="cursor-pointer swiper-next absolute top-1/2 left-0 z-20 flex h-14 w-14 -translate-y-1/2 transform items-center justify-center rounded-full p-4 text-black md:left-2 md:hover:bg-white xl:left-20"
            >
              <IconC id="arrowLeft" />
            </div>
            <div class="w-full md:mb-10" :class="`swiper-container`">
              <div class="swiper-wrapper w-full">
                <div
                  v-for="(item, index) in content.carousel_v2"
                  class="swiper-slide flex w-full flex-col items-center justify-center px-10 sm:px-16 xl:px-48"
                  :key="index"
                >
                  <p
                    class="hidden text-center text-4xl font-semibold uppercase md:block"
                  >
                    {{ item.title }}
                  </p>
                  <ImageC
                    style="max-height: 40vh"
                    :src="item.image.filename"
                    :alt="item.image.alt"
                  />
                  <div class="hidden grid-cols-3 lg:grid">
                    <div
                      class="flex flex-col items-center justify-start"
                      :key="index"
                      v-for="(feature, index) in item.features"
                    >
                      <ImageC
                        class="mb-4"
                        :src="feature.filename"
                        :alt="feature.alt"
                      />
                      <p class="px-3 text-center text-gray-600">
                        {{ feature.title }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            @click="isModalOpen.features = true"
            class="lOpen['features mb-6 cursor-pointer text-center text-sm text-blue-400 lg:hidden"
          >
            {{ content.left_benifits }}
          </a>
          <a
            @click="isModalOpen.paymentOptions = true"
            class="absolute top-0 right-0 z-20 flex items-center justify-center px-5 py-7 text-sm font-semibold text-gray-600 md:hidden"
          >
            <IconC id="info" class="mr-2" />
            {{ content.payment_options_title }}
          </a>
          <div
            v-if="content.payment_options"
            class="absolute top-0 right-0 mb-5 flex w-full justify-end p-3 pr-5 md:top-auto md:bottom-0 md:justify-center md:p-0 md:px-12"
          >
            <div class="mx-auto hidden md:flex">
              <div
                class="mr-2 flex border-r border-gray-275 last:border-0 xl:mr-4"
                v-for="(item, index) in content.payment_options"
                :key="index"
              >
                <div
                  class="mr-2 flex items-center justify-center xl:mr-4"
                  v-for="(logo, logoIndex) in item.logos"
                  :key="logoIndex"
                >
                  <ImageC
                    v-if="logo.image_gray && !logo.is_hidden"
                    :src="logo.image_gray.filename"
                    :alt="logo.image_gray.alt"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative col-span-5 flex flex-col justify-between pb-40 md:min-h-screen xl:col-span-5"
      >
        <div
          class="z-20 flex flex-col bg-white px-3 py-3 pb-10 md:min-h-screen md:px-7 md:pt-16"
        >
          <div class="top-0">
            <h1 class="mb-4 text-4xl font-bold text-black">
              {{ content.right_title }}
            </h1>
          </div>
          <div class="order-2">
            <TextC
              class="text-medium mb-6 text-sm text-gray-600 lg:mb-4"
              :text="content.right_text_v2"
            />

            <div
              class="mb-5 flex border-b border-gray-250 pb-6 md:mb-6 md:pb-6"
            >
              <div
                v-for="(item, index) in content.special_services"
                :key="index"
                class="mr-6 flex items-center last:mr-0 md:mr-5 lg:mr-6"
              >
                <ImageC
                  class="mr-2 w-5"
                  v-if="item.image"
                  :src="item.image.filename"
                  :alt="item.image.alt"
                />
                <TextC
                  class="text-sm font-normal text-gray-700 md:text-xs lg:text-sm"
                  :text="item.text"
                />
              </div>
            </div>
            <div
              v-if="content.trustpilot_link"
              class="order-1 mb-10 flex items-center"
            >
              <a
                class="block"
                :href="content.trustpilot_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  class="mb-1.5 w-28"
                  src="/images/trustpilot-logo.svg"
                  alt="trustpilot-logo"
                />
                <ImageC
                  class="mb-3 w-44"
                  v-if="content.trustpilot_image"
                  :src="content.trustpilot_image.filename"
                  :alt="content.trustpilot_image.alt"
                />
                <TextC :text="content.trustpilot_text" />
              </a>
            </div>
            <div
              v-else-if="content.right_subtitle_v2"
              class="order-1 mb-6 flex items-center md:mb-10"
            >
              <IconC id="calendarAlternative" class="mr-3" />
              <TextC
                class="max-w-50 md:max-w-none"
                :text="content.right_subtitle_v2"
              />
            </div>
          </div>
          <div
            v-if="isLoaded"
            class="order-2 md:order-3"
            v-for="(category, categoryTitle) in categoryMap"
            :key="categoryTitle"
          >
            <p class="mb-4 text-xl font-semibold text-black">
              {{ categoryTitle }}
            </p>
            <div
              class="mb-9 md:mb-6"
              v-for="(product, productId) in category"
              :key="productId"
            >
              <div class="text-md text-medium flex items-center text-black">
                <div
                  class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 p-2 lg:h-28 lg:w-28"
                >
                  <img :src="product.imageUrl" :alt="product.title" />
                </div>
                <div class="ml-6 flex-1 sm:ml-3 lg:ml-6">
                  <div class="flex w-full items-center justify-between">
                    <div class="pr-2">
                      <div
                        v-if="product.label"
                        class="mb-1 table rounded-full bg-yellow-900 py-1 px-2 text-xxs font-semibold uppercase text-black"
                      >
                        {{ product.label }}
                      </div>
                      <p class="mb-2 text-sm font-semibold text-gray-700">
                        {{ product.title }}
                        <span class="block text-yellow-50">{{
                          !product.isAvailable ? 'Sold Out' : ''
                        }}</span>
                      </p>
                      <div
                        class="flex align-top text-2xl font-semibold leading-none text-black"
                      >
                        €{{ product.price }}
                        <span class="ml-0.5 text-xxs leading-relaxed">{{
                          getPriceFraction(product.price.toFixed(2))
                        }}</span>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div
                        v-if="loadingIsShown[productId]"
                        class="rounded-lg bg-gray-200 px-3.5"
                      >
                        <IconC id="loading" color="#000" class="h-11 w-11" />
                      </div>
                      <div
                        v-else-if="
                          inputIsShown[productId] || selectIsShown[productId]
                        "
                        @click="
                          ;[
                            removeProduct(product),
                            (inputIsShown[productId] = false),
                            (selectIsShown[productId] = false),
                          ]
                        "
                        class="mr-5 cursor-pointer text-xs text-gray-600 underline"
                      >
                        {{ content.button_remove }}
                      </div>
                      <!-- Show is used because otherwise the select/input can not be updated -->
                      <div
                        v-if="product.isAvailable"
                        v-show="!loadingIsShown[productId]"
                      >
                        <div
                          v-if="!selectIsShown[productId]"
                          @click="
                            ;[
                              (selectIsShown[productId] = true),
                              addProduct(product, 1),
                            ]
                          "
                          class="cursor-pointer rounded-lg bg-yellow-50 px-5 py-3 text-sm font-semibold hover:bg-yellow-1000"
                        >
                          {{ content.button_add }}
                        </div>
                        <select
                          v-if="
                            !inputIsShown[productId] && selectIsShown[productId]
                          "
                          @input="
                            $event.target.value <= 9
                              ? addProduct(
                                  product,
                                  parseInt($event.target.value)
                                )
                              : handleQuantity(
                                  parseInt($event.target.value),
                                  productId
                                )
                          "
                          class="text-md w-16 rounded-lg border border-gray-300 pr-3 focus:border-2 focus:border-black focus:ring-0"
                        >
                          <option
                            :selected="inputValue[productId] === quantity"
                            :key="quantity"
                            v-for="quantity in 9"
                            :value="quantity"
                          >
                            {{ quantity }}
                          </option>
                          <option value="10">10+</option>
                        </select>
                        <input
                          ref="input"
                          @input="
                            inputValue[productId] = parseInt(
                              $event.target.value
                            )
                          "
                          :class="!inputIsShown[productId] ? 'hidden' : ''"
                          class="h-10 w-16 rounded-md border border-gray-300 px-3 py-5 text-base"
                        />
                      </div>
                      <div
                        v-if="inputIsShown[productId]"
                        @click="
                          ;[
                            addProduct(
                              product,
                              parseInt(inputValue[productId])
                            ),
                            handleQuantity(
                              parseInt(inputValue[productId]),
                              productId
                            ),
                          ]
                        "
                        class="ml-1 cursor-pointer rounded-lg bg-yellow-50 px-4 py-3 text-sm hover:bg-yellow-1000"
                      >
                        {{ content.button_save }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref="pay"
          class="pointer-events-none fixed bottom-0 z-20 w-full md:absolute md:top-0 md:flex md:h-screen md:items-end"
        >
          <div
            class="pointer-events-auto relative h-auto w-full md:flex md:flex-col md:justify-end"
          >
            <span
              class="gradient absolute -top-14 h-14 w-full md:relative md:top-0"
            ></span>
            <div
              :class="{ 'hidden opacity-0': !priceTotal }"
              class="border-b border-gray-300 bg-gray-1000 px-3 py-2 md:py-5 md:px-7"
            >
              <div
                class="flex items-center justify-between font-semibold text-black"
              >
                <p>{{ content.right_checkout_total }}</p>
                <p class="flex align-top text-2xl leading-none">
                  €{{ priceTotal.toFixed() }}
                  <span class="ml-0.5 text-xxs leading-relaxed">{{
                    getPriceFraction(priceTotal.toFixed(2))
                  }}</span>
                </p>
              </div>
            </div>
            <div
              class="w-full bg-gray-1000 px-3 py-4 pb-8 md:px-7 md:pt-4 md:pb-0"
            >
              <ButtonC
                class="w-full font-semibold"
                :isDisabled="isCheckoutDisabled"
                :isLoading="isLoading"
                :text="content.right_checkout_button"
                @click.native="onCheckout"
              />
              <div class="flex items-center justify-center">
                <div
                  class="crypto-pay-banner scale-110 transform md:scale-75"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, Pagination, Navigation } from 'swiper'
import { waitForElm } from '../composables/use-wait'
import Client, { ShopifyBuy } from 'shopify-buy'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { Richtext, StoryData } from 'storyblok-js-client'
import ImageC from './ImageC.vue'
import { IStoryAsset } from '~/types'
import Modal from './Modal.vue'

import 'swiper/css'
import 'swiper/css/pagination'
import IconC from './IconC.vue'
import TextC from './TextC.vue'
import ButtonC from './ButtonC.vue'

gsap.registerPlugin(ScrollTrigger)

type ShopifyItem = {
  id: string
  sku: string
  name: string
  type: string
  image: string
  variants: boolean
  description: string
}

type ShopContent = {
  right_title: string
  right_text_v2: string
  right_subtitle_v2: Richtext
  left_benifits: string
  left_return: string
  left_cancel: string
  right_checkout_button: string
  right_checkout_total: string
  button_add: string
  button_remove: string
  button_save: string
  carousel_v2: {
    items: {
      title: string
      image: IStoryAsset
      features: IStoryAsset[]
    }
  }
  categories: {
    title: string
    items: {
      label: string
      product: { items: [ShopifyItem] }
    }[]
  }[]
  trustpilot_image: IStoryAsset
  trustpilot_link: string
  trustpilot_text: Richtext
  payment_options_title: string
  payment_options: {
    text: string
    logos: {
      image_gray: IStoryAsset
      image_color: IStoryAsset
      is_hidden: boolean
    }[]
  }[]
  special_services: {
    items: {
      text: Richtext
      image: IStoryAsset
    }[]
  }
}

interface Product {
  title: string
  label?: string
  id: string
  variantId: string
  imageUrl: string
  price: number
  isAvailable: boolean
}

declare global {
  interface Window {
    fbq?: (type: string, action: string, obj: any) => void
  }
}

const config = useRuntimeConfig()

useHead({
  script: config.VUE_IS_TEST
    ? []
    : [
        {
          src: 'https://js.crypto.com/sdk?publishable-key=pk_live_amdChS8Ut8RhaV5Su2d3PuVx',
          defer: true,
          load: async () => {
            // sleep
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // @ts-ignore
            if (window.cryptopay) {
              // @ts-ignore
              window.cryptopay.BannerHelper.createBanner({
                theme: 'black-font-on-transparent',
                size: 'medium',
                font: 'sf pro text',
                bannerMessage: 'earn-rebate',
                targetNodes: '.crypto-pay-banner',
              })
            }
          },
        },
      ],
})

const shop = ref(null)
const swiper = ref()
const swiperContainer = '.swiper-container'

onMounted(async () => {
  await waitForElm(swiperContainer)
  swiper.value = new Swiper(swiperContainer, {
    allowTouchMove: true,
    centeredSlides: true,
    slideToClickedSlide: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints: {
      768: {
        spaceBetween: 40,
      },
    },
    modules: [Pagination, Navigation],
  })

  shop.value = Client.buildClient({
    domain: 'shop.ngrave.io',
    storefrontAccessToken: '43f55cd5ddb85119d3506bf5e234f2da',
  })

  await loadProducts()
  onScroll()
  isLoaded.value = true
})

const { state } = useData()
const story = state.value.story

const left = ref<HTMLElement | null>(null)
const pay = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement[]>([])

const isLoaded = ref(false)
const isModalOpen = ref({
  features: false,
  paymentOptions: false,
})

const inputIsShown = ref<boolean[]>([])
const selectIsShown = ref<boolean[]>([])
const loadingIsShown = ref<{ [id: string]: boolean }>({})
const inputValue = ref<number[]>([])
const productMap = ref<{ [id: string]: Product }>({})
const categoryMap = ref<{ [id: string]: { [id: string]: Product } }>({})

const cartMap = ref<{
  [variantId: string]: {
    id: string
    price: number
    variantId: string
    quantity: number
  }
}>({})

const checkoutId = ref('')
const priceTotal = ref(0)

const content = computed(() => story?.content as ShopContent)

const handleQuantity = (quantity: number, productId: number) => {
  if (quantity === 10) {
    inputIsShown.value[productId] = true
    inputIsShown.value.push()
    setTimeout(() => {
      input.value[productId].focus()
    }, 5)
  }
  if (quantity < 10) {
    inputIsShown.value[productId] = false
    inputIsShown.value.push()
  }
}

const loadProducts = async () => {
  const rawData = await shop.value.product.fetchAll()

  productMap.value = Object.fromEntries(
    rawData.map((entry) => [
      entry.title.toString(),
      {
        id: entry.id.toString(),
        variantId: entry.variants[0].id.toString(),
        title: entry.title,
        imageUrl: entry.images[0].src,
        price: entry.variants.length
          ? parseFloat((entry as any).variants[0].price.amount)
          : 0,
        isAvailable: entry.variants.length
          ? entry.variants[0].available
          : false,
      },
    ])
  )

  categoryMap.value = Object.fromEntries(
    content.value.categories.map((category) => [
      category.title,
      Object.fromEntries(
        category.items.map((item) => [
          item.product.items[0].name,
          {
            ...productMap.value[item.product.items[0].name],
            label: item.label || '',
          },
        ])
      ),
    ]) || []
  )
}

const onScroll = () => {
  ScrollTrigger.matchMedia({
    '(min-width: 768px)': () => {
      ScrollTrigger.create({
        trigger: left.value,
        start: 'top top',
        end: '+=100%',
        invalidateOnRefresh: true,
        pinSpacing: false,
        pin: left.value,
      })
      ScrollTrigger.create({
        trigger: pay.value,
        start: 'top top',
        end: '+=100%',
        invalidateOnRefresh: true,
        pin: pay.value,
      })
    },
  })
}

const createCheckout = async () => {
  checkoutId.value = (await shop.value.checkout.create()).id.toString()
}

const getPriceFraction = (price: string): string => {
  const res = price.match('[^.]*$')

  return res ? res[0] : ''
}

const isLoading = computed(() => {
  return Object.values(loadingIsShown.value).some((v) => !!v)
})

const isCheckoutDisabled = computed(() => !priceTotal.value || isLoading.value)

const addProduct = async (product: Product, quantity: number) => {
  loadingIsShown.value[product.id] = true

  if (!checkoutId.value) {
    await createCheckout()
  }

  let checkout = await shop.value.checkout.fetch(checkoutId.value)
  const lineItemsToUpdate = [
    {
      variantId: product.variantId,
      quantity: quantity,
    },
  ]

  checkout = await shop.value.checkout.addLineItems(
    checkoutId.value,
    lineItemsToUpdate
  )

  cartMap.value = Object.fromEntries(
    checkout.lineItems.map((entry) => [
      entry.variant.id.toString(),
      {
        id: entry.id.toString(),
        price: entry.variant.price,
        variantId: entry.variant.id.toString(),
        quantity: entry.quantity,
      },
    ])
  )

  priceTotal.value = parseInt(checkout.subtotalPriceV2.amount)

  loadingIsShown.value[product.id] = false
}

const updateCart = (checkout: ShopifyBuy.Cart) => {
  priceTotal.value = parseInt(checkout.subtotalPriceV2.amount)
  cartMap.value = Object.fromEntries(
    checkout.lineItems.map((item) => [
      item.variant.id.toString(),
      {
        id: item.id.toString(),
        price: parseFloat((item as any).variant.price.amount),
        variantId: item.variant.id.toString(),
        quantity: item.quantity,
      },
    ])
  )
}

const removeProduct = async (product: Product) => {
  loadingIsShown.value[product.id] = true

  if (
    !cartMap.value[product.variantId] ||
    cartMap.value[product.variantId].quantity === 0
  ) {
    return
  }

  if (!checkoutId.value) {
    await createCheckout()
  }

  const id = cartMap.value[product.variantId].id
  const checkout = await shop.value.checkout.updateLineItems(checkoutId.value, [
    {
      id,
      variantId: product.variantId,
      quantity: 0,
    },
  ])

  inputValue.value[id] = 0
  inputIsShown.value[id] = false
  selectIsShown.value[id] = false
  loadingIsShown.value[product.id] = false

  updateCart(checkout)
}

const onCheckout = async () => {
  if (!checkoutId.value) {
    return
  }

  const checkout = await shop.value.checkout.fetch(checkoutId.value.toString())
  const url = (checkout as any).webUrl.replace(
    'https://ngrave-io.myshopify.com',
    'https://shop.ngrave.io'
  )

  window.location.href = url
}
</script>

<style scoped lang="scss">
::v-deep {
  .pin-spacer {
    pointer-events: none;
  }
  .gradient {
    background: rgb(255, 255, 255);
    background: -moz-linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background: -webkit-linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  p a {
    text-decoration: none;
    color: rgb(53, 53, 53);
  }
}
</style>
