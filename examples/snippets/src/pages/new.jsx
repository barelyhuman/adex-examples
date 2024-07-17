import { Layout } from "../components/layout";

async function createNewSnippet(title, snippet) {
  const headers = new Headers();
  headers.append("content-type", "application/json");
  await fetch("/api/snippets", {
    method: "post",
    headers: headers,
    body: JSON.stringify({
      title,
      snippet: btoa(snippet),
    }),
  });
}

export default () => {
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.target.closest("form");
    const data = new FormData(formEl);
    const title = data.get("title");
    const snippet = data.get("snippet");
    await createNewSnippet(title, snippet);
    window.location.href = "/";
  };
  return (
    <Layout>
      <form class="flex flex-col gap-2" onSubmit={onFormSubmit}>
        <input class="bg-transparent" name="title" placeholder="title" />
        <textarea
          class="bg-transparent"
          name="snippet"
          placeholder="code snippet here"
        ></textarea>
        <button>Save</button>
      </form>
    </Layout>
  );
};
