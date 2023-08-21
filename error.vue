<template>
  <div
    class="relative block h-full font-sequel leading-tight"
    :class="'bg-gray-200'"
  >
    <Header />
    <main class="">
      <Page />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Page from './components/Page.vue'

const { actions, mutations, state } = useData()
const route = useRoute()

// set locale or default locale
mutations.setLocale(state, DEFAULT_LOCALE)

// only load settings if does not exist
await actions.loadSettings()

definePageMeta({
  layout: 'default',
})

await actions.loadStory({
  path: 'error-page',
})

</script>

<style lang="scss">
@import url('./assets/scss/styles.scss');
</style>
