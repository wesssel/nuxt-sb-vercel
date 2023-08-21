<template>
  <main id="main" role="main" class="font-sequel leading-tight">
    <NuxtPage />
  </main>
</template>

<script lang="ts" setup>
import { DEFAULT_LOCALE } from '../composables/use-data'

const route = useRoute()
const { state, mutations, actions } = useData()

// set locale or default locale
mutations.setLocale(state, route.params.locale?.toString() || DEFAULT_LOCALE) // maybe use first locale instead

// load all locales (needed in [...slug])
if (state.value.locales.length === 0) {
  await actions.loadLocales()
}

// only load settings if does not exist
if (!state.value.settings || !state.value.settings._uid) {
  await actions.loadSettings()
}
</script>
