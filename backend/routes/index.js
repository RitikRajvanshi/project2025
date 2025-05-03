var express = require('express');
const db = require('../dbconfig');
var router = express.Router();
const liveScore = require('../livescore.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Function to generate random scores for a ball
// function generateRandomScore() {
//   return Math.floor(Math.random() * 7); // Random score between 0 and 6
// }

// Route to simulate a live cricket match and update scores for each ball
// router.post('/simulate-match', async (req, res) => {
//   try {
//     // Simulate match and update scores for each ball
//     const ballScores = [];
//     for (let ball = 1; ball <= 12; ball++) {
//       // Simulate ball score
//       const ballScore = generateRandomScore();
//       console.log(`Ball ${ball} Score:`, ballScore);

//       // Add ball score to the list
//       ballScores.push(ballScore);

//       // Delay between balls
//       await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds delay per ball
//     }

//     console.log('Match simulation completed successfully');
//     console.log(ballScores, "ballScores")

//     res.status(200).json({ message: 'Match simulated successfully', ballScores });
//   } catch (error) {
//     console.error('Error simulating match:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.get('/live-score', (req, res) => {
  console.log(liveScore, "liveScore")
  const liveMatches = liveScore.filter(match => match.matchInfo.status === "Live");
  console.log(liveMatches);
  res.json(liveScore);
});



module.exports = router;
