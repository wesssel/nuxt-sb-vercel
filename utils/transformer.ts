import { StoryData } from 'storyblok-js-client'
import { ISection, ISectionFeature } from '~/types/section'
import { IStoryLink } from '../types'
import { getDateString } from './date'

export const BLOK_CATEGORY_CARDS = 'blog-category-cards'

type BlokCartegory = {
  component: string
  button_link: IStoryLink
  button_text: string
  category: string
}

export function transformBlogCategories(
  storyBody: BlokCartegory[],
  categoryMap: { [key: string]: StoryData },
  authorMap: { [key: string]: StoryData },
  stories: StoryData[]
) {
  return storyBody.map((blok) => {
    // maybe move to mixin if used again
    if (blok.component === BLOK_CATEGORY_CARDS) {
      const category = categoryMap[blok.category]
      const sectionCategory: ISection = {
        component: 'section',
        is_highlight: false,
        head_is_left: true,
        head_items: [],
        head_title: category?.name || '',
        head_subtitle: category?.content?.subtitle || '',
        body_rows: [
          {
            component: 'section-row',
            cols: 3,
            is_feature_background: true,
            items: stories
              .filter(
                (story: StoryData) => story.content.category === blok.category
              )
              // unique by slug
              .filter(
                (story: StoryData, index: number, self: StoryData[]) =>
                  self.findIndex((s) => s.full_slug === story.full_slug) ===
                  index
              )
              .map((story: StoryData): ISectionFeature => {
                const author = authorMap[story.content.author]?.name || ''
                const date = getDateString(story.content.date)

                return {
                  component: 'section-feature',
                  link: {
                    id: story.uuid,
                    url: '',
                    linktype: 'story',
                    fieldtype: 'multilink',
                    cached_url: story.full_slug,
                  },
                  image: story.content.image,
                  label: category?.name || '',
                  title: story.name,
                  subtitle: story.content.subtitle,

                  bottom_text: `${author} - ${date}`,
                  bottom_link_title: '',
                  bottom_link: {},
                  bottom_social_items: [],
                }
              }),
          },
        ],
        bottom_items: [
          {
            component: 'link-item',
            text: blok.button_text,
            link: blok.button_link,
          },
        ],
      }

      return sectionCategory
    }

    return blok
  })
}
