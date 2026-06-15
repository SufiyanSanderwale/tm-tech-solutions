import { createClient, type Client } from '@libsql/client'
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'
import * as schema from './schema'

let client: Client | null = null
let db: LibSQLDatabase<typeof schema> | null = null
let tablesReady = false

function getClient(): Client {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error('Database not configured. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.')
  }

  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  }

  return client
}

export function getDb(): LibSQLDatabase<typeof schema> {
  if (!db) {
    db = drizzle(getClient(), { schema })
  }
  return db
}

export async function ensureTables(): Promise<void> {
  if (tablesReady) return

  const turso = getClient()

  const statements = [
    `CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      job_type TEXT NOT NULL,
      requirements TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      job_id TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      resume_url TEXT NOT NULL,
      resume_public_id TEXT,
      resume_file_name TEXT,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'applied',
      created_at INTEGER NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id)`,
    `CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status)`,
    `CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active)`,
  ]

  for (const sql of statements) {
    await turso.execute(sql)
  }

  const migrations = [
    'ALTER TABLE applications ADD COLUMN resume_public_id TEXT',
    'ALTER TABLE applications ADD COLUMN resume_file_name TEXT',
  ]

  for (const sql of migrations) {
    try {
      await turso.execute(sql)
    } catch {
      // Column may already exist
    }
  }

  tablesReady = true
}
