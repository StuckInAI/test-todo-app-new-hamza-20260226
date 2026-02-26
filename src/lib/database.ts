import { DataSource } from 'typeorm'
import { Todo } from '@/entities/Todo'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'
const databasePath = process.env.DATABASE_PATH || './database.sqlite'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: !isProduction,
  logging: !isProduction,
  entities: [Todo],
  migrations: [path.join(__dirname, '../migrations/*.ts')],
  subscribers: [],
})

let connection: DataSource | null = null

export async function initializeDatabase() {
  if (connection) return connection
  
  connection = await AppDataSource.initialize()
  console.log('Database initialized')
  return connection
}

export async function getRepository(entityClass: any) {
  const dataSource = await initializeDatabase()
  return dataSource.getRepository(entityClass)
}

initializeDatabase().catch(console.error)