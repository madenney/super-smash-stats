/**
 * Created by Matt on 7/21/2017.
 */

var mysql = require('mysql');
var connInfo = require('./connect').conn;



exports.Database = function(options) {

    if(options.reloadTextFiles){
        new require('./createDb').createDb();
    }


    this.getPlayer = function(res, playerName) {

        conn = mysql.createConnection(connInfo);
        conn.connect(function(err){
            if(err) {
                console.log("Error connecting to the database");
                throw err;
            }

            // Escape apostrophes
            if(playerName.includes("'")) {
                playerName = players[j][0].replace(/'/g, "\\'");
            }

            var query = "SELECT player_info.*, players.rank, players.matches_played FROM player_info JOIN players ON players.name = player_info.tag WHERE players.name = '" + playerName + "'";
            conn.query(query, function(err, rows) {
                if(err) {
                    console.log("Error with query");
                    throw err;
                }

                console.log(rows);
                res.end(JSON.stringify(rows));
            });
        });

    }

};