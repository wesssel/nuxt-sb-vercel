export function useUrl() {
  const urlShorter = (url: string, locale: string): string => {
    if (!url) {
      return url
    }

    let urlShortened = url

    urlShortened = urlShortened.replace(`${locale}/pages`, `${locale}`)
    urlShortened = urlShortened.replace(`${locale}/home`, `${locale}`)
    urlShortened = urlShortened.replace(
      `${locale}/press/posts`,
      `${locale}/press`
    )

    if (!urlShortened.endsWith('/')) {
      urlShortened = `${urlShortened}/`
    }

    if (!urlShortened.startsWith('/')) {
      urlShortened = `/${urlShortened}`
    }

    return urlShortened
  }

  return {
    urlShorter,
  }
}
