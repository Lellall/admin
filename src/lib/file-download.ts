export function fileDownloader(data: any, type: string, filename: string) {
  const blob = new Blob([data], { type })
  const href = URL.createObjectURL(blob)
  const a = generateLinkElement()
  a.setAttribute("href", href)
  a.setAttribute("download", filename)
  a.click()
  URL.revokeObjectURL(href)
}

function generateLinkElement() {
  const el = document.createElement("a")
  el.setAttribute("style", "display:none")
  el.setAttribute("target", "_blank")
  return el
}
