// var express = require('express');
// const db = require('../dbconfig');
// var router = express.Router();
// const axios = require('axios');
// const moment = require('moment');
// const cache = require('memory-cache');


// const API_KEY = '20412f6040722042abf8b7c5b349e73e85a3d0d5657df0f768378e88e8ec8ac3';
// const current_date = moment().format('YYYY-MM-DD');
// const cricket_url = `https://apiv2.allsportsapi.com/cricket/?met=Fixtures&APIkey=${API_KEY}&from=${current_date}&to=${current_date}`;
// const specific_cricket = `https://apiv2.allsportsapi.com/cricket/?met=Livescore&APIkey=${API_KEY}&matchId`;


// router.get('/all-matches',async(req,res)=>{
//     try {
//         const response = await axios.get(cricket_url);
//         res.status(200).json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching live score data' });
//     } 

// });

// router.post('/specific-match', async (req, res) => {
//     try {
//         const matchId = req.body.match_id;
//         const cachedData = cache.get(matchId);

//         if (cachedData) {
//             // If data exists in cache, return it
//             console.log('Data retrieved from cache');
//             return res.status(200).json(cachedData);
//         }

//         console.log(req.body);
//         const url = `${specific_cricket}=${matchId}`;
//         const response = await axios.get(url);
        
//         // Cache the response for 5 minutes
//         // cache.put(matchId, response.data, 5 * 60 * 1000);

//         res.status(200).json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching live score data' });
//     }
// });


// module.exports = router;

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



router.get('/all-matches',async(req,res)=>{
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


module.exports = router;