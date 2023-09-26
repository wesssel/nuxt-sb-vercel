import StoryblokClient, { StoryData } from 'storyblok-js-client'
import { defineNuxtModule } from '@nuxt/kit'

async function getRedirects(sbToken: string) {
  const storyblok = new StoryblokClient({
    accessToken: sbToken,
    cache: {
      clear: 'auto',
      type: 'memory',
    },
  })

  const redirectsStory = await storyblok.get('cdn/stories/redirects', {
    version: 'published',
  })

  const redirects = redirectsStory.data.story.content.items as {
    from: string
    to: string
  }[]

  return redirects
}

export default defineNuxtModule({
  meta: {
    name: 'redirects',
    version: '0.0.1',
    configKey: 'redirects',
    compatibility: { nuxt: '^3.0.0-rc.11' },
  },
  defaults: {
    sbToken: '',
  },
  async setup(options, nuxt) {
    const redirects = await getRedirects(options.sbToken)
    const routeRules = Object.fromEntries(
      redirects.map((r) => [r.from, { redirect: r.to }])
    )

    nuxt.options.nitro.routeRules = routeRules
  },
})
