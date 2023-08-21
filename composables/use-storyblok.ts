import { StoryData } from 'storyblok-js-client'

export async function useStoryblokStory<ContentBlok, RelsBlock = any>(
  path: string,
  parameters: { [k: string]: string | number | null } = {}
) {
  const config = useRuntimeConfig()
  const storyblokApi = useStoryblokApi()
  const story = ref<StoryData<ContentBlok>>()
  const stories = ref<StoryData<ContentBlok>[]>([])
  const rels = ref<StoryData<RelsBlock>[]>([])

  const { data, headers } = await storyblokApi.get(path, {
    version: config.public.VUE_IS_PREVIEW ? 'draft' : 'published',
    ...parameters,
  })

  if (data.story) {
    story.value = data.story
  }

  if (data.rels) {
    rels.value = data.rels
  }

  if (data.stories) {
    stories.value = data.stories
  }

  return {
    story,
    rels: rels,
    stories: stories,
    total: headers.total,
  }
}
