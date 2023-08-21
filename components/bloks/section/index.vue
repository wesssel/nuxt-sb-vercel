<template>
  <div :class="[background, { 'overflow-x-hidden': hasIconLoop }]" v-if="blok">
    <div
      class="py-16 lg:py-20"
      v-editable="blok"
      :class="{ container: !hasCardCarousel }"
    >
      <!-- Head -->
      <div
        v-if="blok.head_title || blok.head_subtitle || blok.head_items.length"
        :class="[
          blok.head_is_left
            ? 'justify-start'
            : 'flex-col items-center text-center',
          { container: hasCardCarousel },
        ]"
        class="mb-10 flex-col lg:mb-20 lg:flex"
      >
        <div
          class="flex flex-col lg:w-3/5"
          :class="blok.head_is_left ? '' : 'items-center'"
        >
          <h2
            v-if="blok.head_title"
            class="mb-4 text-3xl font-semibold lg:text-6xl"
          >
            {{ blok.head_title }}
          </h2>
          <div
            v-if="blok.head_subtitle"
            class="text-xl lg:text-2xl"
            :class="state.isDark ? 'text-gray-500' : 'text-gray-600'"
          >
            {{ blok.head_subtitle }}
          </div>

          <div
            class="mt-8 flex flex-row items-center"
            v-if="blok.head_items.length"
          >
            <div
              v-for="(headItem, index) in blok.head_items"
              :key="index"
              v-editable="headItem"
            >
              <div>
                <!-- Button -->
                <ButtonItem
                  :blok="headItem"
                  v-if="headItem.component === 'button-item'"
                />

                <!-- Link -->
                <LinkC
                  v-if="headItem.component === 'link-item'"
                  class="block text-center text-lg text-blue-400 underline underline-offset-1 sm:text-xl"
                  :link="headItem.link"
                >
                  {{ headItem.text }}
                </LinkC>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Body -->

      <div
        v-for="(row, indexRow) in blok.body_rows"
        :key="indexRow"
        :class="{ 'mb-20': row.component !== 'section-quote' }"
      >
        <!-- Section card cousel -->
        <SectionCardCarousel
          v-if="row.component === 'card-carousel'"
          :isHighlight="blok.is_highlight"
          :blok="row"
        />

        <!-- Icon loop -->
        <SectionIconLoop
          v-if="row.component === 'section-icon-loop'"
          :blok="row"
        />

        <!-- Quote -->
        <SectionQuote v-if="row.component === 'section-quote'" :blok="row" />

        <!-- Icon loop -->
        <SectionTechnicalSpecifications
          v-if="row.component === 'technical-specifications'"
          :blok="row"
        />

        <!-- Normal row -->
        <div
          v-if="row.component === 'section-row'"
          :class="[
            `grid lg:grid-cols-${row.cols}`,
            row.is_feature_background ? 'gap-4 md:gap-8' : 'gap-8 md:gap-20',
            row.cols > 1 ? 'md:grid-cols-2' : '',
          ]"
        >
          <div
            v-for="(bodyItem, index) in row.items"
            :key="index"
            v-editable="blok.body_rows[indexRow]"
            class="flex"
          >
            <!-- Section Animation -->
            <SectionAnimation
              v-if="bodyItem.component === 'section-animation'"
              v-editable="row.items[index]"
              :blok="row.items[index]"
            />

            <!-- Section Image -->
            <SectionImage
              v-if="bodyItem.component === 'section-image'"
              v-editable="row.items[index]"
              :blok="row.items[index]"
              :imageWidth="
                getImageWidth(bodyItem.component, parseInt(row.cols.toString()))
              "
            />

            <!-- Section Video -->
            <SectionVideo
              v-if="bodyItem.component === 'section-video'"
              v-editable="row.items[index]"
              :blok="row.items[index]"
            />

            <!-- Section FAQ -->
            <SectionFaq
              v-if="bodyItem.component === 'section-faq'"
              v-editable="row.items[index]"
              :blok="row.items[index]"
            />

            <!-- Section Feature -->
            <SectionFeature
              v-if="bodyItem.component === 'section-feature'"
              v-editable="row.items[index]"
              :blok="row.items[index]"
              :isBackground="row.is_feature_background"
              :isSplit="parseInt(row.cols.toString()) === 1"
              :imageWidth="
                getImageWidth(bodyItem.component, parseInt(row.cols.toString()))
              "
              :videoEmbedHeight="getVideoHeight(parseInt(row.cols.toString()))"
            />

            <!-- Section Card -->
            <SectionCard
              v-if="bodyItem.component === 'section-card'"
              v-editable="row.items[index]"
              :blok="row.items[index]"
            />

            <!-- Section Newsletter -->
            <SectionNewsletter
              v-if="bodyItem.component === 'section-newsletter'"
              v-editable="row.items[index]"
              :blok="row.items[index]"
            />
          </div>
        </div>

        <!-- Offset row -->
        <ul
          v-if="row.component === 'section-offset-row'"
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8"
        >
          <li
            v-for="(bodyItem, index) in row.items"
            :key="index"
            v-editable="blok.body_rows[indexRow]"
            class="last:pb-100 relative transform rounded-xl md:even:translate-y-16"
          >
            <!-- Section Linked Card -->
            <SectionLinkedCard
              v-if="bodyItem.component === 'section-linked-card'"
              v-editable="row.items[index]"
              :blok="row.items[index]"
            />
          </li>
        </ul>
      </div>

      <!-- Bottom -->
      <div
        class="mt-16 flex flex-row items-center justify-center"
        v-if="blok.bottom_items.length"
      >
        <div
          v-for="(bottomItem, index) in blok.bottom_items"
          :key="index"
          v-editable="bottomItem"
        >
          <!-- Button -->
          <ButtonItem
            v-if="bottomItem.component === 'button-item'"
            :blok="bottomItem"
          />

          <!-- Link -->
          <LinkC
            v-if="bottomItem.component === 'link-item'"
            :link="bottomItem.link"
            class="block text-center text-lg text-blue-400 underline underline-offset-1 sm:text-xl"
          >
            {{ bottomItem.text }}
          </LinkC>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { ISection } from '~/types/section'
import SectionVideo from './items/Video.vue'
import SectionFaq from './items/Faq.vue'
import SectionCard from './items/Card.vue'
import SectionImage from './items/Image.vue'
import SectionFeature from './items/Feature.vue'
import SectionLinkedCard from './items/LinkedCard.vue'
import SectionNewsletter from './items/Newsletter.vue'
import SectionAnimation from './items/Animation.vue'
import SectionIconLoop from './items/IconLoop.vue'
import SectionQuote from './items/Quote.vue'
import SectionTechnicalSpecifications from './items/TechnicalSpecifications.vue'
import LinkC from '~~/components/LinkC.vue'
import SectionCardCarousel from './items/CardCarousel.vue'
import ButtonItem from '~~/components/ButtonItem.vue'

const props = defineProps<{
  blok: ISection
}>()

const { state } = useData()
// const isDark = computed(() => state.value.isDark)

const isLast = (index: number) => {
  return props.blok.head_items.length - 1 === index
}

const background = computed(() => {
  if (state.value.isDark) {
    return props.blok.is_highlight
      ? 'bg-gray-900 text-white'
      : 'bg-black text-white'
  }

  return props.blok.is_highlight ? 'bg-gray-1000' : ''
})

const getVideoHeight = (cols: number): number => {
  // needed for youtube video to match images/videos
  switch (cols) {
    case 1: {
      return 384
    }
    case 2: {
      return 297
    }
    default: {
      return 224
    }
  }
}

const hasIconLoop = computed(() => {
  return !!props.blok.body_rows.find(
    (row) => row.component === 'section-icon-loop'
  )
})

const hasCardCarousel = computed(() => {
  return !!props.blok.body_rows.find((row) => row.component === 'card-carousel')
})

const getImageWidth = (
  component: 'section-image' | 'section-feature',
  cols: number
): number => {
  switch (component) {
    case 'section-feature': {
      switch (cols) {
        case 1: {
          return 568
        }
        case 2: {
          return 552
        }
        default: {
          return 358
        }
      }
    }
    case 'section-image': {
      switch (cols) {
        case 1: {
          return 1136
        }
        default: {
          return 528
        }
      }
    }
    default: {
      return 0
    }
  }
}
</script>
