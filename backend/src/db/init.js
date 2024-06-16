import mongoose from 'mongoose'

export function initDB() {
  const DATBASE_URL = process.env.DATABASE_URL

  mongoose.connection.on('open', () => {
    console.info('Connected to database', DATBASE_URL)
  })

  const connection = mongoose.connect(DATBASE_URL)

  return connection
}
