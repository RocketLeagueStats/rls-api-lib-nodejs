# Rocket League Stats API - NodeJS Library

<div align="center">
  <br />
  <p>
    <a href="https://discord.gg/fJ5dd25"><img src="https://discordapp.com/api/guilds/335890349425950720/embed.png" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/rls-api"><img src="https://img.shields.io/npm/v/RocketLeagueStats/rls-api-nodejs.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/rls-api"><img src="https://img.shields.io/npm/dt/RocketLeagueStats/rls-api-nodejs.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://david-dm.org/RocketLeagueStats/rls-api-nodejs"><img src="https://img.shields.io/david/RocketLeagueStats/rls-api-nodejs.svg?maxAge=3600" alt="Dependencies" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/rls-api/"><img src="https://nodei.co/npm/rls-api.png?downloads=true&stars=true" alt="NPM info" /></a>
  </p>
</div>

This is the official NodeJS client library for the RocketLeagueStats API.

## Installation
**Node.js 8.0.0 or newer is required.**  
Ignore any warnings about unmet peer dependencies, as they're all optional.

Simply execute `npm install rls-api` to add the library to your coding enviroment.

Then add the following lines of code to the start of your query while making careful consideration to not exposing your API Key.
```
var rls = require('rls-api');

var client = new rls.Client({
    token: "REPLACE_ME_WITH_YOUR_API_KEY"
});
``` 
After that, your ready to go! You can begin making queries to https://rocketleaguestats.com/!

### Links
 * [Rocket League Stats](https://rocketleaguestats.com/)
 * [Example](https://github.com/RocketLeagueStats/rls-api-lib-nodejs/blob/master/example.js)
 * [API Documentation](http://documentation.rocketleaguestats.com/)

