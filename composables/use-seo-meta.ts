import { StoryData } from 'storyblok-js-client'

export function useSeoMeta(
  story: StoryData,
  locale: string,
  authorMap?: Record<string, StoryData>
) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const domain = config.VUE_DOMAIN
  const isHome = story.name === 'Home'
  const url =
    domain + (isHome === false ? `/${urlShorter(story.full_slug, locale)}` : '')

  const structuredData = computed(() => {
    const data: any = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'organization',
          name: 'Ngrave.IO NV',
          url: domain,
          sameAs: [
            'https://discord.com/invite/gapxmWEBNJ',
            'https://twitter.com/ngrave_official',
            'https://www.facebook.com/ngrave.io/',
            'https://www.instagram.com/ngrave.io/',
            'https://github.com/ngraveio',
            'https://www.linkedin.com/company/ngrave/',
            'https://www.youtube.com/channel/UCJDIZfcaACOTMT_tc3IKaAg/featured',
          ],
          logo: {
            '@type': 'ImageObject',
            '@id': 'logo',
            url: `${domain}/mstile-310x150.png`,
            caption: 'Ngrave IO Logo',
          },
          image: { '@id': 'logo' },
        },
        {
          '@type': 'WebPage',
          datePublished: story.first_published_at,
          dateModified: story.published_at,
          '@id': 'webpage',
          publisher: { '@id': 'organization' },
          url,
          inLanguage: locale,
          name: story.content.seo?.title,
          image: {
            '@type': 'ImageObject',
            '@id': 'primaryimage',
            url: story.content.seo?.og_image || `${domain}/mstile-310x150.png"`,
            caption: story.content.seo?.og_image
              ? story.content.seo?.title
              : 'Logo',
          },
          primaryImageOfPage: { '@id': 'primaryimage' },
          description: story.content.seo?.description,
          breadcrumb: { '@id': 'breadcrumb' },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'breadcrumb',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: -1,
              item: {
                '@type': 'WebPage',
                '@id': domain,
                url: domain,
                name: 'Home',
              },
            },
            ['academy', 'blog', 'press', 'job'].includes(
              story.content.component
            ) && {
              '@type': 'ListItem',
              position: -1,
              item: {
                '@type': 'WebPage',
                // press doesn't have an overview
                '@id': `${domain}/${story.content.component}/${
                  ['academy', 'blog', 'job'].includes(story.content.component)
                    ? 'overview'
                    : ''
                }`,
                url: `${domain}/${story.content.component}/${
                  ['academy', 'blog', 'job'].includes(story.content.component)
                    ? 'overview'
                    : ''
                }`,
                name: 'Overview',
              },
            },
            isHome === false && {
              '@type': 'ListItem',
              position: -1,
              item: {
                '@type': 'WebPage',
                '@id': url,
                url,
                name: story.name,
              },
            },
          ]
            .filter((item) => !!item)
            .map((item, index) => ({ ...item, position: index + 1 })),
        },
      ],
    }

    if (
      ['blog', 'academy', 'press'].includes(story.content.component) &&
      authorMap
    ) {
      data['@graph'].push({
        '@type': 'Article',
        '@id': 'article',
        isPartOf: { '@id': 'webpage' },
        publisher: { '@id': 'organization' },
        author: authorMap[story.content.author]
          ? {
              '@type': 'Person',
              name: authorMap[story.content.author].name,
            }
          : { '@id': 'organization' },
        headline: story.name,
        dateModified: story.published_at,
        mainEntityOfPage: 'webpage',
        image: { '@id': 'primaryimage' },
      })
    }

    return data
  })

  return {
    htmlAttrs: {
      lang: locale,
    },
    script: [
      {
        innerHTML: JSON.stringify(structuredData.value),
        type: 'application/ld+json',
      },
      { src: '/scripts/font-awesome.js' },
    ],
    title: story?.content.seo?.title || `Ngrave | ${story?.name}`,
    link: [
      {
        rel: 'canonical',
        href: config.DOMAIN + urlShorter(route.path, locale),
      },
    ],
    meta: [
      {
        name: 'robots',
        content: `${
          story?.content.meta_robots_no_index ? 'noindex' : 'index'
        }, follow`,
      },
      {
        hid: 'description',
        name: 'description',
        property: 'description',
        content: story?.content.seo?.description || '',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content: story?.content.seo?.og_description || '',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: story?.content.seo?.og_image || '/images/meta-default.jpg',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: story?.content.seo?.og_title || '',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        property: 'twitter:title',
        content: story?.content.seo?.twitter_title || '',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        property: 'twitter:description',
        content: story?.content.seo?.twitter_description || '',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        property: 'twitter:image',
        content:
          story?.content.seo?.twitter_image || '/images/meta-default.jpg',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image',
      },
    ].filter((meta) => meta.content),
  }
}
