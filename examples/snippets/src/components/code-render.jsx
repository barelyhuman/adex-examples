
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import {
	codeToHtml
} from 'shiki'


export function CodeRender({ code, lang }) {
	let [highlightedHtml, setHighlightedHTML] = useState("")
	
	useEffect(() => {
		codeToHtml(code, {
			theme: "nord",
			lang: lang
		}).then(d => {
			setHighlightedHTML(d)
		})	
	}, [code])
	

	return <div dangerouslySetInnerHTML={{ __html: highlightedHtml }}></div>
}