import { Layout } from "../components/layout";
import flourite from "flourite"
import { useState } from "preact/hooks"

async function createNewSnippet(title, snippet, language) {
  const headers = new Headers();
  headers.append("content-type", "application/json");
  await fetch("/api/snippets", {
    method: "post",
    headers: headers,
    body: JSON.stringify({
      title,
      language,
      snippet: btoa(snippet),
    }),
  });
}

export default () => {
  const [language, setLanguage] = useState("plaintext")


  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.target.closest("form");
    const data = new FormData(formEl);
    const title = data.get("title");
    const snippet = data.get("snippet");
    await createNewSnippet(title, snippet, language);
    window.location.href = "/";
  };
  return (
    <Layout>
      <form class="w-full flex flex-col gap-2" onSubmit={onFormSubmit}>
        <div class="flex justify-end">
          <button class="bg-neutral-800 text-white border border-transparent hover:border-white inline-flex items-center justify-center px-6 py-2 rounded-md">Create</button>
        </div>
        <div>
          {language}
        </div>
        <div>
          <input class="bg-neutral-800 w-full px-3 py-2 rounded-md" name="title" placeholder="Title" />
        </div>
        <textarea
          class="bg-neutral-800 transition-[height] duration-100 resize-none min-h-[25vh] w-full h-full px-3 py-2 rounded-md" 
          ref={node => {
            if (!node) return 
            node.addEventListener("keyup", () => {
              node.style.height = "0px";
              const scrollHeight = node.scrollHeight;
              node.style.height = scrollHeight + "px";
              const langFromCode = flourite(node.value, { shiki: true }).language
              if (language != langFromCode) {
                setLanguage(langFromCode)
              }
              
            })
          }}
          name="snippet"
          placeholder="code snippet here"
        ></textarea>
      </form>
    </Layout>
  );
};
