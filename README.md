

# `Steam App`

Create a Profile, and search games, with more data coming in the near future...



### To create a user you need:


| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |


### Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /profile | server.js | Regular User Profile |
| GET | /steamgames | server.js | Lists all Applications |
| GET | /steamgame/search | server.js | Searches by name or ID |

##  Installation
`1` The first thing that we are going to do is `fork` and `clone`

`2` Now we are going to install the current dependencies that are listed inside of `package.json`
```text
sudo npm install
```

`3` We need to install some packages that will be used for `authentication`. Those are the following packages:

```text
sudo npm install bcryptjs connect-flash passport passport-local express-session method-override axios
```

`4` Create database `steamapp`

```text
sequelize db:create
```


```js
'Links to data used';

axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${api_key}&steamids=${steam_id}')

axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')

axios.get('http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=031D3D24A6530B0ED7989AFC928E9B6F&steamid=76561198171430935&format=json')
```

##  Goals:

`1` Login through steam's website rather than create account



`2` Display owned games, friends list, and data for owned games

`3` Chat system and adding friends