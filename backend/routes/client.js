var express = require('express');
const db = require('../dbconfig');
var router = express.Router();
const axios = require('axios');
const moment = require('moment');
const cache = require('memory-cache');
const fs = require('fs').promises;
const path = require('path'); // Import the 'path' module


const API_KEY = '20412f6040722042abf8b7c5b349e73e85a3d0d5657df0f768378e88e8ec8ac3';
const current_date = moment().format('YYYY-MM-DD');
// const cricket_url = `https://apiv2.allsportsapi.com/cricket/?met=Fixtures&APIkey=${API_KEY}&from=${current_date}&to=${current_date}`;
// const specific_cricket = `https://apiv2.allsportsapi.com/cricket/?met=Livescore&APIkey=${API_KEY}&matchId`;
// Dummy cricket live score data (will not update)

// Function to read the live score data from the JSON file
async function getLiveScoreData() {
    try {
        const data = await fs.readFile(path.join(__dirname, '../livescore.json'), 'utf8');

        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading live_score.json:', error);
        return { error: 'Failed to load live score data' };
    }
}



router.get('/all-matches', async (req, res) => {
    try {
        const response = await getLiveScoreData();
        console.log(response, "matches");
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching live score data' });
    }

});

router.post('/specific-match', async (req, res) => {
    try {
        const matchId = req.body.match_id;
        const cachedData = cache.get(matchId);

        if (cachedData) {
            // If data exists in cache, return it
            console.log('Data retrieved from cache');
            return res.status(200).json(cachedData);
        }

        console.log(req.body);
        const url = `${specific_cricket}=${matchId}`;
        const response = await axios.get(url);

        // Cache the response for 5 minutes
        // cache.put(matchId, response.data, 5 * 60 * 1000);

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching live score data' });
    }
});

router.post('/place-bet', async (req, res) => {
    try {
        console.log(req.body, "place-bet");
        const { user_id, match_id, bet, loss, transaction_type, bet_type, team1, team2, betOnteam,estimated_profit, estimated_loss} = req.body;
        const points = -loss;
        const todayDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const team1VSteam2 = `${team1} v ${team2}`;
        const description = `Cricket / ${team1VSteam2} / Match / ${team1VSteam2} / ${match_id} / ${betOnteam}`
        const insertQuery = `INSERT INTO bets(match_id,user_id, match_date, bet, bet_type, description,estimated_profit , estimated_loss ) values($1, $2, $3, $4, $5, $6 , $7, $8) returning *`;
        const substractQuery = `UPDATE users set account_balance= account_balance + $1 where user_id=$2`;
        const transactionQuery = `INSERT INTO transactions(transaction_type, points, transaction_date, bet_id, user_id, description,prev_balance,current_balance) values($1, $2, $3,$4, $5,$6,$7,$8)`;
        const getUsersData = `SELECT * FROM users;`;

        await db.query('BEGIN');
        const result = await db.query(insertQuery, [match_id, user_id, todayDate, bet, bet_type, description, estimated_profit, estimated_loss]);
        const betId = result.rows[0].bet_id;
        console.log(betId, "betId");

        const allUsers = await db.query(getUsersData);
        const filteredUser = allUsers.rows.find((u) => u.user_id == user_id);

        const currentBalace = Number(filteredUser.account_balance) + Number(points);
        
        console.log(filteredUser, "filteredUser");
        console.log(Number(filteredUser.account_balance).toFixed(2));
       
        await db.query(substractQuery, [points, user_id]);
        await db.query(transactionQuery, [transaction_type, points, todayDate, betId, user_id, description, Number(filteredUser.account_balance), currentBalace])
        await db.query('COMMIT');
        res.status(200).json({ message: 'Bet placed successfully', bet_id: betId });
    } catch (error) {
        await db.query('ROLLBACK');
        console.log(error, "error");
        res.status(500).json(error);
    }
});

module.exports = router;