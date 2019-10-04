const host = process.env.DATABASE_URL || 'localhost'
const configDev = {
  client: 'pg',
  host: host,
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'smart-brain'
}
const configProd = {
  host: process.env.DATABASE_URL,
  ssl: true
}

module.exports.dbConfig =
  process.env.NODE_ENV === 'production' ? configProd : configDev
