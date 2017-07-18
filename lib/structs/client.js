const { get, post } = require('snekfetch');
const { url } = require('../config.json');

class Client {
	/**
	 * @typedef {Object} ClientOptions
	 * @property {string} token - The api token for the client.
	 */

	/**
	 * @param {ClientOptions} options - The clients options.
	 */
	constructor(options = {}) {
		if (options.token === undefined) throw Error('Please specify a token in the client options.');
		if (options.api === undefined) this.api = undefined;

		/**
		 * The API token for the client.
		 * @type {string[]}
		 */
		this.token = options.token;

		/**
		 * The url of the API (default is the rocketleaguestats APi).
		 * @type {string[]}
		 */
		this.api = options.api;
	}

	/**
     * Returns the platforms and their id.
     * @returns {Promise<Array>}
     */
	platforms() {
		return this._get('/data/platforms');
	}

	/**
     * Returns the rocket league ranked seasons.
     * @returns {Promise<Array>}
     */
	seasons() {
		return this._get('/data/seasons');
	}

	/**
     * Returns the rocket league playlists.
     * @returns {Promise<Array>}
     */
	playlists() {
		return this._get('/data/playlists');
	}

	/**
     * Returns the rocket league tiers AKA rank names and their ids.
     * @returns {Promise<Array>}
     */
	tiers() {
		return this._get('/data/tiers');
	}

	/**
     * Returns a player by their Steam 64 ID, PSN username, or Xbox gamertag.
	 * @param {string} uniqueId - Steam 64 ID / PSN Username / Xbox GamerTag or XUID.
	 * @param {string} platform_id - The platform id.
     * @returns {Promise<Object>}
     */
	player(uniqueId, platformId) {
		return this._get('/player', { unique_id: uniqueId, platform_id: platformId });
	}

	/**
     * Returns an array of players by the array of player objects input.
	 * @param {Array} players - Array of players to get.
     * @returns {Promise<Array>}
     */
	batch(players) {
		return new Promise((resolve, reject) => {
			if (!Array.isArray(players)) reject(new Error('Batch parameter must be an Array.'));
			resolve(this._post('/player/batch', players));
		});
	}

	/**
     * Returns an object with an array containing players found.
	 * @param {string} displayName - The display name of the player to find.
	 * @param {string} page - Which page number to look at.
     * @returns {Promise<Object>}
     */
	searchPlayers(displayName, page) {
		return this._get('/search/players', { display_name: displayName, page: page || 0});
	}

	/**
     * Returns an array with the ranked leaderboards.
	 * @param {string} playlistId - Which playlist to fetch by id.
     * @returns {Promise<Array>}
     */
	rankedLeaderboard(playlistId) {
		return this._get('/leaderboard/ranked', { playlist_id: playlistId });
	}

	/**
     * Returns an array with the stat leaderboards.
	 * @param {string} type - Which type of game to retrieve.
     * @returns {Promise<Array>}
     */
	statLeaderboard(type) {
		return this._get('/leaderboard/stat', { type: type });
	}

	_get(endpoint, query) {
		return new Promise((resolve, reject) => {
			get((this.api || url) + endpoint)
				.set('Authorization', this.token)
				.query(query || {})
				.then(res => {
					if (res.status !== 200) reject(new Error(res.status));
					resolve(res.body);
				});
		});
	}

	_post(endpoint, query) {
		return new Promise((resolve, reject) => {
			if (!query) reject(new Error('No query in post.'));
			post((this.api || url) + endpoint)
				.set('Authorization', this.token)
				.send(query)
				.then(res => {
					if (res.status !== 200) reject(new Error(res.status));
					resolve(res.body);
				});
		});
	}
}

module.exports = Client;