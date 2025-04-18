var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const fs = require('fs');
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

//   // Save updated scores
//   fs.writeFileSync(filePath, JSON.stringify(matches, null, 2), "utf8");

//   // **Run every 30 seconds (realistic match pace)**
//   setTimeout(updateLiveScores, 30000);
// }
// // Start the live score update process
// setTimeout(()=>{
// updateLiveScores();

// },30000);

module.exports = app;
