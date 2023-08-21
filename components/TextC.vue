<template>
  <div :class="{ 'text-style': applyStyles }">
    <client-only v-if="config.VUE_IS_PREVIEW">
      <Component :is="textComponent" />
    </client-only>
    <Component v-else :is="textComponent" />
  </div>
</template>

<script lang="ts" setup>
import { PropType, compile } from 'vue'
import { Richtext } from 'storyblok-js-client'

const renderStoryblokRichText = (richText: Richtext) => {
  const richTextJson = JSON.stringify(richText)
  const richTextObject = JSON.parse(richTextJson)

  const loopThroughNodes = (node) => {
    const localNode = { ...node }
    localNode.content.map((content) => {
      if (content.content) {
        content = loopThroughNodes(content)
      }
      if (content.marks) {
        content.marks.map((mark) => {
          if (mark.type === 'link' && mark.attrs?.href) {
            const isNoFollow = mark.attrs.href?.includes('rel=nofollow')

            if (isNoFollow) {
              mark.attrs.href = mark.attrs.href.replace('rel=nofollow', '')
              mark.attrs.rel = 'nofollow'
            }
          }
          return mark
        })
      }
      return content
    })
    return localNode
  }

  return loopThroughNodes(richTextObject)
}

const config = useRuntimeConfig()
const props = defineProps({
  text: {
    type: [Object, String] as PropType<string | Richtext>,
    required: true,
  },
  applyStyles: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})

const stringify = (obj: any) => {
  const string = JSON.stringify(obj)

  // escape single quotes for alternative symbol
  return string.replace(/'/g, '’')
}

const textParsed = computed(() => {
  if (typeof props.text === 'string') {
    return props.text
  }

  return renderStoryblokRichText(props.text)
})

const textRendered = computed(() => {
  if (typeof textParsed.value === 'string') {
    return textParsed.value
  }

  const storyblokApi = useStoryblokApi()
  storyblokApi.setComponentResolver((component, blok) => {
    switch (component) {
      case 'text-content-quote': {
        return `<text-content-quote :body='${stringify(blok)}'/>`
      }
      case 'text-content-video': {
        return `<text-content-video :body='${stringify(blok)}'/>`
      }
      case 'text-content-button': {
        return `<text-content-button :body='${stringify(blok)}'/>`
      }
      case 'text-content-table': {
        return `<text-content-table :body='${stringify(blok)}'/>`
      }
      case 'text-content-widget': {
        return `<text-content-widget :body='${stringify(blok)}'/>`
      }
      case 'text-content-image': {
        return `<text-content-image :body='${stringify(blok)}'/>`
      }
      case 'text-content-related-posts': {
        return `<text-content-related-posts :body='${stringify({
          title: blok.title,
          posts: blok.posts.map((p) => ({
            name: p.name,
            full_slug: p.full_slug,
          })),
        })}'/>`
      }
      case 'text-content-newsletter': {
        return `<text-content-newsletter :body='${stringify(blok)}'/>`
      }
      default: {
        return ''
      }
    }
  })

  return storyblokApi.richTextResolver.render(textParsed.value)
})

const textComponent = computed(() => {
  return defineNuxtComponent({
    render: compile(textRendered.value),
  })
})
</script>

<style lang="scss">
.text-style {
  h2,
  h3,
  h4 {
    @apply mb-4 font-semibold leading-snug;
  }

  h2 {
    @apply text-2xl lg:text-3xl;
  }

  h3 {
    @apply text-xl lg:text-2xl;
  }

  p {
    @apply mb-4;
  }

  blockquote {
    @apply text-center text-3xl font-semibold leading-tight lg:text-5xl;
  }

  strong {
    @apply font-semibold;
  }

  ul {
    @apply ml-6 mb-10 list-disc;
  }

  ol {
    @apply ml-6 mb-10 list-decimal;
  }

  li {
    @apply mb-2;
  }

  img {
    @apply mx-auto mb-10 rounded;
  }

  a {
    @apply text-blue-400 underline underline-offset-1;
  }
}
</style>
