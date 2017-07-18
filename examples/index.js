const { Client, platforms, rankedPlaylists, statType } = require('../lib');
const client = new Client({
	token: 'your token here', // Your API key from https://developers.rocketleaguestats.com/
	api: 'https://api.rocketleaguestats.com/v1' // This is optional it defaults to this API anyway.
});

client.platforms().then(platforms => {
	console.log('Platforms:');
	console.log(platforms);
	console.log('');
});

client.seasons().then(seasons => {
	console.log('Seasons:');
	console.log(seasons);
	console.log('');
});

client.playlists().then(playlists => {
	console.log('Playlists:');
	console.log(playlists);
	console.log('');
});

client.tiers().then(tiers => {
	console.log('Tiers:');
	console.log(tiers);
	console.log('');
});

client.player('76561198033338223', platforms.STEAM).then(player => {
	console.log('Player:');
	console.log(player);
	console.log('');
});

const players = [
    {"platformId":"1", "uniqueId":"76561198033338223"},
    {"platformId":"1", "uniqueId":"76561197981122126"},
    {"platformId":"3", "uniqueId":"Loubleezy"},
    {"platformId":"2", "uniqueId":"Wizwonk"}
];

client.batch(players).then(players => {
	console.log('Batch players:');
	console.log(players);
	console.log('');
});

client.searchPlayers('Mike', 0).then(player => {
	console.log('Searched player:');
	console.log(player);
	console.log('');
});

client.rankedLeaderboard(rankedPlaylists.DUEL).then(leaderboard => {
	console.log('leaderboard:');
	console.log(leaderboard);
	console.log('');
});

client.statLeaderboard(statType.GOALS).then(sLeaderboard => {
	console.log('Stat Leaderboard:');
	console.log(sLeaderboard);
	console.log('');
});
