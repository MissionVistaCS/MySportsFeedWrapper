var Yumyum = require('./app');
Yumyum('USERNAME', 'PASSWORD');

Yumyum.NFL.getActivePlayers(2, function (err, result) {
    if (err) {
        return console.log('Error occurred active_players: ' + err);
    }
    console.log(JSON.stringify(result));
    console.log('');
});

Yumyum.NFL.getBoxScore('20160911-MIA-SEA', function (err, result) {
    if (err) {
        return console.log('Error occurred getBoxScore: ' + err);
    }

    console.log(JSON.stringify(result));
    console.log('');
});

Yumyum.NFL.getScoreboard('20160911', function (err, result) {
    if (err) {
        return console.log('Error occurred getScoreboard: ' + err);
    }

    console.log(JSON.stringify(result));
    console.log('');
});

Yumyum.NFL.getInjuries(function (err, result) {
    if (err) {
        return console.log('Error occurred getInjuries: ' + err);
    }

    console.log(JSON.stringify(result));
    console.log('');
});
