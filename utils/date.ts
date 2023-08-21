export function getDateString(val: string): string {
  if (!val) {
    return ''
  }

  const stringDate = val.replace(/-/g, '/')
  const date = new Date(stringDate)

  if (date instanceof Date && !isNaN(date.getTime())) {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return ''
}
