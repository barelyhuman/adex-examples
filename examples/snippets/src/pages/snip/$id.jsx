import { useEffect, useState } from 'preact/hooks'
import { Layout } from '../../components/layout'
import { CodeRender } from '../../components/code-render'

function useSnippet(id) {
  const [data, setData] = useState({})
  useEffect(() => {
    fetchSnippet()
  }, [])

  function fetchSnippet() {
    fetch(`/api/snippets/${id}`)
      .then(d => d.json())
      .then(d => setData(d))
  }

  function normalize(d) {
    if (!Object.keys(d).length) {
      return {}
    }
    return {
      id: d.id,
      title: d.title,
      snippet: atob(d.snippet),
      language: d.language,
    }
  }

  return { snippet: normalize(data), refetch: fetchSnippet }
}

export default ({ routeParams } = {}) => {
  const { snippet, refetch } = useSnippet(routeParams.id)

  return (
    <Layout>
      <div class="w-full flex flex-col gap-10">
        <h1>
          <span class="text-neutral-600">Title: </span>
          {snippet.title}
        </h1>
        <div class="bg-neutral-800 w-full rounded-md p-2">
          <CodeRender code={snippet.snippet} lang={snippet.language} />
        </div>
      </div>
    </Layout>
  )
}
