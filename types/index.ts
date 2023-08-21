import { Richtext } from 'storyblok-js-client'

export interface IDataSource {
  dimension_value: string | null
  value: string
  name: string
  id: number
}

export interface IStoryAsset {
  id: number
  alt: string
  name: string
  focus: null
  title: string
  filename: string
  copyright: string
  fieldtype: string
}

export interface IStoryLink {
  id: string
  url: string
  linktype: string
  fieldtype: string
  cached_url: string
}

export interface ILinkItem {
  component?: string
  text: string
  link: IStoryLink
}

export interface IButtonItem extends ILinkItem {
  component: 'button-item'
  is_secondary: boolean
  is_copy: boolean
}

export interface IIcon {
  icon: string
  type: 'fas'
  plugin: 'fontawesome-selector'
}

export interface IScoialItem {
  name: string
  image: IStoryAsset
  link: IStoryLink
  icon: IIcon
}

export interface IBannerItem {
  color_dark: string
  color_light: string
  visibility: 'Desktop' | 'Mobile' | 'Hidden'
  items: {
    text: Richtext
    link: IStoryLink
    image: IStoryAsset
  }[]
}

export type ISettings = {
  header_cta: [ILinkItem]
  header_list_items: {
    title: string
    link: IStoryLink
    items: ILinkItem[]
    featured_title: string
    featured_subtitle: string
    featured_link: IStoryLink
  }[]
  header_banner: {
    items: IBannerItem[]
  }[]
  footer_copyright: string
  footer_list_items: {
    title: string
    items: ILinkItem[]
  }[]
  footer_social_items: IScoialItem[]
  footer_newsletter_title: string
  footer_newsletter_button: string
  footer_newsletter_subtitle: Richtext
  footer_newsletter_placeholder: string
  footer_newsletter_terms: string
  footer_newsletter_success_title: string
  footer_newsletter_success_text: string
  footer_newsletter_mailerlite_group_id: string
  footer_bottom_list_items: ILinkItem[]

  footer_is_newsletter_hidden: boolean

  academy_category_back: string
  academy_category_back_link: IStoryLink

  blog_locale_title: string
  blog_toc_title: string
  blog_published_title: string
  blog_back: string
  blog_back_link: IStoryLink
  blog_social: string
  blog_author: string
  blog_buy: string
  blog_buy_link: IStoryLink
  academy_back: string
  academy_back_link: IStoryLink
  press_back: string
  press_back_link: IStoryLink

  copy_complete: string

  collapse_more: string
  collapse_less: string

  redirects: {
    from: string
    to: string
  }[]
}
