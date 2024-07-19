import { db } from '../lib/db'

export default async (req, res) => {
  if (req.method.toLowerCase() === 'get') {
    return get(req, res)
  }

  if (req.method.toLowerCase() === 'post') {
    return post(req, res)
  }
}

async function get(req, res) {
  const snippets = await db('snippets')
    .where({})
    .select(['id', 'title', 'snippet', 'language'])
  return res.json(snippets)
}

async function post(req, res) {
  const data = await req.parseBodyJSON(req)
  await db('snippets').insert({
    title: data.title,
    language: data.language,
    snippet: Buffer.from(data.snippet, 'base64').toString('base64'),
  })
  return res.json({
    sucess: true,
  })
}
