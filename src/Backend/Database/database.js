// database.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '206001',
  port: 5432
});

async function financeBalance() {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS finbalance(
        id SERIAL PRIMARY KEY,
        balance NUMERIC(10, 2)
    )
    `;
    await pool.query(query);
    console.log('finbalance table created');
  } catch (error) {
    console.log(error);
    console.error('Financial Balance Table creation failed')
  }
}

financeBalance();

module.exports = pool;
