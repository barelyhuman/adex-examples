import { useEffect, useState } from 'preact/hooks'
import { codeToHtml } from 'shiki'

export function CodeRender({ code, lang }) {
  let [highlightedHtml, setHighlightedHTML] = useState('')

  useEffect(() => {
    codeToHtml(code, {
      theme: 'vesper',
      lang: lang,
    }).then(d => {
      setHighlightedHTML(d)
    })
  }, [code])

  return <div dangerouslySetInnerHTML={{ __html: highlightedHtml }}></div>
}
