module.exports = {
	Client: require('./structs/client.js'),
	platforms: Object.freeze({
		STEAM: 1,
		PS4: 2,
		XB1: 3
	}),
	rankedPlaylists: Object.freeze({
		DUEL: 10,
		DOUBLES: 11,
		SOLO_STANDARD: 12,
		STANDARD: 13
	}),
	statType: Object.freeze({
		WINS: "wins",
		GOALS: "goals",
		MVPS: "mvps",
		SAVES: "saves",
		SHOTS: "shots",
		ASSISTS: "assists"
	})
};