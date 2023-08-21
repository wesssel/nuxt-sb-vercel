<template>
  <div class="container flex justify-between pb-20 text-base">
    <div>
      <router-link
        class="flex items-center"
        v-if="prevItem"
        :to="prevItem.link"
      >
        <IconC id="arrowLeft" />
        <span class="ml-4">Previous</span>
      </router-link>
    </div>
    <ul class="hidden text-gray-500 sm:flex">
      <li
        class="mx-3"
        v-for="(item, index) in items"
        :key="index"
        :class="{ 'text-black': currentIndex === index }"
      >
        <router-link :to="item.link"> {{ item.text }}</router-link>
      </li>
    </ul>
    <div>
      <router-link
        class="flex items-center"
        v-if="nextItem"
        :to="nextItem.link"
      >
        <span class="mr-4">Next</span>
        <IconC id="arrowRight" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import IconC from './IconC.vue'

const props = defineProps({
  currentIndex: {
    type: Number,
    required: true,
  },
  items: {
    type: Array as PropType<
      {
        link: string
        text: string
      }[]
    >,
    required: true,
  },
})

const nextItem = computed(() => props.items[props.currentIndex + 1])
const prevItem = computed(() => props.items[props.currentIndex - 1])
</script>

<style scoped lang="scss"></style>
