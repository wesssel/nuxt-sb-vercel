export function copyToClipboard(text: string) {
  const hiddenInput: HTMLInputElement = document.createElement('input')

  hiddenInput.value = text
  hiddenInput.setAttribute(
    'style',
    'position: absolute; left: -9999px; opacity: 0.01'
  )

  document.body.appendChild(hiddenInput)

  // if is ios
  if (!!window.navigator.userAgent.match(/ipad|iphone/i)) {
    const range = document.createRange()
    range.selectNodeContents(hiddenInput)
    const selection: any = window.getSelection()

    selection.removeAllRanges()
    selection.addRange(range)
    hiddenInput.setSelectionRange(0, 999999)
  } else {
    hiddenInput.select()
  }

  document.execCommand('copy')
  document.body.removeChild(hiddenInput)
}
