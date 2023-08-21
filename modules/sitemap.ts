import { mkdirSync, writeFileSync } from 'fs'
import { Readable } from 'stream'
import { dirname } from 'path'
import { SitemapStream, streamToPromise } from 'sitemap'
import { defineNuxtModule, createResolver } from '@nuxt/kit'
import StoryblokClient, { StoryData } from 'storyblok-js-client'
import { useUrl } from '../composables/use-url'

const SITEMAP_PAGE_TYPES = [
  'acadamy-category',
  'academy',
  'academy-overview',
  'blog',
  'blog-archieve',
  'blog-overview',
  'crypto',
  'job',
  'job-overview',
  'page',
  'press',
  'press-archieve',
  'shop',
  'verify',
]

async function generateSitemap(routes: string[], hostname: string) {
  // https://github.com/ekalinin/sitemap.js#generate-a-one-time-sitemap-from-a-list-of-urls
  const stream = new SitemapStream({ hostname })
  return streamToPromise(Readable.from(routes).pipe(stream)).then((data) =>
    data.toString()
  )
}

function createSitemapFile(sitemap: string, filepath: string) {
  const dirPath = dirname(filepath)
  mkdirSync(dirPath, { recursive: true })
  writeFileSync(filepath, sitemap)
}

async function getRoutes(sbToken: string) {
  const storyblok = new StoryblokClient({
    accessToken: sbToken,
    cache: {
      clear: 'auto',
      type: 'memory',
    },
  })
  const { urlShorter } = useUrl()

  const res = await storyblok.get(
    `cdn/stories?filter_query[component][in]=${SITEMAP_PAGE_TYPES.join(
      ','
    )}&per_page=100&version=published`
  )
  const total = res.total
  const perPage = res.perPage
  const pages = Math.ceil(total / perPage)
  const routes: string[] = []

  for (let i = 1; i <= pages; i++) {
    const { data } = await storyblok.get(
      `cdn/stories?filter_query[component][in]=${SITEMAP_PAGE_TYPES.join(
        ','
      )}&per_page=100&version=published&page=${i}`
    )
    const stories = data.stories as StoryData<any>[]
    routes.push(
      ...stories.map((story) =>
        urlShorter(story.full_slug, story.full_slug.substring(0, 2))
      )
    )
  }

  return routes.filter((route) => route !== '/error-page/')
}

export default defineNuxtModule({
  meta: {
    name: 'sitemap',
    version: '0.0.1',
    configKey: 'sitemap',
    compatibility: { nuxt: '^3.0.0-rc.11' },
  },
  defaults: {
    sbToken: '',
    hostname: 'http://localhost:3000',
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const filePath = resolver.resolve(
      nuxt.options.srcDir,
      'node_modules/.cache/.sitemap/sitemap.xml'
    )

    nuxt.options.nitro.publicAssets = nuxt.options.nitro.publicAssets || []
    nuxt.options.nitro.publicAssets.push({
      baseURL: '/',
      dir: dirname(filePath),
    })

    nuxt.hook('pages:extend', async () => {
      const routes = await getRoutes(options.sbToken)
      const sitemap = await generateSitemap(routes, options.hostname)
      createSitemapFile(sitemap, filePath)
      // Added output to confirm that the sitemap has been created at the end of the build process
      console.log('Sitemap created')
    })
  },
})
