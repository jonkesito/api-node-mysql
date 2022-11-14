import { createPool } from 'mysql2/promise'

import {
  DB_DATABASE,
  HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from './config.js'

export const pool = createPool({
  host: HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE
})




