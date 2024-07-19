import { useEffect, useState } from 'preact/hooks'
import { Layout } from '../components/layout'
import { CodeRender } from '../components/code-render'

function useSnippets() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetchSnippets()
  }, [])

  function fetchSnippets() {
    fetch('/api/snippets')
      .then(d => d.json())
      .then(d => setData(d))
  }

  function normalize(d) {
    return d.map(d => ({
      id: d.id,
      title: d.title,
      snippet: atob(d.snippet),
      language: d.language,
    }))
  }

  return { snippets: normalize(data), refetch: fetchSnippets }
}

export default () => {
  const { snippets, refetch } = useSnippets()

  return (
    <Layout>
      <div class="flex items-center justify-end w-full">
        <a
          class="bg-neutral-800 text-white border border-transparent hover:border-white inline-flex items-center justify-center px-6 py-2 rounded-md"
          href="/new"
        >
          New
        </a>
      </div>
      <div class="grid gap-2 grid-cols-3 w-full">
        {snippets.map(d => (
          <a
            href={`/snip/${d.id}`}
            class="flex-col flex gap-10 hover:cursor-pointer h-[350px] w-full overflow-hidden p-3 bg-neutral-800 rounded-md"
          >
            <h1>{d.title}</h1>
            <CodeRender code={d.snippet} lang={d.language} />
          </a>
        ))}
      </div>
    </Layout>
  )
}
