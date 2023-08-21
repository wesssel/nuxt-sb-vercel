<template>
  <header
    class="absolute w-full self-start md:fixed md:top-0 md:z-50"
    v-if="settings"
  >
    <Banner class="relative z-40" :isWhite="!state.isDark" />
    <div
      :key="$route.fullPath"
      ref="header"
      class="animated sticky top-0 z-50 w-full border-b border-black border-opacity-20 py-1 md:relative lg:py-4"
      :class="[state.isDark ? 'text-white' : 'text-black']"
    >
      <div
        ref="header-bg"
        class="absolute top-0 h-full w-full"
        :class="[state.isDark ? 'bg-black' : 'bg-gray-200']"
      ></div>
      <div class="container relative z-10 flex items-center justify-between">
        <router-link to="/" aria-label="Home page">
          <IconC id="logo" :color="state.isDark ? '#fff' : '#000'" />
        </router-link>
        <!-- Desktop dropdown menu -->
        <ul class="hidden md:flex">
          <li
            class="group relative mx-6"
            v-for="(list, i) in settings.header_list_items"
            :key="i"
          >
            <LinkC
              class="text-base"
              :link="list.link"
              v-if="list.link && list.link.cached_url"
            >
              {{ list.title }}
            </LinkC>
            <div v-else class="flex cursor-pointer text-base">
              {{ list.title }}
              <IconC class="mt-2 ml-2" id="arrowDown" color="#676C7A" />
            </div>
            <div
              v-if="!list.link || !list.link.cached_url"
              class="invisible absolute top-10 left-1/2 z-30 w-72 -translate-x-1/2 transform text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100"
            >
              <!-- the gray point -->
              <div
                class="absolute left-1/2 -top-1 h-2.5 w-2.5 -translate-x-1/2 rotate-45 transform bg-gray-700"
              ></div>
              <!-- transperant element for hover between the dropdown and menu -->
              <div
                class="absolute left-1/2 -top-20 h-20 w-28 -translate-x-1/2 transform cursor-pointer"
              ></div>
              <ul
                class="rounded-tl-xl rounded-tr-xl bg-gray-700 px-8 pt-8 pb-2"
              >
                <li
                  class="mb-6 text-base"
                  v-for="(item, itemIndex) in list.items"
                  :key="itemIndex"
                >
                  <!-- Make sure "Product" is added to the label for accesibility -->
                  <LinkC
                    :link="item.link"
                    :aria-label="
                      getIsProduct(item.link.cached_url)
                        ? `Product ${item.text}`
                        : item.text
                    "
                  >
                    {{ item.text }}
                  </LinkC>
                </li>
              </ul>
              <LinkC
                :link="list.featured_link"
                v-if="list.featured_link && list.featured_link.cached_url"
                class="relative block rounded-bl-xl rounded-br-xl bg-gray-800 px-8 py-6"
              >
                <div class="flex">
                  <div class="mb-2 text-base font-semibold">
                    {{ list.featured_title }}
                  </div>
                  <IconC class="mt-1 ml-2" id="external" color="#FDAB0E" />
                </div>
                <div class="text-base font-light">
                  {{ list.featured_subtitle }}
                </div>
              </LinkC>
            </div>
          </li>
        </ul>
        <LinkC
          class="ml-auto mr-0 block md:mx-0"
          :link="settings.header_cta[0].link"
        >
          <ButtonC :text="settings.header_cta[0].text" />
        </LinkC>
        <IconC
          id="menu"
          class="cursor-pointer md:hidden"
          @click.native="toggleMenu"
          :color="!state.isDark ? '#000' : '#fff'"
        />
      </div>
      <!-- Mobile side menu -->
      <div
        class="overlay-menu fixed top-0 z-30 h-full w-screen transform overflow-y-scroll bg-black text-white transition md:hidden"
        :class="{ 'translate-x-full': !isMenuActive }"
      >
        <div class="flex h-full flex-col justify-between">
          <div class="container">
            <div class="mb-8 flex items-center justify-between py-1">
              <router-link to="/" aria-label="Home page">
                <IconC id="logo" color="#fff" />
              </router-link>
              <IconC
                @click.native="toggleMenu"
                id="close"
                color="#fff"
                class="cursor-pointer"
              />
            </div>
            <ul
              class="mb-14 flex border-b-2 border-gray-600 text-lg font-semibold"
            >
              <li
                v-for="(list, i) in settings.header_list_items"
                :key="i"
                class="xs:mr-10 relative mr-10 cursor-pointer py-5"
                @click="activeSideMenuIndex = i"
                :class="
                  activeSideMenuIndex === i ? 'text-white' : 'text-gray-600'
                "
              >
                <LinkC :link="list.link">
                  {{ list.title }}
                </LinkC>
                <div
                  v-if="activeSideMenuIndex === i"
                  class="absolute -bottom-0.5 h-1.5 w-full bg-gray-300"
                ></div>
              </li>
            </ul>
            <ul v-if="!currentList.link || !currentList.link.cached_url">
              <li
                v-for="(item, itemIndex) in currentList.items"
                :key="itemIndex"
                class="mb-10 text-xl"
              >
                <LinkC :link="item.link">
                  {{ item.text }}
                </LinkC>
              </li>
            </ul>
          </div>
          <LinkC
            :link="currentList.featured_link"
            v-if="
              currentList.featured_link && currentList.featured_link.cached_url
            "
            class="relative block bg-gray-800 px-12 pt-12 pb-24"
          >
            <IconC
              class="absolute right-8 top-8"
              id="external"
              color="#FDAB0E"
            />
            <div class="mb-2 text-xl">
              {{ currentList.featured_title }}
            </div>
            <div class="w-96 w-full text-base font-light">
              {{ currentList.featured_subtitle }}
            </div>
          </LinkC>
        </div>
      </div>
      <div
        class="gradient pointer-events-none absolute left-0 top-0 z-0 h-full w-full"
      ></div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { defineProps, computed, watch } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Banner from './Banner.vue'
import IconC from './IconC.vue'
import LinkC from './LinkC.vue'
import ButtonC from './ButtonC.vue'

const route = useRoute()
const { state } = useData()
const settings = state.value.settings
gsap.registerPlugin(ScrollTrigger)

// const isDark = computed(() => state.value.isDark)
// const isWhite = computed(() => !isDark.value)

const header = ref(null)
const headerBg = ref(null)

const isMenuActive = ref(false)
const activeSideMenuIndex = ref(0)

const currentList = computed(() => {
  return settings?.header_list_items[activeSideMenuIndex.value]
})

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value

  if (isMenuActive.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}

const getIsProduct = (url: string): boolean => {
  return !!['zero', 'graphene', 'liquid'].find((str: string) =>
    url.includes(str)
  )
}

const animateMe = () => {
  ScrollTrigger.refresh()
  if (window.scrollY === 0) {
    gsap.set(headerBg.value, { opacity: 0 })
    gsap
      .timeline({
        scrollTrigger: {
          trigger: header.value,
          invalidateOnRefresh: true,
          start: 'top top',
          end: 'bottom top',
        },
      })
      .to(headerBg.value, { opacity: 1, duration: 0.00001 })
  }
}

onMounted(() => {
  if (!state.value.isDark) {
    return
  }
  animateMe()
})

onUpdated(() => {
  if (!state.value.isDark) {
    return
  }
  animateMe()
})

watch(
  () => route,
  () => {
    isMenuActive.value = false
    activeSideMenuIndex.value = 0
    document.body.classList.remove('overflow-hidden')
  },
  { deep: true }
)
</script>
