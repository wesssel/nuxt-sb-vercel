export default function urlShorter(url, locale) {
  if (url.startsWith(`${locale}/page`) || url.startsWith(`/${locale}/page`)) {
    const pagePath = url.replace(`${locale}/page`, '')
    const pagePathFolders = pagePath.split('/')

    if (pagePathFolders.length > 2) {
      return url
    }
  }

  url = url?.replace(`${locale}/page`, `${locale}`)
  url = url?.replace(`${locale}/academy/post`, `${locale}/academy`)
  url = url?.replace(`${locale}/blog/post`, `${locale}/blog`)
  url = url?.replace(`${locale}/press/post`, `${locale}/press`)
  url = url?.replace(`${locale}/job/post`, `${locale}/job`)

  return url
}
