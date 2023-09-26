<template>
  <div
    class="relative mx-auto w-full rounded-lg p-4 md:w-180 md:p-6"
    :class="state.isDark ? 'bg-gray-900' : 'bg-white'"
  >
    <div class="relative cursor-pointer" @click="toggleIsOpen">
      <div class="mb-1 pr-6 text-sm font-semibold uppercase text-yellow-900">
        {{ blok.label }}
      </div>
      <div class="mb-1 pr-8 text-2xl font-semibold leading-tight md:mb-2">
        {{ blok.title }}
      </div>
      <IconC
        id="arrowDown"
        :class="isOpen ? 'rotate-180 transform' : ''"
        class="absolute inset-y-1/2 right-4 translate-x-2/4 scale-150 transform md:right-8"
        :color="state.isDark ? '#fff' : '#000'"
      />
    </div>
    <div v-if="isOpen" class="pt-6">
      <TextC
        :text="blok.text"
        class="faq-item break-words text-xl leading-normal sm:leading-relaxed"
        :class="state.isDark ? 'text-gray-500' : 'gray-800'"
      />

      <div class="mt-8 flex items-center">
        <div v-for="(item, index) in blok.items" :key="index" v-editable="item">
          <div>
            <!-- Button -->
            <ButtonItem v-if="item.component === 'button-item'" :blok="item" />

            <!-- Link -->
            <LinkC
              v-if="item.component === 'link-item'"
              class="block text-center text-lg text-blue-400 underline underline-offset-1 sm:text-xl"
              :link="item.link"
            >
              {{ item.text }}
            </LinkC>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ISectionFaq } from '~/types/section'
import { EventBus, EVENT_CLOSE_FAQ } from '../../../../event-bus'
import IconC from '~~/components/IconC.vue'
import TextC from '~~/components/TextC.vue'
import LinkC from '~~/components/LinkC.vue'
import ButtonItem from '~~/components/ButtonItem.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionFaq>,
    required: true,
  },
})

const { state } = useData()
// const state.isDark = computed(() => state.value.state.isDark)

const isOpen = ref(false)

onMounted(() => {
  EventBus.$on(EVENT_CLOSE_FAQ, close)
})

onUnmounted(() => {
  EventBus.$off(EVENT_CLOSE_FAQ, close)
})

const close = () => {
  isOpen.value = false
}

const toggleIsOpen = () => {
  if (isOpen.value) {
    close()

    return
  }

  EventBus.$emit(EVENT_CLOSE_FAQ)
  isOpen.value = true
}
</script>

<style lang="scss" scoped>
.faq-item {
  ::v-deep {
    a {
      @apply text-blue-400;
    }
  }
}
</style>
