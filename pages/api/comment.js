export default async function handler(req, res) {
  try {
    const puzzleAirtable = new AirtablePlus({
      baseID: 'appSvgxYEQg6N28od',
      apiKey: process.env.AIRTABLE,
      tableName: 'Puzzle'
    })
    const { method } = req
    if (method === 'GET') {
      return res
        .status(200)
        .json({ success: true, comments: await puzzleAirtable.read() })
    }
    await puzzleAirtable.create({
      Comment: req.body.message
    })
    return res
      .status(200)
      .json({ success: true, comments: await puzzleAirtable.read() })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}
