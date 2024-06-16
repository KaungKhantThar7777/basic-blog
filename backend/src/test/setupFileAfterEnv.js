import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'
import { initDB } from '../db/init'

beforeAll(async () => {
  await initDB()
})

afterAll(async () => {
  await mongoose.disconnect()
})
