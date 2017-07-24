/**
 * Created by Matt on 7/21/2017.
 */

var mysql = require('mysql');



exports.Database = function(options) {

    var conn = mysql.createConnection({
        host: 'localhost',
        port: '1337',
        user: 'root',
        password: 'root',
        database: 'smashstats'
    });


    if(options.reloadTextFiles) {
        var CreateMatchesDb = require('./createMatchesDb');
        var matchesDb = new CreateMatchesDb.CreateMatchesDb();
        //var CreateTourneysDb = require('./createTourneysDb');
        //var ctdb = new CreateTourneysDb.CreateTourneysDb();
    }

    if(options.redoPlayers) {
        var CreatePlayersDb = require('./createPlayersDb');
        var cpdb = new CreatePlayersDb.CreatePlayersDb();
    }

    this.getPlayer = function(res, playerName) {
        console.log("Database getting " + playerName);

        conn.connect(function(err){
            if(err) {
                console.log("Error connecting to database: ");
                throw err;
            }

            // Escape apostrophes
            if(playerName.includes("'")) {
                playerName = players[j][0].replace(/'/g, "\\'");
            }

            var query = "SELECT * FROM `matches` WHERE `name` = '" + playerName + "'";
            conn.query(query, function(err, rows) {
                if(err) {
                    console.log("Error with query: ");
                    throw err;
                }

                res.end(rows);

            });
        });



        return JSON.stringify({result: "hello"});
    }

};