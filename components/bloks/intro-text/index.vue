<template>
  <div class="container py-8 text-center pt-40 lg:pt-32 lg:pb-20 ">
    <div class="mx-auto mb-8 w-full sm:mb-20 lg:max-w-3xl">
      <TextC
        v-if="blok.overline"
        class="text-base"
        :class="blok.is_overline_orange ? 'text-yellow-700' : 'text-gray-400'"
        :text="blok.overline"
      />

      <TextC
        v-if="blok.title"
        class="mx-auto mb-6 text-3xl font-semibold sm:text-6xl lg:max-w-2xl"
        :text="blok.title"
      />

      <TextC
        v-if="blok.subtitle"
        class="whitespace-break mx-auto text-xl leading-snug sm:text-2xl lg:max-w-3xl"
        :text="blok.subtitle"
      />

      <LinkC :link="blok.button_link" v-if="isButtonShown" class="my-10 block">
        <ButtonC :text="blok.button_text" />
      </LinkC>
    </div>

    <!-- Image is optional -->
    <figure
      class="mx-auto flex max-h-160 w-full items-center justify-items-center overflow-hidden rounded-xl"
      v-if="blok.image && blok.image.filename"
    >
      <ImageC
        class="w-full"
        :src="blok.image.filename"
        :alt="blok.image.alt"
        :lazy="false"
        :width="1150"
      />
    </figure>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { Richtext } from 'storyblok-js-client'
import { IStoryAsset, IStoryLink } from '~/types'
import TextC from '~~/components/TextC.vue'
import LinkC from '~~/components/LinkC.vue'
import ButtonC from '~~/components/ButtonC.vue'
import ImageC from '~~/components/ImageC.vue'

const props = defineProps<{
  blok: {
    overline?: string
    title: Richtext
    subtitle: Richtext
    image?: IStoryAsset
    is_overline_orange: boolean
    button_text?: string
    button_link?: IStoryLink
  }
}>()

const isButtonShown = computed(() => {
  return (
    !!props.blok.button_link &&
    !!props.blok.button_link.cached_url &&
    !!props.blok.button_text
  )
})
</script>

<!-- 
<script lang="ts">
import { Richtext } from 'storyblok-js-client'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IStoryAsset, IStoryLink } from '~/types'

@Component({})
export default class IntroText extends Vue {
  @Prop() blok!: {
    overline?: string
    title: Richtext
    subtitle: Richtext
    image?: IStoryAsset
    is_overline_orange: boolean
    button_text?: string
    button_link?: IStoryLink
  }

  get isButtonShown(): boolean {
    return (
      !!this.blok.button_link &&
      !!this.blok.button_link.cached_url &&
      !!this.blok.button_text
    )
  }
}
</script> -->
