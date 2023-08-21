<template>
  <div v-if="story">
    <div class="bg-black text-white">
      <div class="">
        <!-- New Intro -->
        <div class="mb-4 bg-black sm:mb-6">
          <div class="container pt-40 md:pt-44 lg:pt-48">
            <div class="flex justify-between">
              <LinkC
                :link="backLink"
                class="flex items-center text-lg leading-relaxed text-gray-500"
              >
                <IconC class="mr-2" id="arrowLeft" color="#999EAB" />
                <span>{{ backText }}</span>
              </LinkC>

              <select
                v-if="localeOptions.length"
                class="border-none bg-transparent pr-8 pt-1 pl-0 text-lg leading-relaxed text-gray-500 outline-none focus:outline-none focus:ring-0 md:hidden"
                v-model="localeCurrentIndex"
              >
                <option
                  v-for="(local, index) in localeOptions"
                  :key="index"
                  :value="index"
                >
                  {{ local.name }}
                </option>
              </select>
            </div>
            <h1
              class="mt-12 mb-2 w-11/12 text-2xl leading-tight text-white sm:text-3xl md:mt-0 md:mb-6 md:w-10/12 md:text-5xl md:font-semibold lg:w-3/4 lg:text-6xlplus"
            >
              {{ story.name }}
            </h1>
            <p class="mb-8 text-base text-gray-600 md:hidden">{{ date }}</p>
          </div>

          <ImageC
            class="container--only-big"
            v-if="story.content && story.content.image"
            :src="story.content.image.filename"
            :alt="story.content.image.alt"
            :lazy="false"
            :width="1136"
            :height="638"
          ></ImageC>
        </div>
      </div>
    </div>

    <div class="relative" ref="container">
      <div
        class="w-full px-4 leading-normal text-gray-800 sm:mx-auto sm:leading-snug md:w-10/12 lg:mr-8 lg:w-8/12 lg:px-0 xl:mr-20 xl:w-7/12 2xl:mr-40 2xl:w-6/12 3xl:mx-auto 3xl:mr-auto 3xl:w-5/12"
      >
        <div class="mb-10 lg:mb-20">
          <div class="flex flex-row justify-between">
            <div class="flex flex-row items-center" v-if="author">
              <ImageC
                class="mr-2 inline h-14 w-14 rounded-full object-cover"
                :src="author.content.image.filename"
                :alt="author.content.image.alt"
                :lazy="false"
                :width="56"
                :height="56"
              />
              <div class="flex flex-col">
                <span class="mb-0.5 text-base font-semibold">{{
                  author.name
                }}</span>
                <span class="text-base text-gray-600">{{
                  author.content.role
                }}</span>
              </div>
            </div>

            <div class="mb-4 hidden flex-row md:flex">
              <div class="mt-2 mr-8 flex flex-col">
                <p class="mb-1 text-base font-semibold">
                  {{ settings.blog_published_title }}
                </p>
                <p class="mt-0.5 text-base text-gray-600">{{ date }}</p>
              </div>

              <div v-if="localeOptions.length" class="mt-2 flex flex-col">
                <p class="text-base font-semibold">
                  {{ settings.blog_locale_title }}
                </p>
                <select
                  class="border-none bg-transparent pr-8 pt-1 pl-0 text-base text-gray-600 outline-none focus:outline-none focus:ring-0"
                  v-model="localeCurrentIndex"
                >
                  <option
                    v-for="(local, index) in localeOptions"
                    :key="index"
                    :value="index"
                  >
                    {{ local.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div
          class="top-2 left-0 mt-16 mb-4 flex w-full items-center lg:absolute lg:mt-0 lg:mb-0 lg:w-4/12 lg:flex-col xl:w-5/12 2xl:w-6/12 3xl:w-5/12"
        >
          <div
            class="mr-4 hidden text-xl font-semibold text-black lg:mr-0 lg:mb-4 lg:block"
          >
            {{ settings.blog_social }}
          </div>
          <ShareNetwork
            class="mr-4 lg:mr-0 lg:mb-4"
            network="facebook"
            :url="url"
            :title="story.content.seo.title"
            :description="story.content.seo.description"
            :quote="story.content.social_quote"
            :hashtags="story.content.social_tags"
          >
            <IconC id="facebook" color="#6B6F79" />
          </ShareNetwork>
          <ShareNetwork
            network="twitter"
            :url="url"
            :title="story.content.seo.title"
            :description="story.content.seo.description"
            :quote="story.content.social_quote"
            :hashtags="story.content.social_tags"
          >
            <IconC id="twitter" color="#6B6F79" />
          </ShareNetwork>
        </div>

        <div>
          <h2 class="mb-4 text-2xl font-semibold lg:text-4xl">
            {{ story.name }}
          </h2>
          <p class="mb-10 text-xl lg:text-2xl">
            {{ story.content.subtitle }}
          </p>
        </div>

        <ul class="relative mb-20 text-gray-600 lg:hidden">
          <li class="text-lg font-semibold">{{ settings.blog_toc_title }}</li>
          <li
            v-for="(item, index) in tocItems"
            :key="index"
            @click="onToc(index)"
            class="mb-0 cursor-pointer py-2 pr-4 text-lg leading-snug text-gray-600 underline underline-offset-1 hover:text-black"
          >
            <span>
              {{ item.text }}
            </span>
          </li>
        </ul>

        <TextContent
          class="text-content"
          :blok="story.content.body[0]"
          :isNoPadding="true"
        />
      </div>

      <div class="relative hidden lg:block">
        <div
          ref="tocElement"
          class="mt-32 ml-4 h-screen w-3/12 xl:ml-10 2xl:ml-20 3xl:w-2/12"
          :class="{
            'fixed top-10': isSticked && !isEnded,
            'absolute bottom-0': isEnded,
          }"
        >
          <p
            class="border-l-4 border-transparent pl-6 pb-4 text-xl font-semibold"
          >
            {{ settings.blog_toc_title }}
          </p>
          <ul class="relative text-gray-400">
            <li
              v-for="(item, index) in tocItems"
              :key="index"
              @click="onToc(index)"
              class="mb-0 cursor-pointer py-2 pr-4 text-base leading-snug transition-all duration-200 hover:text-black"
              :class="[
                activeTocItemIndex === index
                  ? 'border-l-4 border-black bg-white py-4 pl-6 text-lg font-semibold text-black'
                  : 'pl-7',
              ]"
            >
              <span>
                {{ item.text }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-black py-10 text-white lg:py-20" v-if="author">
      <div class="container lg:flex">
        <div class="flex items-center lg:order-2 lg:w-4/12 lg:justify-center">
          <ImageC
            class="mb-4 w-full max-w-md rounded-lg object-cover md:mb-8 lg:mb-0 lg:max-w-none"
            :src="author.content.image.filename"
            :alt="author.content.image.alt"
          />
        </div>
        <div
          class="flex w-full items-center md:w-10/12 lg:order-1 lg:w-7/12 lg:pr-28"
        >
          <div>
            <div class="text-base">
              {{ author.content.role }}
            </div>
            <div class="mb-4 text-4xl font-semibold lg:mb-2">
              {{ author.content.name }}
            </div>
            <TextC
              class="mb-6 text-xl leading-snug text-gray-500"
              :text="author.content.text"
            />
            <ul class="flex items-center">
              <li
                v-for="(item, index) in author.content.social_items"
                :key="index"
                class="mr-6"
              >
                <LinkC :link="item.link">
                  <div v-if="item.icon && item.icon.icon">
                    <span class="sr-only">{{ item.name }}</span>
                    <LinkC :link="item.link">
                      <IconC
                        v-if="item.icon && item.icon.icon"
                        :id="item.icon.icon"
                        type="fa"
                      />
                    </LinkC>
                  </div>
                  <ImageC
                    v-else-if="item.image.filename"
                    :src="item.image.filename"
                    :alt="item.image.alt"
                  />
                </LinkC>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { AlternateObject } from 'storyblok-js-client'
import { IStoryLink } from '~/types'
import { getDateString } from '~/utils/date'
import { slugify } from '~/utils/slug'
import LinkC from './LinkC.vue'
import IconC from './IconC.vue'
import ImageC from './ImageC.vue'
import TextContent from './bloks/text-content/index.vue'
import TextC from './TextC.vue'

const HEADER_HEIGHT = 110 // + banner
const TOC_OFFSET_TOP = 20
const HEADLINE_SELECTOR = '.text-content h2:not(.newsletter-headline)'

const props = defineProps({
  backText: {
    type: String,
    required: true,
  },
  backLink: {
    type: Object as PropType<IStoryLink>,
    required: true,
  },
})

const { state } = useData()
const router = useRouter()

const story = state.value.story
const storyBody = state.value.storyBody
const authorMap = state.value.authorMap
const localeRelatedMap = state.value.localeRelatedMap
const settings = state.value.settings
const locale = state.value.locale
const locales = state.value.locales

const container = ref<HTMLElement>()
const tocElement = ref<HTMLElement>()

const isSticked = ref(false)
const isEnded = ref(false)

const activeTocItemIndex = ref(0)

const localeCurrentIndex = ref(0)

const percentage = ref(0)

watch(localeCurrentIndex, (index: number) => {
  if (localeOptions.value[index] && localeOptions.value[index].link) {
    router.push(`/${localeOptions.value[index].link}`)
  }
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  handleStickedItems()
  handleActiveTocItem()
}

const handleStickedItems = () => {
  if (!container.value || !tocElement.value) return

  const { clientHeight } = container.value
  const offsetTop = container.value.getBoundingClientRect().top + window.scrollY
  const endScrollPoint = clientHeight + offsetTop
  const MARGIN_TOP = 120 // the margin above the toc and author
  const END_OFFSET = 170

  isEnded.value =
    window.scrollY + window.innerHeight + END_OFFSET >= endScrollPoint
  isSticked.value = window.scrollY >= offsetTop - (MARGIN_TOP - HEADER_HEIGHT)
}

const handleActiveTocItem = () => {
  const $itemsPassed = tocItems.value.filter((_, index) => {
    const $item = document.querySelectorAll(HEADLINE_SELECTOR)[index]

    return (
      $item &&
      $item.getBoundingClientRect().top <= HEADER_HEIGHT + TOC_OFFSET_TOP + 1
    )
  })

  if ($itemsPassed.length) {
    activeTocItemIndex.value = tocItems.value.indexOf(
      $itemsPassed[$itemsPassed.length - 1]
    )
  }
}

const localeOptions = computed(() => {
  const alternates: AlternateObject[] = Object.values(localeRelatedMap)

  if (alternates.length) {
    return [
      // first is always current language
      {
        link: '',
        name:
          locales.find((locale) => locale.value === locale.value)?.name || '',
      },
      ...alternates.map((story) => ({
        // find the locale by the first two chars of the path (ex: "en", "de")
        name:
          locales.find((locale) => locale.value === story.full_slug.slice(0, 2))
            ?.name || '',
        link: story.full_slug,
      })),
    ]
  }

  return []
})

const tocItems = computed(() => {
  const contentItems: { content: { text: string }[]; type: string }[] = []
  storyBody
    .filter((story) => story.component === 'text-content')
    .forEach((story: any) => {
      contentItems.push(...story.text.content)
    })

  const headingItems = contentItems.filter((item) => item.type === 'heading' && item.attrs.level === 2)
  const tocItems = headingItems.map((item, index) => {
    const text = item.content && item.content[0] ? item.content[0].text : ''

    return {
      text: tocOverwriteItems.value[index] || text,
      id: slugify(text),
    }
  })

  return tocItems
})

const tocOverwriteItems = computed(() => {
  const items = story?.content.toc_overwrite_items || []

  return Object.fromEntries(
    items.map((item: { index: number; text: string }) => [
      item.index,
      item.text,
    ])
  )
})

const url = computed(
  () => `https://www.ngrave.io${router.currentRoute.value.path}`
)
const author = computed(() => authorMap[story?.content.author])
const date = computed(() => getDateString(story?.content.date))

const onToc = (index: number) => {
  const $headline = document.querySelectorAll(HEADLINE_SELECTOR)[index]

  if (!$headline) {
    return
  }
  window.scrollTo({
    top:
      $headline.getBoundingClientRect().top +
      window.scrollY -
      (HEADER_HEIGHT + TOC_OFFSET_TOP),
    behavior: 'smooth',
  })
}
</script>

<style scoped lang="scss"></style>
