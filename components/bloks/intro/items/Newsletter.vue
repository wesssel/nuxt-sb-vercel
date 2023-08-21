<template>
  <div :class="{ dark: state.isDark }">
    <div v-if="isSuccess">
      <h2 class="mb-2 text-2xl font-semibold">
        {{ blok.success_title }}
      </h2>
      <TextC
        class="mb-4 text-xl"
        :text="blok.success_richtext || blok.success_text"
        :applyStyles="true"
      />
    </div>
    <div class="sm:max-w-md lg:w-full" v-else>
      <form class="sm:flex" @submit.prevent="onSubmit">
        <label for="email-address" class="sr-only">Email address</label>
        <input
          v-model="email"
          id="email-address"
          name="email-address"
          type="email"
          autocomplete="email"
          required="true"
          class="w-full min-w-0 appearance-none rounded-md border border-transparent bg-white py-4 px-4 text-base text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 sm:py-2"
          :placeholder="blok.email_placeholder"
        />
        <button
          type="submit"
          class="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-700 px-5 py-3 text-base font-medium text-black shadow focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-700 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
        >
          {{ blok.button }}
        </button>
      </form>
      <TextC class="mt-3 text-sm" :text="blok.terms" :applyStyles="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, PropType } from 'vue'
import { IIntroNewsletter } from '~/types/section'
import TextC from '~~/components/TextC.vue'

const props = defineProps({
  blok: {
    type: Object as PropType<IIntroNewsletter>,
    required: true,
  },
})

const { state, actions } = useData()

// const isDark = computed(() => state.value.isDark)

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
