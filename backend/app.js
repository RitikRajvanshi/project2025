var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const fs = require('fs');
const dotenv = require('dotenv');
const { getIo } = require('./socket'); // Import the `getIo` function
// const LIVESCORE_PATH = path.join(__dirname, 'data', 'livescore.json');
const liveScore = require('./livescore.json');

// var indexRouter = require('./routes/index');
// var adminRoutes = require('./routes/admin');
// var loginRouter = require('./routes/login');
// var clientRouter = require('./routes/client');
const filePath = "livescore.json";

dotenv.config( {
  path: path.join(__dirname, '.env')
} );

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var loginRouter = require('./routes/login');
var clientRouter = require('./routes/client');
var sharedRouter = require('./routes/shared');

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
app.use('/admin', adminRouter);
app.use('/login', loginRouter);
app.use('/client', clientRouter);
app.use('/shared', sharedRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



const defaultPlayers = [
  "Player 1", "Player 2", "Player 3", "Player 4", "Player 5",
  "Player 6", "Player 7", "Player 8", "Player 9", "Player 10", "Player 11"
];

app.get('/live-score', (req, res) => {
  try {
    const matches = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const liveMatches = matches.filter(m => m.matchInfo.status === "Live");
    res.json(liveMatches);
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).json({ error: "Could not read data" });
  }
});

function handleWicket(batting, match) {
  const outBatsman = batting.batsmen[0];
  outBatsman.out = true;
  outBatsman.notOut = false;
  outBatsman.onStrike = false;

  if (match.availableBatsmen?.length) {
    const nextName = match.availableBatsmen.shift();
    const newBatsman = {
      name: nextName,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      onStrike: true,
      notOut: true,
      out: false
    };
    batting.batsmen[0] = newBatsman;
    batting.wickets++;

    console.log(`Wicket! ${outBatsman.name} is out. New batsman: ${newBatsman.name}`);
  } else {

    // batting.wickets++;
    // console.log(`Wicket! ${outBatsman.name} is out. All batsmen are out!`);
    // match.matchInfo.status = "Completed"; // Mark match done

    // If all wickets are lost (maximum 10), innings is over
    if (batting.wickets >= 10) {
      console.log(`All batsmen are out! ${batting.batsmen[0].name} is out.`);
      match.matchInfo.status = "Completed"; // Mark match as over
    } else {
      console.log(`Wicket! ${currentBatsman.name} is out. No batsmen left.`);
    }
  }
}

setInterval(() => {
  let matches;
  try {
    matches = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error('Read error:', err);
    return;
  }

  matches.forEach(match => {
    if (match.matchInfo.status !== 'Live') return;

    const batting = match.liveScore?.battingTeam;
    if (!batting) return;

    // **Set current inning if not defined**
    if (match.currentInning === undefined) match.currentInning = 1;

    // Ensure availableBatsmen
    if (!match.availableBatsmen || match.availableBatsmen.length === 0) {
      const used = batting.batsmen.map(b => b.name);
      const full = match.matchInfo.squad1;
      match.availableBatsmen = full.filter(p => !used.includes(p));
    }

    // Ensure totalBalls and recentBalls
    if (!batting.totalBalls) batting.totalBalls = 0;
    match.recentBalls = match.recentBalls || [];

    // Calculate overs before incrementing totalBalls
    const balls = batting.totalBalls;
    const completedOvers = Math.floor(balls / 6);
    const ballsInCurrentOver = balls % 6;
    batting.overs = `${completedOvers}.${ballsInCurrentOver}`;

    // Maintain recentBalls only for current over
    const currentOverKey = `${completedOvers}`;
    if (!match.recentBallsOver || match.recentBallsOver !== currentOverKey) {
      match.recentBalls = []; // clear old over's balls
      match.recentBallsOver = currentOverKey; // mark current over
    }

    // Check if innings complete
    const totalOversAllowed = +match.matchInfo.overs;
    const currentOvers = parseFloat(batting.overs);
    if (completedOvers >= totalOversAllowed || batting.wickets >= 10) {
      if (!match.inningsCompleted) {
        match.inningsCompleted = { "1": false, "2": false };
      }

      match.inningsCompleted[match.currentInning] = true;
      // console.log(`Innings ${match.currentInning} completed: Maximum overs reached.`);
      // **Prevent further scoring after innings complete**
      return;
    }

    // Ensure liveScore.odds is initialized
    if (!match.liveScore.odds) {
      match.liveScore.odds = {
        lagai: 0,
        khai: 0,
        isFavourite: false
      };
    }

    // Always generate and update odds on every ball
    const lagai = Math.floor(Math.random() * 99) + 1;
    const khai = lagai + 3;
    const favouriteTeam = Math.random() > 0.5 ? match.matchInfo.team1 : match.matchInfo.team2;

    match.liveScore.odds = {
      team: favouriteTeam,
      lagai,
      khai,
      isFavourite: true
    };

    const isWicket = Math.random() < 0.1;

    if (isWicket) {
      handleWicket(batting, match);

      // Ensure liveScore.odds is initialized
      if (!match.liveScore.odds) {
        match.liveScore.odds = {
          lagai: 0,
          khai: 0,
          isFavourite: false
        };
      }

      // Generate and update odds
      const lagai = Math.floor(Math.random() * 99) + 1;
      const khai = lagai + 3;
      const isFavourite = lagai > khai;

      // Set it inside liveScore.odds
      match.liveScore.odds = {
        lagai,
        khai,
        isFavourite
      };

      match.recentBalls.unshift({
        over: batting.overs,
        batsman: batting.batsmen[0]?.name || 'N/A',
        result: 'Wicket'
      });
    } else {
      const striker = batting.batsmen.find(b => b.onStrike);
      if (!striker) return;

      const runs = Math.floor(Math.random() * 7);
      batting.runs += runs;
      striker.runs += runs;
      striker.balls++;

      const lagai = Math.floor(Math.random() * 99) + 1;
      const khai = Math.abs(100 - lagai);

      match.recentBalls.unshift({
        over: batting.overs,
        batsman: striker.name,
        result: `${runs} run(s)`
      });
    }

    // Increment after over calc
    batting.totalBalls++;

    // **Maintain only the last 6 balls of the current over**
    if (match.recentBalls.length > 6) {
      match.recentBalls = match.recentBalls.slice(0, 6);
    }
  });

  try {
    fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));
    const io = getIo();
    const liveMatches = matches.filter(m => m.matchInfo.status === 'Live');
    io.emit('liveScoreUpdate', liveMatches);
    // console.log('Broadcasted live score update');
  } catch (err) {
    console.error('Write error:', err);
  }
}, 20000);



module.exports = app;
