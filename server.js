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
  axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${api_key}&steamids=${steam_id}')
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

let gamedata;

app.get('/steamgame/search', (req, res) => {
  console.log('wtf');
  axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
  .then(response => {
  console.log('wtf2');
  gamedata = response.data;
  console.log(gamedata);
  return res.render('steamgame/search', {gamedata: response.data});
  })
  .catch(err => {
    console.log(err);
  })
})

app.post('/steamgame/search', (req, res) => {
  axios.get(`https://api.steampowered.com/ISteamApps/GetAppList/v2/`)
  .then(response => {
    if (gamedata.applist.apps.appid == req.body.item)
    console.log(response.data);
    return res.redirect(`/steamgame/${req.body.item}`);
  })
  .catch(err => {
    console.log(err);
  })
})

app.get('/steamgame/:appid', (req, res) => {
  axios.get(`https://api.steampowered.com/ISteamApps/GetAppList/v2/`)
  .then(function (response) {
    // handle success
    let found = false;
    
   //   console.log(response, '===========================================================')
    for (let i = 0; i < response.data.applist.apps.length; i++) {
        let app = response.data.applist.apps[i];

        console.log(app)

        if (app.appid === Number(req.params.appid)) {
            res.json({ data: response.data.applist.apps[i] });
            found = true;
        }
    }
    if (!found) {
        res.json({ data: 'Game does not exist' });
    }
})
.catch(function (error) {
    res.json({ message: 'Data not found. Please try again later.' });
});
})



app.use('/auth', require('./controllers/auth'));

// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=031D3D24A6530B0ED7989AFC928E9B6F&steamids=76561198171430935')
  .then(response => {
    console.log(response.data);
    return res.render('profile', {playerdata: response.data});
  })
  .catch(err => {
    console.log(err);
  })
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
