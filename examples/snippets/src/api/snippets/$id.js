import { db } from '../../lib/db'

export default async (req, res) => {
  if (req.method.toLowerCase() !== 'get') {
    res.statusCode = 404
    return res.end()
  }

  const id = req.params.id

  const data = await db('snippets')
    .where({ id: id })
    .select(['id', 'title', 'snippet', 'language'])
    .first()
  return res.json(data)
}
