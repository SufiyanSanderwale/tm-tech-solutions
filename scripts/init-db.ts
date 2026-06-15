import { ensureTables } from '../lib/db'

async function main() {
  console.log('Initializing database tables...')
  await ensureTables()
  console.log('Done! Tables are ready.')
}

main().catch((error) => {
  console.error('Database init failed:', error)
  process.exit(1)
})
