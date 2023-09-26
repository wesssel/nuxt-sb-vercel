<template>
  <div
    class="mb-8 text-white"
    :class="[{ dark: state.isDark }, !isContentBlock && 'container lg:p-16']"
  >
    <div
      class="card group relative lg:rounded-lg"
      :class="[
        { 'h-80 sm:h-64': !blok.image.filename && !isContentBlock },
        isContentBlock && 'rounded-lg bg-black p-4 py-8 md:p-8 lg:p-16',
      ]"
    >
      <figure
        class="item-center flex justify-center overflow-hidden lg:rounded-xl"
        :class="
          isContentBlock
            ? 'absolute left-0 top-0 z-0 hidden h-full w-full lg:block'
            : 'h-128 sm:h-96'
        "
        v-if="blok.image && blok.image.filename"
      >
        <ImageC
          class="h-full w-full object-cover lg:rounded-lg"
          :src="blok.image.filename"
          :alt="blok.image.alt"
        />
      </figure>
      <div
        :class="
          isContentBlock
            ? 'relative max-w-lg'
            : 'absolute bottom-0 left-0 p-8 md:p-16'
        "
        class="z-10 w-full"
      >
        <div :class="!isContentBlock && 'xl:flex xl:items-end'">
          <div :class="!isContentBlock && 'xl:w-0 xl:flex-1'">
            <h2
              class="newsletter-headline text-3xl font-extrabold leading-tight tracking-tight"
            >
              {{ blok.title }}
            </h2>
            <p
              class="mt-3 max-w-3xl leading-6"
              :class="isContentBlock ? 'text-base' : 'text-lg'"
            >
              {{ blok.subtitle }}
            </p>
          </div>
          <div
            :class="!isContentBlock && 'sm:w-full sm:max-w-md xl:mt-0 xl:ml-8'"
            class="relative mt-4 md:mt-8"
          >
            <div v-if="isSuccess">
              <h2 class="mb-2 text-2xl font-semibold">
                {{ blok.success_title }}
              </h2>
              <TextC
                class="mb-4 text-xl"
                :text="blok.success_richtext || blok.success_text"
              />
            </div>
            <div v-else>
              <form
                :class="isContentBlock ? 'flex' : 'sm:flex'"
                @submit.prevent="onSubmit"
              >
                <label for="email-address" class="sr-only">Email address</label>
                <input
                  v-model="email"
                  id="email-address"
                  name="email-address"
                  type="email"
                  autocomplete="email"
                  required=""
                  class="w-full min-w-0 appearance-none rounded-md border border-transparent bg-white py-4 px-4 text-base font-semibold text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 sm:py-2"
                  :placeholder="blok.email_placeholder"
                />
                <button
                  type="submit"
                  class="flex items-center justify-center rounded-md border border-transparent bg-yellow-700 px-5 py-3 text-base font-semibold text-black shadow focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-700 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                  :class="
                    isContentBlock ? 'ml-3 w-40 sm:w-auto' : 'mt-3 w-full'
                  "
                >
                  {{ blok.button }}
                </button>
              </form>
              <TextC class="mt-3 text-sm text-gray-400" :text="blok.terms" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ISectionNewsletter } from '~/types/section'
import ImageC from '~~/components/ImageC.vue'
import TextC from '~~/components/TextC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<ISectionNewsletter>,
    required: true,
  },
  isContentBlock: {
    type: Boolean,
    required: true,
  },
})

const { state, actions } = useData()
// const state.isDark = computed(() => state.value.isDark)

const email = ref('')
const isSuccess = ref(false)

const isEmailValid = computed(() => /\S+@\S+\.\S+/.test(email.value))

const onSubmit = async () => {
  if (isEmailValid.value === false) {
    return
  }

  try {
    await actions.newsletterSubscribe({
      email: email.value,
      groupId: props.blok.mailerlite_group_id,
    })

    isSuccess.value = true
  } catch (e) {
    console.log(e)
    alert(e)
  }
}
</script>

<style lang="scss" scoped>
.dark {
  ::v-deep {
    a {
      color: #fff;
    }
  }
}
</style>
