"use strict";

var packageData = require('../package.json');
var unirest = require('unirest');
var headerUserAgent = packageData.name + ' (v' + packageData.version + ')';
var limit = require("simple-rate-limiter");

function RLSClient(options) {
    var self = this;
    var apiUrl = options.url || "https://api.rocketleaguestats.com/v1";
    var token = options.token;

    if (typeof token === 'undefined') {
        throw new Error("Token is undefined, please set a token.");
    }

    self._call = limit(function(endpointUrl, callback, queryObj) {
        var Request = unirest.get(apiUrl + endpointUrl);

        Request.headers({
            'Authorization': token,
            'Accept': 'application/json',
            'User-Agent': headerUserAgent
        });

        if (typeof queryObj !== 'undefined') {
            Request.query(queryObj);
        }

        Request.end(function (response) {
            if (response.status === 429) {
                throw new Error("Request has been ratelimited: '" + response.body.message + "'.");
            }

            callback(response.status, response.body);
        });
    }).to(2).per(1000).withFuzz(1);

    self.getPlatformsData = function (callback) {
        self._call('/data/platforms', callback);
    };

    self.getSeasonsData = function (callback) {
        self._call('/data/seasons', callback);
    };

    self.getPlaylistsData = function (callback) {
        self._call('/data/playlists', callback);
    };

    self.getTiersData = function (callback) {
        self._call('/data/tiers', callback);
    };

    self.getPlayer = function (uniqueId, platformId, callback) {
        self._call('/player', callback, {
            unique_id: uniqueId,
            platform_id: platformId
        });
    };

    self.searchPlayers = function (displayName, callback, page) {
        self._call('/search/players', callback, {
            display_name: displayName,
            page: page || 0
        });
    };

    self.getRankedLeaderboard = function (playlistId, callback) {
        self._call('/leaderboard/ranked', callback, {
            playlist_id: playlistId
        });
    };

    self.getStatLeaderboard = function (statType, callback) {
        self._call('/leaderboard/stat', callback, {
            type: statType
        });
    };
}

module.exports.Client = RLSClient;

module.exports.platforms = Object.freeze({
    STEAM: 1,
    PS4: 2,
    XB1: 3
});

module.exports.rankedPlaylists = Object.freeze({
    DUEL: 10,
    DOUBLES: 11,
    SOLO_STANDARD: 12,
    STANDARD: 13
});

module.exports.statType = Object.freeze({
    WINS: "wins",
    GOALS: "goals",
    MVPS: "mvps",
    SAVES: "saves",
    SHOTS: "shots",
    ASSISTS: "assists"
});
