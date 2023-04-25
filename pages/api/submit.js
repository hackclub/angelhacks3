import AirtablePlus from 'airtable-plus'

export default async function handler(req, res) {
  try {
    const registerAirtable = new AirtablePlus({
      baseID: 'appSvgxYEQg6N28od',
      apiKey: process.env.AIRTABLE,
      tableName: 'Registrations'
    })
    await registerAirtable.create({
      ...req.body
    })
    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}
