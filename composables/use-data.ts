import { ref, Ref } from 'vue'
import {
  AlternateObject,
  StoryblokComponent,
  StoryblokResult,
  StoryData,
} from 'storyblok-js-client'
import { IDataSource, ISettings } from '~/types'
import axios from 'axios'

export const DEFAULT_LOCALE = 'en'

interface RootState {
  version: 'draft' | 'published'
  cacheVersion: string
  settings: ISettings | null
  story: StoryData | null
  storyBody: StoryblokComponent<string>[]
  stories: StoryData[] // this is used for stories related to a post or category
  dataSources: IDataSource[]
  authorMap: { [id: string]: StoryData }
  categoryMap: { [id: string]: StoryData }
  localeRelatedMap: { [id: string]: StoryData }
  storiesPerPage: number
  storiesTotal: number
  isDark: boolean
  locales: IDataSource[]
  locale: string
}

const state = ref<RootState>({
  version: 'draft',
  cacheVersion: '',
  settings: null,
  story: null,
  storyBody: [],
  stories: [],
  dataSources: [],
  authorMap: {},
  categoryMap: {},
  localeRelatedMap: {},
  storiesPerPage: 0,
  storiesTotal: 0,
  isDark: true,
  locales: [],
  locale: DEFAULT_LOCALE,
})

export default function useData() {
  const storyblokApi = useStoryblokApi()

  const mutations = {
    setVersion(_state: Ref<RootState>, version: 'draft' | 'published') {
      _state.value.version = version
    },
    setSettings(_state: Ref<RootState>, settings: ISettings) {
      _state.value.settings = settings
    },
    setCacheVersion(_state: Ref<RootState>, version: string) {
      _state.value.cacheVersion = version
    },
    setStory(_state: Ref<RootState>, story: StoryData) {
      _state.value.story = story
    },
    setStoryBody(
      _state: Ref<RootState>,
      storyBody: StoryblokComponent<string>[]
    ) {
      _state.value.storyBody = storyBody
    },
    setStories(_state: Ref<RootState>, stories: StoryData[]) {
      _state.value.stories = stories
    },
    setAuthorMap(
      _state: Ref<RootState>,
      authorMap: { [id: string]: StoryData }
    ) {
      _state.value.authorMap = authorMap
    },
    setCategoryMap(
      _state: Ref<RootState>,
      categoryMap: { [id: string]: StoryData }
    ) {
      _state.value.categoryMap = categoryMap
    },
    setLocaleRelatedMap(
      _state: Ref<RootState>,
      localeRelatedMap: { [id: string]: StoryData }
    ) {
      _state.value.localeRelatedMap = localeRelatedMap
    },
    setStoriesPerPage(_state: Ref<RootState>, storiesPerPage: number) {
      _state.value.storiesPerPage = storiesPerPage
    },
    setStoriesTotal(_state: Ref<RootState>, storiesTotal: number) {
      _state.value.storiesTotal = storiesTotal
    },
    setIsDark(_state: Ref<RootState>, isDark: boolean) {
      _state.value.isDark = isDark
    },
    setLocales(_state: Ref<RootState>, locales: IDataSource[]) {
      _state.value.locales = locales
    },
    setLocale(_state: Ref<RootState>, locale: string) {
      _state.value.locale = locale
    },
    setDataSources(_state: Ref<RootState>, dataSources: IDataSource[]) {
      _state.value.dataSources = dataSources
    },
  }

  const getters = {
    cacheVersion: (state: RootState) => state.cacheVersion,
    settings: (state: RootState) => state.settings,
    story: (state: RootState) => state.story,
    storyBody: (state: RootState) => state.storyBody,
    stories: (state: RootState) => state.stories,
    authorMap: (state: RootState) => state.authorMap,
    categoryMap: (state: RootState) => state.categoryMap,
    localeRelatedMap: (state: RootState) => state.localeRelatedMap,
    storiesPerPage: (state: RootState) => state.storiesPerPage,
    storiesTotal: (state: RootState) => state.storiesTotal,
    isDark: (state: RootState) => state.isDark,
    locales: (state: RootState) => state.locales,
    locale: (state: RootState) => state.locale,
    dataSources: (state: RootState) => state.dataSources,
  }

  const actions = {
    async loadSettings() {
      await storyblokApi
        .get(`cdn/stories/${state.value.locale}/settings`, {
          version: state.value.version,
          cv: state.value.cacheVersion,
        })
        .then((res: StoryblokResult) => {
          mutations.setSettings(state, res.data.story.content)
        })
    },
    async loadStory(payload: { path: string }) {
      await storyblokApi
        .get(`cdn/stories/${payload.path}`, {
          version: state.value.version,
          cv: state.value.cacheVersion,
          resolve_relations: 'text-content-related-posts.posts',
        })
        .then((res: StoryblokResult) => {
          mutations.setIsDark(state, res.data.story.content.is_dark)
          mutations.setStory(state, res.data.story)
          mutations.setStoryBody(state, res.data.story.content.body)
        })
    },
    async loadLocales() {
      await storyblokApi
        .get(`cdn/datasource_entries?datasource=locales`, {
          version: state.value.version,
          cv: state.value.cacheVersion,
        })
        .then((res: StoryblokResult) => {
          mutations.setLocales(state, res.data.datasource_entries)
        })
    },
    async loadPage(payload: { slug: string }) {
      await storyblokApi
        .get(`cdn/stories/${state.value.locale}/page/${payload.slug}`, {
          version: state.value.version,
          cv: state.value.cacheVersion,
        })
        .then((res: StoryblokResult) => {
          mutations.setIsDark(state, res.data.story.content.is_dark)
          mutations.setStory(state, res.data.story)
          mutations.setStoryBody(state, res.data.story.content.body)
        })
    },
    async loadBlog(payload: { slug: string }) {
      await storyblokApi
        .get(`cdn/stories/${state.value.locale}/blog/${payload.slug}`, {
          version: state.value.version,
          cv: state.value.cacheVersion,
          resolve_relations: 'text-content-related-posts.posts',
        })
        .then((res: StoryblokResult) => {
          mutations.setIsDark(state, res.data.story.content.is_dark)
          mutations.setStory(state, res.data.story)
          mutations.setStoryBody(state, res.data.story.content.body)
          mutations.setLocaleRelatedMap(
            state,
            Object.fromEntries(
              res.data.story.alternates.map((alternate: AlternateObject) => [
                alternate.id,
                alternate,
              ])
            )
          )
        })
    },
    async loadCryptoCoins() {
      await storyblokApi
        .get(`cdn/datasource_entries?datasource=coins`, {
          version: state.value.version,
          cv: state.value.cacheVersion,
          per_page: 999,
        })
        .then((res: StoryblokResult) => {
          mutations.setDataSources(state, res.data.datasource_entries)
        })
    },
    async loadCryptoPage() {
      await storyblokApi
        .get(`cdn/stories/${state.value.locale}/crypto/`, {
          version: state.value.version,
          cv: state.value.cacheVersion,
        })
        .then((res: StoryblokResult) => {
          mutations.setStory(state, res.data.story)
        })
    },
    async loadPressList(payload: { perPage?: number; page: number }) {
      await storyblokApi
        .get('cdn/stories?filter_query[component][in]=press', {
          page: payload?.page || 1,
          starts_with: `${state.value.locale}/press/`,
          version: state.value.version,
          cv: state.value.cacheVersion,
          per_page: payload?.perPage || 10,
          sort_by: 'content.date:desc',
        })
        .then((res: StoryblokResult) => {
          mutations.setStoriesPerPage(state, res.perPage)
          mutations.setStoriesTotal(state, res.total)
          mutations.setStories(state, res.data.stories)
        })
    },
    async loadBlogList(payload: {
      perPage: number
      page?: number
      categoryId: string
    }) {
      const categoryFilter = payload.categoryId
        ? `&filter_query[category][in]=${payload.categoryId}`
        : ''

      await storyblokApi
        .get(`cdn/stories?filter_query[component][in]=blog${categoryFilter}`, {
          page: payload?.page || 1,
          starts_with: `${state.value.locale}/blog/`,
          version: state.value.version,
          cv: state.value.cacheVersion,
          per_page: payload?.perPage || 10,
          sort_by: 'content.date:desc',
        })
        .then((res: StoryblokResult) => {
          mutations.setStoriesPerPage(state, res.perPage)
          mutations.setStoriesTotal(state, res.total)
          mutations.setStories(state, res.data.stories)
        })
    },
    async loadAcademy(payload: { slug: string }) {
      await storyblokApi
        .get(`cdn/stories/${state.value.locale}/academy/${payload.slug}`, {
          version: state.value.version,
          cv: state.value.cacheVersion,
          resolve_relations: 'text-content-related-posts.posts',
        })
        .then((res: StoryblokResult) => {
          mutations.setIsDark(state, res.data.story.content.is_dark)
          mutations.setStory(state, res.data.story)
          mutations.setStoryBody(state, res.data.story.content.body)
          mutations.setLocaleRelatedMap(
            state,
            Object.fromEntries(
              res.data.story.alternates.map((alternate: AlternateObject) => [
                alternate.id,
                alternate,
              ])
            )
          )
        })
    },
    async loadAcademyCategory(payload: { slug: string }) {
      await storyblokApi
        .get(
          `cdn/stories/${state.value.locale}/academy/category/${payload.slug}`,
          {
            version: state.value.version,
            cv: state.value.cacheVersion,
            resolve_relations: 'authors',
          }
        )
        .then((res: StoryblokResult) => {
          mutations.setIsDark(state, res.data.story.content.is_dark)
          mutations.setStory(state, res.data.story)
          mutations.setStoryBody(state, res.data.story.content.body)
        })
    },
    async loadAcademiesByCategory(payload: {
      categoryIds: string[]
      perPage: number
    }) {
      await storyblokApi
        .get(
          `cdn/stories?filter_query[category][in]=${payload.categoryIds.join(
            ','
          )}`,
          {
            starts_with: `${state.value.locale}/academy/`,
            version: state.value.version,
            cv: state.value.cacheVersion,
            per_page: payload.perPage || 10,
            excluding_ids: [state.value.story?.id],
            sort_by: 'content.date:desc',
            resolve_relations: 'author',
          }
        )
        .then((res: StoryblokResult) => {
          mutations.setStoriesPerPage(state, res.perPage)
          mutations.setStoriesTotal(state, res.total)
          mutations.setStories(state, res.data.stories)
          mutations.setAuthorMap(
            state,
            Object.fromEntries(
              res.data.rels
                .filter((r: StoryData) => r.content.component === 'author')
                .map((story: StoryData) => [story.uuid, story])
            )
          )
        })
    },
    async loadBlogsByCategory(payload: {
      categoryIds: string[]
      perPage: number
      isStoriesConcat: boolean
    }) {
      await storyblokApi
        .get(
          `cdn/stories?filter_query[category][in]=${payload.categoryIds.join(
            ','
          )}`,
          {
            starts_with: `${state.value.locale}/blog/`,
            version: state.value.version,
            cv: state.value.cacheVersion,
            per_page: payload.perPage || 10,
            excluding_ids: [state.value.story?.id],
            sort_by: 'content.date:desc',
          }
        )
        .then((res: StoryblokResult) => {
          mutations.setStoriesPerPage(state, res.perPage)
          mutations.setStoriesTotal(state, res.total)

          // in case stories should be loaded on the same page, concact is needed
          if (payload.isStoriesConcat) {
            mutations.setStories(state, [
              ...state.value.stories,
              ...res.data.stories,
            ])
          } else {
            mutations.setStories(state, res.data.stories)
          }
        })
    },
    async loadAuthors(payload: { uuids: string[]; perPage: number }) {
      await storyblokApi
        .get(`cdn/stories?by_uuids=${payload.uuids.join(',')}`, {
          starts_with: `${state.value.locale}/author/`,
          version: state.value.version,
          cv: state.value.cacheVersion,
          per_page: payload.perPage || 10,
        })
        .then((res: StoryblokResult) => {
          mutations.setAuthorMap(
            state,
            Object.fromEntries(
              res.data.stories.map((story: StoryData) => [story.uuid, story])
            )
          )
        })
    },
    async loadBlogCategories(payload: { uuids: string[]; perPage: number }) {
      const filter = payload?.uuids
        ? `?by_uuids=${payload?.uuids.join(',')}`
        : ''

      await storyblokApi
        .get(`cdn/stories${filter}`, {
          starts_with: `${state.value.locale}/blog/category`,
          version: state.value.version,
          cv: state.value.cacheVersion,
          per_page: payload?.perPage || 10,
        })
        .then((res: StoryblokResult) => {
          mutations.setCategoryMap(
            state,
            Object.fromEntries(
              res.data.stories.map((story: StoryData) => [story.uuid, story])
            )
          )
        })
    },
    async loadAcedemyCategories(payload: { uuids: string[]; perPage: number }) {
      await storyblokApi
        .get(`cdn/stories?by_uuids=${payload.uuids.join(',')}`, {
          starts_with: `${state.value.locale}/academy/category`,
          version: state.value.version,
          cv: state.value.cacheVersion,
          per_page: payload.perPage || 10,
        })
        .then((res: StoryblokResult) => {
          mutations.setCategoryMap(
            state,
            Object.fromEntries(
              res.data.stories.map((story: StoryData) => [story.uuid, story])
            )
          )
        })
    },
    async loadJob(payload: { slug: string }) {
      await storyblokApi
        .get(`cdn/stories/${state.value.locale}/job/${payload.slug}`, {
          version: state.value.version,
          cv: state.value.cacheVersion,
        })
        .then((res: StoryblokResult) => {
          mutations.setIsDark(state, res.data.story.content.is_dark)
          mutations.setStory(state, res.data.story)
          mutations.setStoryBody(state, res.data.story.content.body)
        })
    },
    async loadPress(payload: { slug: string }) {
      await storyblokApi
        .get(`cdn/stories/${state.value.locale}/press/${payload.slug}`, {
          version: state.value.version,
          cv: state.value.cacheVersion,
          resolve_relations: 'text-content-related-posts.posts',
        })
        .then((res: StoryblokResult) => {
          mutations.setIsDark(state, res.data.story.content.is_dark)
          mutations.setStory(state, res.data.story)
          mutations.setStoryBody(state, res.data.story.content.body)
        })
    },
  }

  return {
    state,
    mutations,
    actions,
    getters,
  }
}
