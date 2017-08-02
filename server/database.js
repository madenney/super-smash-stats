/**
 * Created by Matt on 7/21/2017.
 */

var mysql = require('mysql');
var connInfo = require('./connect').conn;



exports.Database = function(options) {

    if(options.newData){
        new require('./createDb').createDb(options);
    }

    return;

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

            var query = "SELECT player_info.*, players.rank, players.total_matches_played FROM player_info JOIN players ON players.tag = player_info.tag WHERE players.tag = '" + playerName + "'";
            conn.query(query, function(err, rows) {
                if(err) {
                    console.log("Error with query");
                    throw err;
                }

                res.end(JSON.stringify(rows[0]));
            });
        });

    };

    this.autocomplete = function(res, input, number = 6) {

        var conn = mysql.createConnection(connInfo);
        conn.connect(function(err){
            if(err) {
                console.log("Error Connecting to the database");
                throw err;
            }

            var query = "SELECT players.tag, players.id, player_info.main, player_info.image_url FROM players LEFT JOIN player_info ON players.tag = player_info.tag WHERE players.tag LIKE '"+input+"%' LIMIT " + number;
            conn.query(query, function(err, rows) {
                if(err) {
                    console.log("Error with query");
                    throw err;
                }

                res.end(JSON.stringify(rows));
            });
        });
    };
    //IN PROGRESS : need query and response
    this.getPlayerProfile = function(res,id){

        var conn = mysql.createConnection(connInfo);
        conn.connect(function(err){
            if(err){
                console.log("Error Connecting to the database");
                throw err;
            }

            if(id > 100) {
                var query = "SELECT * FROM players WHERE id = " + id;
            } else {
                var query = "SELECT player_info.*, players.* FROM players JOIN player_info ON players.tag = player_info.tag WHERE players.id = '" + id + "'";
            }
            conn.query(query, function(err,rows){
                if(err){
                    console.log("Error with query");
                    throw err;
                }
                res.end(JSON.stringify(rows[0]));
            })
        })
    };

    this.getHistory = function(res, input, page = 0) {

        var conn = mysql.createConnection(connInfo);
        conn.connect(function(err) {
            if (err) {
                console.log("Error connecting to the database");
                throw err;
            }

            var query = "SELECT * FROM `matches` WHERE matches.winner = '"+input+"' OR matches.loser = '"+input+"' LIMIT "+page*25+", 25";
            conn.query(query, function(err,rows){
                if(err){
                    console.log("Error with query");
                    throw err;
                }
                res.end(JSON.stringify(rows));
            });
        });
    };

    this.getFrontPageInfo = function(res, number = 4) {

        var conn = mysql.createConnection(connInfo);
        conn.connect(function(err) {
            if (err) {
                console.log("Error connecting to the database");
                throw err;
            }

            var query = "SELECT players.tag, players.id, player_info.main, player_info.image_url FROM players LEFT JOIN player_info ON players.tag = player_info.tag LIMIT " + number;
            conn.query(query, function(err,rows){
                if(err){
                    console.log("Error with query");
                    throw err;
                }
                res.end(JSON.stringify(rows));
            });
        });
    }

};
