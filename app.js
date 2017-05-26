var Client = require('node-rest-client').Client;

var client = new Client();

var args = {
    port: '443',
    headers: { "User-Agent": "node " + process.version }
};

client.registerMethod("getNHLActivePlayers", "https://www.mysportsfeeds.com/api/feed/pull/nhl/2016-2017-regular/active_players.json", "GET");
client.registerMethod("getNFLActivePlayers", "https://www.mysportsfeeds.com/api/feed/pull/nfl/2016-2017-regular/active_players.json", "GET");
client.registerMethod("getNBAActivePlayers", "https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/active_players.json", "GET");

module.exports = function (username, password) {
    args.headers["Authorization"] = "Basic " + Buffer.from(username + ':' + password).toString('base64');
}

module.exports.MAX_PLAYERS = 10;

module.exports["NHL"] = {
    getActivePlayers: function (fn) {
        client.methods.getNHLActivePlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.activeplayers.playerentry;
            obj.length = module.exports.MAX_PLAYERS;

            fn(false, obj);
        });
    }
}

module.exports["NFL"] = {
    getActivePlayers: function (fn) {
        client.methods.getNFLActivePlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.activeplayers.playerentry;
            obj.length = module.exports.MAX_PLAYERS;

            fn(false, obj);
        });
    },

    getBoxScore: function (fn) {
        client.methods.getNFLBoxScore(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.gameboxscore;

            fn(false, obj);
        });
    },

    getScoreboard: function (fn) {
        client.methods.getNFLScoreboard(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.scoreboard.gameScore;

            fn(false, obj);
        });
    },

    setGame: function (id) {
        client.registerMethod("getNFLBoxScore", "https://www.mysportsfeeds.com/api/feed/pull/nfl/2016-2017-regular/game_boxscore.json?gameid=" + id, "GET");
    },

    setDate: function (date) {
        client.registerMethod("getNFLScoreboard", "https://www.mysportsfeeds.com/api/feed/pull/nfl/2016-2017-regular/scoreboard.json?fordate=" + date, "GET");
    }
}

module.exports["NBA"] = {
    getActivePlayers: function (fn) {
        client.methods.getNBAActivePlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.activeplayers.playerentry;
            obj.length = module.exports.MAX_PLAYERS;

            fn(false, obj);
        });
    }
}
