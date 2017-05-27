var Client = require('node-rest-client').Client;

var client = new Client();

var args = {
    port: '443',
    headers: { "User-Agent": "node " + process.version }
};

client.registerMethod("getNHLActivePlayers", "https://www.mysportsfeeds.com/api/feed/pull/nhl/2016-2017-regular/active_players.json", "GET");
client.registerMethod("getNFLActivePlayers", "https://www.mysportsfeeds.com/api/feed/pull/nfl/2016-2017-regular/active_players.json", "GET");
client.registerMethod("getNBAActivePlayers", "https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/active_players.json", "GET");

client.registerMethod("getNFLInjuries", "https://www.mysportsfeeds.com/api/feed/pull/nfl/2016-2017-regular/player_injuries.json", "GET");

module.exports = function (username, password) {
    args.headers["Authorization"] = "Basic " + Buffer.from(username + ':' + password).toString('base64');
}

module.exports["NHL"] = {
    getActivePlayers: function (max, fn) {
        client.methods.getNHLActivePlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.activeplayers.playerentry;
            obj.length = max;

            fn(false, obj);
        });
    }
}

module.exports["NFL"] = {
    getActivePlayers: function (max, fn) {
        client.methods.getNFLActivePlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.activeplayers.playerentry;
            obj.length = max;

            fn(false, obj);
        });
    },

    getBoxScore: function (id, fn) {
        client.get('https://www.mysportsfeeds.com/api/feed/pull/nfl/2016-2017-regular/game_boxscore.json?gameid=' + id, args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.gameboxscore;

            fn(false, obj);
        });
    },

    getScoreboard: function (date, fn) {
        client.get('https://www.mysportsfeeds.com/api/feed/pull/nfl/2016-2017-regular/scoreboard.json?fordate=' + date, args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.scoreboard.gameScore;

            fn(false, obj);
        });
    },

    getInjuries: function (fn) {
        client.methods.getNFLInjuries(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.playerinjuries.playerentry;

            fn(false, obj);
        });
    }
}

module.exports["NBA"] = {
    getActivePlayers: function (max, fn) {
        client.methods.getNBAActivePlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);

            var obj = data.activeplayers.playerentry;
            obj.length = max;

            fn(false, obj);
        });
    }
}
