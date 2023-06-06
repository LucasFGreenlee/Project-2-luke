require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const api_key = process.env.STEAM_API_KEY;
const steam_id = process.env.STEAM_ID;

//environment variables
SECRET_SESSION = process.env.SECRET_SESSION;
//console.log(SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(flash());            // flash middleware

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

// add middleware to make messages available to every view
app.use(passport.initialize());     // Initialize passport
app.use(passport.session());        // Add a session

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

 app.get('/', (req, res) => {
   res.render('index');
 })

app.get('/playersummary', (req, res) => {
  //console.log('wtf')
  axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=031D3D24A6530B0ED7989AFC928E9B6F&steamids=76561198171430935')
  .then(response => {
    console.log(response.data);
    return res.render('playersummary', {playerdata: response.data});
  })
  .catch(err => {
    console.log(err);
  })
})

app.get('/steamgames', (req, res) => {
  axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
  .then(response => {
    console.log(response.data);
    return res.render('steamgames', {gamedata: response.data});
  })
  .catch(err => {
    console.log(err);
  })
})

app.get('/steamgame/search', (req, res) => {
  return res.render('steamgame/search');
})

app.use('/auth', require('./controllers/auth'));

// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

app.get('/search', (req, res) => {
  res.render('search');
})

app.get('/search', (req, res) => {

  let item, searchBy, searchVal;

  for (let key in req.query) {
    switch (key) {
      case 'item':
        item = req.query[key];
        break;
      default:
        searchBy = key;
        searchVal = req.query[key];
        break;
    }
  }
})

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
