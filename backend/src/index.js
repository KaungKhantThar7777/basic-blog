import { configDotenv } from 'dotenv'
configDotenv()
import { app } from './app.js'
import { initDB } from './db/init.js'

try {
  await initDB()
  const PORT = process.env.PORT

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
} catch (error) {
  console.error(`Failed to start database: ${error.message}`)
}
