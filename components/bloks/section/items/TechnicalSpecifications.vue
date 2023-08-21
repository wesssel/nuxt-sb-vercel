<template>
  <div :class="{ 'bg-black': state.isDark }">
    <div class="container py-16 lg:py-20">
      <div class="flex flex-col items-center" v-if="blok.title">
        <div class="mb-14 lg:mb-28 lg:w-3/5">
          <h2 class="text-center text-3xl font-semibold lg:text-6xl">
            {{ blok.title }}
          </h2>
        </div>
      </div>
      <div class="m-auto lg:max-w-4xl">
        <div
          v-for="(item, index) in blok.items"
          :key="index"
          class="mb-6 flex flex-col pb-6 last:mb-0 last:border-b-0 last:pb-0 lg:mb-10 lg:flex-row lg:border-b lg:border-gray-600 lg:pb-10"
          v-editable="blok.items[index]"
        >
          <div
            class="mb-2 border-b border-gray-600 pb-1 text-2xl font-semibold leading-relaxed lg:mb-0 lg:mr-10 lg:w-2/6 lg:border-0 lg:pb-0"
          >
            {{ item.title }}
          </div>
          <div class="lg:w-4/6">
            <TextC
              :class="[
                state.isDark ? 'text-gray-500' : 'text-gray-600',
                {
                  'text-item':
                    item.is_long_content_hidden && !isHiddenMap[index],
                },
              ]"
              class="text-lg leading-relaxed transition-all lg:text-lg"
              v-if="item.text"
              :text="item.text"
            />

            <!-- absolute img -->
            <div
              class="relative w-72 pt-14 md:w-160 lg:w-auto"
              v-if="item.image && item.image.filename"
            >
              <ImageC
                class="mb-10 w-full lg:mb-14"
                :src="item.image.filename"
                :alt="item.image.alt"
                :width="550"
              />
              <ul v-if="item.image_items.length">
                <li
                  v-for="(imageItem, imageItemIndex) in item.image_items"
                  :key="imageItemIndex"
                  class=""
                  :class="
                    [
                      'first absolute top-4 left-6 md:top-6 md:left-40 lg:left-48',
                      'second absolute top-10 right-0 md:top-28 lg:top-24',
                      'thirds absolute top-36 left-0 md:top-52 lg:left-4',
                      'fourth flex',
                    ][imageItemIndex]
                  "
                  v-editable="item.image_items[imageItemIndex]"
                >
                  <div class="mr-2 text-sm md:text-lg" v-if="imageItem.title">
                    {{ imageItem.title }}
                  </div>
                  <div
                    class="text-gray-600"
                    :class="
                      [
                        'text-xs md:text-lg',
                        'text-xs md:text-lg',
                        'text-xs md:text-lg',
                        'text-base md:text-lg',
                      ][imageItemIndex]
                    "
                    v-if="imageItem.text"
                  >
                    {{ imageItem.text }}
                  </div>
                </li>
              </ul>
            </div>

            <div
              v-if="item.is_long_content_hidden"
              class="mt-4 cursor-pointer text-lg underline lg:text-lg"
              :class="state.isDark ? 'text-gray-500' : 'text-gray-600'"
              @click="onToggle(index)"
            >
              {{
                isHiddenMap[index]
                  ? settings.collapse_less
                  : settings.collapse_more
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ISectionTechnicalSpecifications } from '~/types/section'
import ImageC from '~/components/ImageC.vue'
import TextC from '~/components/TextC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionTechnicalSpecifications>,
    required: true,
  },
})

const { state } = useData()
// const state.isDark = computed(() => state.value.isDark)
const settings = state.value.settings

const isHiddenMap = ref<{ [index: number]: boolean }>({})

onMounted(() => {
  isHiddenMap.value = Object.fromEntries(
    props.blok.items.map((_, index) => [index, false])
  )
})

const onToggle = (index: number) => {
  isHiddenMap.value[index] = !isHiddenMap.value[index]
}
</script>

<style lang="scss" scoped>
.text-item {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
