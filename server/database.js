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

        var conn = mysql.createConnection(connInfo);
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
                res.end(JSON.stringify(rows[0]));
            });
        });

    }

    this.autocomplete = function(res, input) {

        var conn = mysql.createConnection(connInfo);
        conn.connect(function(err){
            if(err) {
                console.log("Error Connecting to the database");
                throw err;
            }

            var query = "SELECT players.name, players.id, player_info.main, player_info.image_url FROM players LEFT JOIN player_info ON players.name = player_info.tag WHERE players.name LIKE '"+input+"%' LIMIT 6";
            conn.query(query, function(err, rows) {
                if(err) {
                    console.log("Error with query");
                    throw err;
                }

                res.end(JSON.stringify(rows));
            });
        });
    }


};