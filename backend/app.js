var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const fs = require('fs');
const { getIo } = require('./socket'); // Import the `getIo` function
// const LIVESCORE_PATH = path.join(__dirname, 'data', 'livescore.json');
const liveScore = require('./livescore.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var clientRouter = require('./routes/client');
const filePath = "livescore.json";

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var clientRouter = require('./routes/client');

var app = express();
app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', usersRouter);
app.use('/login', loginRouter);
app.use('/client', clientRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Function to update live match scores
// function updateLiveScores() {
//   let matches = JSON.parse(fs.readFileSync(filePath, "utf8"));

//   matches.forEach((match) => {
//     if (match.matchInfo.status === "Live") {
//       let batting = match.liveScore.battingTeam;
//       let bowling = match.liveScore.bowlingTeam;

//       // **Ensure there are batsmen playing**
//       let activeBatsmen = batting.batsmen.filter((b) => !b.out);
//       if (activeBatsmen.length < 2) {
//         console.log(`Match Ended: ${batting.name} all out!`);
//         match.matchInfo.status = "Completed";
//         return;
//       }

//       let striker = activeBatsmen.find((b) => b.onStrike) || activeBatsmen[0];
//       let nonStriker = activeBatsmen.find((b) => !b.onStrike) || activeBatsmen[1];

//       // **Get a bowler**
//       let bowler = bowling.bowlers[0];

//       if (!striker || !nonStriker || !bowler) {
//         console.error("Missing player data. Skipping update.");
//         return;
//       }

//       // **Stop match if 10 wickets fall**
//       if (batting.wickets >= 10) {
//         match.matchInfo.status = "Completed";
//         console.log(`Match completed: ${match.matchInfo.series}`);
//         return;
//       }

//       // **Simulate a single ball**
//       let runsScored = Math.floor(Math.random() * 7); // Random runs (0-6)
//       let isWicket = Math.random() < 0.08; // 8% chance of getting out

//       if (isWicket) {
//         batting.wickets += 1;
//         striker.out = true;
//         striker.dismissal = `b. ${bowler.name}`;
//         console.log(`${striker.name} is OUT! (${striker.runs} runs)`);

//         // **New batsman comes in if possible**
//         let newBatsman = batting.batsmen.find((b) => !b.out && !b.notOut && !b.onStrike);
//         if (newBatsman) {
//           newBatsman.onStrike = true;
//         }
//       } else {
//         striker.runs += runsScored;
//         striker.balls += 1;
//         batting.runs += runsScored;
//       }

//       // **Update balls & overs correctly**
//       let totalBalls = Math.floor(batting.overs * 10) + 1;
//       batting.overs = parseFloat((totalBalls / 6).toFixed(1));

//       // **Swap strike every over**
//       if (totalBalls % 6 === 0) {
//         [striker.onStrike, nonStriker.onStrike] = [nonStriker.onStrike, striker.onStrike];
//       }

//       // **Update recent balls**
//       match.recentBalls.push({
//         over: batting.overs,
//         bowler: bowler.name,
//         batsman: striker.name,
//         result: isWicket ? "Wicket" : `${runsScored} run(s)`,
//       });

//       console.log(
//         `Updated Score: ${batting.name} - ${batting.runs}/${batting.wickets} (${batting.overs} overs)`
//       );
//     }
//   });

const defaultPlayers = [
  "Player 1", "Player 2", "Player 3", "Player 4", "Player 5",
  "Player 6", "Player 7", "Player 8", "Player 9", "Player 10", "Player 11"
];

//score and balls are working okay
// function updateLiveScores() {
//   let matches;
//   try {
//     matches = JSON.parse(fs.readFileSync(filePath, "utf8"));
//   } catch (error) {
//     console.error("Error parsing JSON:", error);
//     return;
//   }

//   matches.forEach((match) => {
//     if (match.matchInfo.status === "Live") {
//       if (!match.liveScore) {
//         initializeLiveScore(match);
//       }

//       let batting = match.liveScore.battingTeam;
//       let bowling = match.liveScore.bowlingTeam;

//       let activeBatsmen = batting.batsmen.filter((b) => !b.out);
//       let striker = activeBatsmen.find((b) => b.onStrike);
//       let nonStriker = activeBatsmen.find((b) => !b.onStrike);

//       // Check if all batsmen are out and no more are available
//       if (batting.wickets >= 10 || (match.availableBatsmen.length === 0 && activeBatsmen.every(b => b.out))) {
//         match.matchInfo.status = "Completed";
//         return;
//       }

//       if (parseFloat(batting.overs) >= match.matchInfo.overs) {
//         match.matchInfo.status = "Completed";
//         return;
//       }

//       let availableBowlers = bowling.bowlers.filter(b => parseFloat(b.overs || '0') < Math.ceil(match.matchInfo.overs / 2));
//       if (availableBowlers.length === 0) {
//         console.error("No available bowlers. Skipping update.");
//         return;
//       }
//       let bowler = availableBowlers[Math.floor(Math.random() * availableBowlers.length)];

//       let ballOutcome = simulateBall();
//       let resultText = "";

//       // Initialize bowler stats if not already done
//       bowler.ballsBowled = bowler.ballsBowled || 0;
//       bowler.runsConceded = bowler.runsConceded || 0;
//       bowler.wicketsTaken = bowler.wicketsTaken || 0;

//       // Handle ball outcomes
//       if (ballOutcome.type === "noBall" || ballOutcome.type === "wide") {
//         batting.runs += 1; // Add 1 run for no-ball or wide
//         bowler.runsConceded += 1; // Bowler concedes a run
//         resultText = ballOutcome.type; // Log the type of delivery
//       } else {
//         // Legal delivery
//         let runs = ballOutcome.runs;
//         if (striker) {
//           striker.runs += runs;
//           striker.balls += 1;
//           if (runs === 4) striker.fours++;
//           if (runs === 6) striker.sixes++;
//         }
//         batting.runs += runs;
//         bowler.runsConceded += runs;
//         resultText = `${runs} run(s)`;

//         // Increment the bowler's balls bowled for every legal delivery
//         bowler.ballsBowled++;
//       }

//       // Update overs after every legal delivery
//       if (ballOutcome.type !== "noBall" && ballOutcome.type !== "wide") {
//         let ballsThisOver = bowler.ballsBowled % 6;
//         let currentOver = Math.floor(bowler.ballsBowled / 6);
//         batting.overs = `${currentOver}.${ballsThisOver}`;
//         bowler.overs = (bowler.ballsBowled / 6).toFixed(1);
//       }

//       // Log recent balls
//       match.recentBalls = match.recentBalls || [];
//       match.recentBalls.push({
//         over: batting.overs,
//         bowler: bowler.name,
//         batsman: striker?.name || "Out",
//         result: resultText });

//       // Check for wicket
//       if (ballOutcome.type === "wicket") {
//         batting.wickets++;
//         if (striker) {
//           striker.out = true;
//           striker.notOut = false;
//           striker.dismissal = `b. ${bowler.name}`;
//           striker.onStrike = false; // New batsman will be on strike
//         }
//         bowler.wicketsTaken++;
//         resultText = "Wicket";

//         // Bring in the next batsman if available
//         if (match.availableBatsmen.length > 0) {
//           let newBatsmanName = match.availableBatsmen.shift();
//           let newBatsman = { name: newBatsmanName, runs: 0, balls: 0, fours: 0, sixes: 0, onStrike: true, notOut: true, out: false };
//           batting.batsmen.push(newBatsman);
//           striker = newBatsman;
//           if (nonStriker) nonStriker.onStrike = false;
//         }
//       }

//       console.log(
//         `Updated Score: ${batting.name} - ${batting.runs}/${batting.wickets} (${batting.overs} overs), Bowler: ${bowler.name} (${bowler.overs})`
//       );
//     }
//   });

//   try {
//     fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));
//     console.log("Scores updated successfully.");
//   } catch (error) {
//     console.error("Error writing to file:", error);
//   }
// }


// function simulateBall() {
//   let outcomes = [
//     { type: "legal", runs: 0 },
//     { type: "legal", runs: 1 },
//     { type: "legal", runs: 2 },
//     { type: "legal", runs: 3 },
//     { type: "legal", runs: 4 },
//     { type: "legal", runs: 6 },
//     { type: "wicket" },
//     { type: "wide" },
//     { type: "noBall" }
//   ];

//   let randomIndex = Math.floor(Math.random() * outcomes.length);
//   return outcomes[randomIndex];
// }

// function initializeLiveScore(match) {
//   match.liveScore = {
//     battingTeam: {
//       name: match.matchInfo.team1,
//       runs: 0,
//       wickets: 0,
//       overs: "0.0",
//       batsmen: match.matchInfo.squad1.slice(0, 2).map((name, index) => ({
//         name: name,
//         runs: 0,
//         balls: 0,
//         fours: 0,
//         sixes: 0,
//         onStrike: index === 0,
//         notOut: true,
//         out: false,
//       })),
//     },
//     bowlingTeam: {
//       name: match.matchInfo.team2,
//       bowlers: match.matchInfo.squad2.slice(0, 2).map(name => ({
//         name: name,
//         overs: "0.0",
//         maidens: 0,
//         runsConceded: 0,
//         wicketsTaken: 0,
//         ballsBowled: 0,
//       })),
//     },
//   };
//   match.availableBatsmen = match.matchInfo.squad1.slice(2);
// }


//   // Save updated scores
//   fs.writeFileSync(filePath, JSON.stringify(matches, null, 2), "utf8");

//   // **Run every 30 seconds (realistic match pace)**
//   setTimeout(updateLiveScores, 30000);
// }
// // Start the live score update process

// function updateLiveScores() {
//   let matches;
//   try {
//     matches = JSON.parse(fs.readFileSync(filePath, "utf8"));
//   } catch (error) {
//     console.error("Error parsing JSON:", error);
//     return;
//   }

//   matches.forEach((match) => {
//     if (match.matchInfo.status === "Live") {
//       // Initialize live score if not already done
//       if (!match.liveScore) {
//         initializeLiveScore(match);
//       }

//       let batting = match.liveScore.battingTeam;

//       // Initialize balls and overs if not already done
//       batting.overs = batting.overs || "0.0";
//       let ballsBowled = parseInt(batting.overs.split('.')[1]) || 0; // Get the number of balls bowled
//       let currentOver = parseInt(batting.overs.split('.')[0]) || 0; // Get the current over

//       // Simulate a legal delivery with random runs (1 to 6)
//       let runs = Math.floor(Math.random() * 6) + 1; // Random runs between 1 and 6
//       batting.runs += runs; // Update total runs

//       // Increment the ball count
//       ballsBowled++;

//       // Check if we need to increment the over
//       if (ballsBowled >= 6) {
//         currentOver++; // Increment the over
//         ballsBowled = 0; // Reset balls for the new over
//       }

//       // Update the overs string
//       batting.overs = `${currentOver}.${ballsBowled}`;

//       // Log the current state
//       console.log(`Updated Score: ${batting.name} - Runs: ${batting.runs}, Overs: ${batting.overs}, Runs this ball: ${runs}`);
//     }
//   });

//   // Write the updated scores back to the file
//   try {
//     fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));
//     console.log("Scores updated successfully.");
//   } catch (error) {
//     console.error("Error writing to file:", error);
//   }
// }

// function initializeLiveScore(match) {
//   match.liveScore = {
//     battingTeam: {
//       name: match.matchInfo.team1,
//       runs: 0,
//       wickets: 0,
//       overs: "0.0", // Initialize overs
//       batsmen: match.matchInfo.squad1.slice(0, 2).map((name, index) => ({
//         name: name,
//         runs: 0,
//         balls: 0,
//         fours: 0,
//         sixes: 0,
//         onStrike: index === 0,
//         notOut: true,
//         out: false,
//       })),
//     },
//     bowlingTeam: {
//       name: match.matchInfo.team2,
//       bowlers: match.matchInfo.squad2.slice(0, 2).map(name => ({
//         name: name,
//         overs: "0.0",
//         maidens: 0,
//         runsConceded: 0,
//         wicketsTaken: 0,
//         ballsBowled: 0,
//       })),
//     },
//   };
// }


function updateLiveScores() {
  let matches;
  try {
    matches = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return;
  }

  matches.forEach((match) => {
    if (match.matchInfo.status === "Live") {
      if (!match.liveScore) {
        initializeLiveScore(match);
      }

      let batting = match.liveScore.battingTeam;
      let bowling = match.liveScore.bowlingTeam;

      batting.overs = batting.overs || "0.0";
      let ballsBowled = parseInt(batting.overs.split('.')[1]) || 0;
      let currentOver = parseInt(batting.overs.split('.')[0]) || 0;

      let runs = Math.floor(Math.random() * 6) + 1;
      batting.runs += runs;

      const striker = batting.batsmen.find(b => b.onStrike);
      striker.runs += runs;
      striker.balls++;

      // Select a random bowler from the bowling team
      const currentBowler = bowling.bowlers[Math.floor(Math.random() * bowling.bowlers.length)];
      currentBowler.runsConceded += runs;
      currentBowler.ballsBowled++;

      let resultText = `${runs} run(s)`;

      if (Math.random() < 0.1) {
        // handleWicket(batting);
        handleWicket(batting, match);
        currentBowler.wicketsTaken++;
        resultText = "Wicket";
      } else {
        ballsBowled++;
        if (ballsBowled >= 6) {
          currentOver++;
          ballsBowled = 0;
        }
        batting.overs = `${currentOver}.${ballsBowled}`;
      }

      // Update recentBalls
      match.recentBalls = match.recentBalls || [];
      match.recentBalls.unshift({
        over: `${currentOver}.${ballsBowled}`,
        bowler: currentBowler.name,
        batsman: striker.name,
        result: resultText,
      });

      if (match.recentBalls.length > 6) {
        match.recentBalls = match.recentBalls.slice(0, 6);
      }

      console.log(`${batting.runs}/${batting.wickets} - (${batting.overs})`);
    }
  });

  try {
    fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));
    console.log("Scores updated successfully.");
  } catch (error) {
    console.error("Error writing to file:", error);
  }
}



// function handleWicket(batting) {
//   if (batting.wickets < batting.batsmen.length) {
//     // Update the number of wickets
//     batting.wickets++;
    
//     // Find the next batsman
//     let nextBatsmanIndex = batting.wickets; // Assuming batsmen are indexed by their order
//     let nextBatsman = batting.batsmen[nextBatsmanIndex];

//     // Update the current batsman status
//     let currentBatsman = batting.batsmen[0]; // Assuming the first batsman is on strike
//     currentBatsman.out = true; // Mark the current batsman as out
//     currentBatsman.notOut = false; // Mark as not out

//     // Replace the out batsman with the next batsman
//     batting.batsmen[0] = nextBatsman;
//     nextBatsman.onStrike = true; // New batsman is on strike
//     nextBatsman.notOut = true; // New batsman is not out
//     nextBatsman.runs = 0; // Reset runs for the new batsman
//     nextBatsman.balls = 0; // Reset balls faced for the new batsman

//     console.log(`Wicket! ${currentBatsman.name} is out. New batsman: ${nextBatsman.name}`);
//   } else {
//     console.log("All batsmen are out!");
//   }
// }

function handleWicket(batting, match) {
  // Get current on-strike batsman
  const currentBatsman = batting.batsmen[0];
  currentBatsman.out = true;
  currentBatsman.notOut = false;
  currentBatsman.onStrike = false;

  // Check if any batsman is left in availableBatsmen
  if (match.availableBatsmen && match.availableBatsmen.length > 0) {
    // Get next batsman from the list
    const nextBatsmanName = match.availableBatsmen.shift();

    // Create batsman object
    const nextBatsman = {
      name: nextBatsmanName,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      onStrike: true,
      notOut: true,
      out: false,
    };

    // Replace the out batsman with new one
    batting.batsmen[0] = nextBatsman;
    batting.wickets++;

    console.log(`Wicket! ${currentBatsman.name} is out. New batsman: ${nextBatsman.name}`);
  } else {
    // No batsmen left
    batting.wickets++;
    console.log(`Wicket! ${currentBatsman.name} is out. All batsmen are out!`);
    match.matchInfo.status = "Completed"; // Optionally mark match as over
  }
}


function initializeLiveScore(match) {
  match.liveScore = {
    battingTeam: {
      name: match.matchInfo.team1,
      runs: 0,
      wickets: 0,
      overs: "0.0", // Initialize overs
      batsmen: match.matchInfo.squad1.map((name, index) => ({
        name: name,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        onStrike: index === 0,
        notOut: true,
        out: false,
      })),
    },
    bowlingTeam: {
      name: match.matchInfo.team2,
      bowlers: match.matchInfo.squad2.map(name => ({
        name: name,
        overs: "0.0",
        maidens: 0,
        runsConceded: 0,
        wicketsTaken: 0,
        ballsBowled: 0,
      })),
    },
  };
}

  app.get('/live-score', (req, res) => {
    const liveMatches = liveScore.filter(match => match.matchInfo.status === "Live");
    console.log(liveMatches); // Log live match data
    res.json(liveMatches); // Return the live match data in the response
  });

// Live score updater (simulated every 3s)
// setInterval(() => {
//   let matches;
//   try {
//     matches = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//   } catch (err) {
//     console.error('Error reading file:', err);
//     return;
//   }

//   matches.forEach(match => {
//     if (match.matchInfo.status === 'Live' && match.liveScore) {
//       const batting = match.liveScore.battingTeam;
//       const striker = batting.batsmen.find(b => b.onStrike);

//       const runs = Math.floor(Math.random() * 7); // 0 to 6
//       batting.runs += runs;
//       striker.runs += runs;
//       striker.balls++;

//       match.recentBalls = match.recentBalls || [];
//       match.recentBalls.unshift({
//         over: batting.overs,
//         batsman: striker.name,
//         result: `${runs} run(s)`
//       });

//       if (match.recentBalls.length > 6) {
//         match.recentBalls = match.recentBalls.slice(0, 6);
//       }
//     }
//   });

//   try {
//     fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));
//     const io = getIo();
//     const liveMatches = matches.filter(m => m.matchInfo.status === 'Live');
//     console.log(liveMatches, "liveMatches")
//     io.emit('liveScoreUpdate', liveMatches);
//     console.log('Live scores updated & emitted.');
//   } catch (err) {
//     console.error('Error writing file:', err);
//   }
// }, 3000);

setInterval(() => {
  let matches;
  try {
    matches = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error('Error reading file:', err);
    return;
  }

  matches.forEach(match => {
    if (match.matchInfo.status === 'Live' && match.liveScore) {
      const batting = match.liveScore.battingTeam;

      // Simulate whether a wicket falls (e.g. 10% chance)
      const isWicket = Math.random() < 0.1;

      match.recentBalls = match.recentBalls || [];

      if (isWicket) {
        handleWicket(batting, match);
        match.recentBalls.unshift({
          over: batting.overs,
          batsman: batting.batsmen[0]?.name || 'N/A',
          result: 'Wicket'
        });
      } else {
        const striker = batting.batsmen.find(b => b.onStrike);
        const runs = Math.floor(Math.random() * 7); // 0 to 6
        batting.runs += runs;
        striker.runs += runs;
        striker.balls++;

        match.recentBalls.unshift({
          over: batting.overs,
          batsman: striker.name,
          result: `${runs} run(s)`
        });
      }

      if (match.recentBalls.length > 6) {
        match.recentBalls = match.recentBalls.slice(0, 6);
      }
    }
  });

  try {
    fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));
    const io = getIo();
    const liveMatches = matches.filter(m => m.matchInfo.status === 'Live');
    io.emit('liveScoreUpdate', liveMatches);
    console.log('Live scores updated & emitted.');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}, 10000);



// setInterval(() => {
//   console.info('Updating live score...');
//   updateLiveScores();
// }, 3000);

module.exports = app;
