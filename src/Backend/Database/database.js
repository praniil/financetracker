const express = require("express")
const { Pool } = require('pg')
const port = 8080;
const cors = require(cors)


const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '206001',
    port: 5432
});

app.use(express.json());

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
const corsOptions = {
    origin : 'http://localhost:3000'
};
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})