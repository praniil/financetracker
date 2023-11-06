const express = require('express');
const pool = require('../Database/database.js');
const router = express.Router();

router.post('/update-balance', async (req, res) => {
    const userBalance = req.body.userBalance; // Access userBalance property
    try {
        const query = 'INSERT INTO finbalance (userBalance) Values ($1)';
        const values = [userBalance]; // Wrap userBalance in an array
        const result = await pool.query(query, values);
        console.log(result);
        res.status(201).send({ message: 'New finBalance created' });
    } catch (error) {
        res.status(500).send('Some error has occurred');
    }
});

module.exports = router;
