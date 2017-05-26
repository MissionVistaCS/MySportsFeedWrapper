var Yumyum = require('./app');
Yumyum('USERNAME', 'PASSWORD');

Yumyum.MAX_PLAYERS = 2; //Default 10

Yumyum.NFL.getActivePlayers(function (err, result) {
    if (err) {
        return console.log('Error occurred active_players: ' + err);
    }
    console.log(JSON.stringify(result));
    console.log('');
});

Yumyum.NFL.setGame('20160911-MIA-SEA');
Yumyum.NFL.getBoxScore(function (err, result) {
    if (err) {
        return console.log('Error occurred getBoxScore: ' + err);
    }

    console.log(JSON.stringify(result));
    console.log('');
});

Yumyum.NFL.setDate('20160911');
Yumyum.NFL.getScoreboard(function (err, result) {
    if (err) {
        return console.log('Error occurred getScoreboard: ' + err);
    }

    console.log(JSON.stringify(result));
    console.log('');
});
