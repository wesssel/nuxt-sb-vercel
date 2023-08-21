import { Richtext } from 'storyblok-js-client'
import { IButtonItem, ILinkItem, IScoialItem, IStoryAsset, IStoryLink } from '.'

export interface ISectionFeature {
  component: 'section-feature'

  link: IStoryLink
  image: IStoryAsset
  video?: IStoryAsset
  video_embed_url?: string
  label: string
  title: string
  subtitle: string

  bottom_text: string
  bottom_link_title: string
  bottom_link: IStoryLink | {}
  bottom_social_items: IScoialItem[]
}

export interface ISectionIconLoop {
  component: 'section-icon-loop'

  items: IStoryAsset[]
}

export interface ISectionQuote {
  component: 'section-quote'

  items: {
    title: Richtext
    logo: IStoryAsset
    image: IStoryAsset
    link_text: string
    link: IStoryLink
  }[]
}

export interface ISectionButtonImage {
  component: 'section-button-image'

  link: IStoryLink
  image: IStoryAsset
}

export interface ISectionCard {
  component: 'section-card'

  label: string
  title: string
  subtitle: string
  is_left: boolean
  is_dark: boolean
  is_reversed: boolean
  items: (IButtonItem | ISectionButtonImage | ILinkItem)[]
  image: IStoryAsset
  background: IStoryAsset
  background_color: { color: string }
}

export interface ISectionAnimation {
  component: 'section-animation'

  type: 'zero' | 'liquid' | 'graphene'
  image: IStoryAsset
  items: ISectionFeature[]
}

export interface ISectionAnimation {
  component: 'section-animation'

  type: 'zero' | 'liquid' | 'graphene'
  image: IStoryAsset
}

export interface ISectionImage {
  component: 'section-image'

  image: IStoryAsset
}

export interface ISectionFaq {
  component: 'section-faq'

  label: string
  title: string
  text: Richtext
  items: (IButtonItem | ILinkItem)[]
}

export interface ISectionVideo {
  component: 'section-video'

  title: string
  embed_url: string
  placeholder_image: IStoryAsset
  video: IStoryAsset
  is_dark: boolean
}

export interface ISectionNewsletter {
  component: 'section-newsletter'

  image: IStoryAsset
  title: string
  subtitle: string
  email_placeholder: string
  button: string
  terms: Richtext
  mailerlite_group_id: string
  success_title: string
  success_text: string
  success_richtext: string
}

export interface ISectionLinkedCard {
  component: 'section-linked-card'

  link: IStoryLink
  label: string
  title: string
  is_dark: boolean
  subtitle: string
  image: IStoryAsset
}

export interface ISectionCardCarousel {
  component: 'card-carousel'

  _uid: string
  title: string // deprecated
  subtitle: string // deprecated
  is_title_center: boolean // deprecated
  is_background_white: boolean
  items:
    | {
        component: 'card-carousel-item'
        image: IStoryAsset
        title: string
        overline: string
        link: IStoryLink
      }
    | {
        component: 'card-carousel-item-split'
        image: IStoryAsset
        title: string
        text: string
        link: IButtonItem[]
        is_dark: boolean
      }[]
}

export interface ISectionRow {
  component: 'section-row'

  items: (
    | ISectionCard
    | ISectionFeature
    | ISectionImage
    | ISectionVideo
    | ISectionNewsletter
    | ISectionFaq
    | ISectionAnimation
  )[]
  cols: number
  is_feature_background: boolean
}

export interface ISectionOffsetRow {
  component: 'section-offset-row'

  items: ISectionLinkedCard[]
}

export interface ISectionTechnicalSpecifications {
  component: 'technical-specifications'

  title: string
  items: {
    title: string
    text: Richtext
    image: IStoryAsset
    is_long_content_hidden: boolean
    image_items: {
      title: string
      text: string
    }[]
  }[]
}

export interface ISection {
  component: 'section'
  is_highlight: boolean

  head_is_left: boolean
  head_items: (IButtonItem | ILinkItem)[]
  head_subtitle: string
  head_title: string

  body_rows: (
    | ISectionRow
    | ISectionOffsetRow
    | ISectionIconLoop
    | ISectionTechnicalSpecifications
    | ISectionCardCarousel
    | ISectionQuote
  )[]

  bottom_items: (IButtonItem | ILinkItem)[]
}

export interface IIntroNewsletter {
  email_placeholder: string
  button: string
  terms: Richtext
  mailerlite_group_id: string
  success_title: string
  success_text: string
  success_richtext: Richtext
}

export interface IIntro {
  is_dark: boolean
  is_left: boolean
  background_image: IStoryAsset
  image: IStoryAsset
  label: string
  title: Richtext
  is_title_h2: boolean
  subtitle: string
  items: IButtonItem[]
  newsletter?: [IIntroNewsletter]
}
