<template>
  <footer
    v-if="settings"
    :class="state.isDark ? 'bg-black text-white dark' : 'bg-white text-black'"
    aria-labelledby="footer-heading"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>

    <div class="container py-12 lg:py-16">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
          <div
            v-for="(list, listIndex) in settings.footer_list_items"
            :key="listIndex"
          >
            <h3
              :class="state.isDark ? 'text-white' : 'text-black'"
              class="text-sm font-semibold uppercase tracking-wider"
            >
              {{ list.title }}
            </h3>
            <ul role="list" class="mt-4 space-y-4">
              <li
                v-for="item in list.items"
                :key="item.text"
                @click="onLink(item.link.cached_url, $event)"
              >
                <LinkC
                  :link="item.link"
                  :class="
                    state.isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-700'
                  "
                  class="text-base"
                >
                  {{ item.text }}
                </LinkC>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="mt-12 xl:mt-0"
          id="footer-newsletter"
          v-if="!settings.footer_is_newsletter_hidden"
        >
          <h3
            :class="state.isDark ? 'text-white' : 'text-black'"
            class="text-sm font-semibold uppercase tracking-wider"
          >
            {{ settings.footer_newsletter_title }}
          </h3>
          <TextC
            class="mt-4 text-base text-gray-300"
            :class="state.isDark ? 'text-gray-300' : 'text-gray-600'"
            :text="settings.footer_newsletter_subtitle"
          />

          <div v-if="isSuccess" class="mt-4">
            <h2
              :class="state.isDark ? 'text-white' : 'text-black'"
              class="mb-2 text-xl font-semibold"
            >
              {{ settings.footer_newsletter_success_title }}
            </h2>
            <p
              :class="state.isDark ? 'text-gray-300' : 'text-gray-600'"
              class="mb-4 text-base"
            >
              {{ settings.footer_newsletter_success_text }}
            </p>
          </div>
          <div v-else>
            <form class="mt-4 sm:flex sm:max-w-md" @submit.prevent="onSubmit">
              <label for="email-address" class="sr-only">Email address</label>
              <input
                v-model="email"
                type="email"
                name="email-address"
                id="email-address"
                autocomplete="email"
                required=""
                :class="state.isDark ? 'bg-white' : 'bg-gray-100'"
                class="w-full min-w-0 appearance-none rounded-md border border-transparent py-4 px-4 text-base text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 sm:py-1"
                :placeholder="settings.footer_newsletter_placeholder"
              />
              <div class="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  class="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-700 py-4 px-4 text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 focus:ring-offset-gray-800 sm:py-2"
                >
                  {{ settings.footer_newsletter_button }}
                </button>
              </div>
            </form>
            <TextC
              class="mt-3 text-sm"
              :class="state.isDark ? 'text-white' : 'text-black'"
              :text="settings.footer_newsletter_terms"
            />
          </div>
        </div>
      </div>
      <div
        class="mt-8 justify-between border-t border-gray-800 pt-8 lg:flex xl:items-center"
      >
        <div class="flex space-x-6 md:order-2">
          <LinkC
            v-for="item in settings.footer_social_items"
            :key="item.name"
            :link="item.link"
            :class="
              state.isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-700'
            "
            class="0"
          >
            <span class="sr-only">{{ item.name }}</span>
            <IconC
              v-if="item.icon && item.icon.icon"
              :id="item.icon.icon"
              type="fa"
            />
          </LinkC>
        </div>
        <div
          class="flex flex-col items-start xl:flex-row xl:items-center xl:justify-between"
        >
          <ul
            role="list"
            class="mt-8 mb-8 flex lg:mt-0 xl:order-1 xl:mb-0 xl:mt-0 xl:ml-4 xl:px-6"
          >
            <li
              v-for="(item, itemIndex) in settings.footer_bottom_list_items"
              :key="itemIndex"
              class="mr-4 last:mr-0"
              @click="onLink(item.link.cached_url, $event)"
            >
              <LinkC
                :link="item.link"
                :class="
                  state.isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-500 hover:text-gray-600'
                "
                class="text-base xl:text-sm"
              >
                {{ item.text }}
              </LinkC>
            </li>
          </ul>
          <p
            :class="state.isDark ? 'text-gray-400' : 'text-gray-600'"
            class="md:order-0 text-base"
          >
            {{ settings.footer_copyright }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import LinkC from './LinkC.vue'
import TextC from './TextC.vue'
import IconC from './IconC.vue'

declare global {
  interface Window {
    CookieScript: {
      instance: {
        show: () => {}
      }
    }
  }
}

const { state, actions } = useData()
const settings = state.value.settings
// const isDark = computed(() => state.value.isDark)

const email = ref('')
const isSuccess = ref(false)

const isEmailValid = computed(() => {
  return /\S+@\S+\.\S+/.test(email.value)
})

const onSubmit = async () => {
  if (isEmailValid.value === false) {
    return
  }

  try {
    await actions.newsletterSubscribe({
      email: email.value,
      groupId: settings?.footer_newsletter_mailerlite_group_id || '',
    })

    isSuccess.value = true
  } catch (e) {
    console.log(e)
    alert(e)
  }
}

const onLink = (url: string, event: Event) => {
  if (url === '#cookie') {
    event.preventDefault()
    window.CookieScript.instance.show()
  }
}
</script>

<style lang="scss" scoped>
#footer-newsletter {
  ::v-deep {
    a {
      color: rgb(53, 53, 53);
    }
  }
}
footer.dark #footer-newsletter {
  ::v-deep {
    a {
      color: #d1d5db;
      text-decoration: underline;
    }
  }
}
</style>
