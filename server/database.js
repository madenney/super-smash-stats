/**
 * Created by Matt on 7/21/2017.
 */

var mysql = require('mysql');
var connInfo = require('./connect').conn;



exports.Database = function(options) {

    if(options.modifyData){
        new require('./createDb').createDb(options);
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

            var query = "SELECT player_info.*, players.rank, players.total_matches_played FROM player_info JOIN players ON players.tag = player_info.tag WHERE players.tag = '" + playerName + "'";
            conn.query(query, function(err, rows) {
                if(err) {
                    console.log("Error with query");
                    throw err;
                }

                res.end(JSON.stringify(rows[0]));
                conn.end();
            });
        });

    };

    this.autocomplete = function(res, input, page = 1, resultsPerPage = 20, getPages = 'false') {

        var conn = mysql.createConnection(connInfo);
        conn.connect(function(err){
            if(err) {
                console.log("Error Connecting to the database");
                throw err;
            }

            var query = "SELECT players.tag, players.id, player_info.main, player_info.image_url FROM players LEFT JOIN " +
                "player_info ON players.tag = player_info.tag WHERE players.tag LIKE '"+input+"%' LIMIT " +
                ((page-1)*resultsPerPage) + ", " + resultsPerPage;
            conn.query(query, function(err, players) {
                if(err) {
                    console.log("Error with query");
                    throw err;
                }

                if(getPages === 'false') {
                    res.end(JSON.stringify({players}));
                    conn.end();
                } else {
                   query = "SELECT * FROM players WHERE players.tag LIKE '"+input+"%'";
                   conn.query(query, function(err, rows){
                        if(err){
                            console.log("Error with count query");
                            throw err;
                        }
                        var total = Math.ceil(rows.length/resultsPerPage);
                        res.end(JSON.stringify({ totalAvailablePages: total , players}));
                        conn.end();
                   });
                }
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
                conn.end();
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
                setTimeout(function() {
                    res.end(JSON.stringify(rows))

                }, 3000);
                conn.end();
            });
        });
    };

    this.getFrontPageInfo = function(res, number = 10) {

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
                conn.end();
            });
        });
    }

    this.getHead2HeadProfile = function(res, id1, id2) {
        console.log("Head 2 Head Profile");
        let player1;
        let player2;
        let matchHistory;

        let conn = mysql.createConnection(connInfo);
        conn.connect(function(err){
            if (err) {
                console.log("Error connecting to the database");
                throw err;
            }
            let promise1 = new Promise(function(resolve, reject) {
                if(id1 > 100) {
                    var query = "SELECT * FROM players WHERE id = " + id1;
                } else {
                    var query = "SELECT player_info.*, players.* FROM players JOIN player_info ON players.tag = player_info.tag WHERE players.id = '" + id1 + "'";
                }
                conn.query(query, function(err, rows){
                    if(err){
                        console.log("Error with query");
                        reject();
                        throw err;
                    }
                    player1 = rows;
                    resolve();
                });
            });
            let promise2 = new Promise(function(resolve, reject) {
                if(id1 > 100) {
                    var query = "SELECT * FROM players WHERE id = " + id2;
                } else {
                    var query = "SELECT player_info.*, players.* FROM players JOIN player_info ON players.tag = player_info.tag WHERE players.id = '" + id2 + "'";
                }
                conn.query(query, function(err, rows){
                    if(err){
                        console.log("Error with query");
                        reject();
                        throw err;
                    }
                    player2 = rows;
                    resolve();
                });
            });

            let promise3;
            Promise.all([promise1, promise2]).then(function() {
                promise3 = new Promise(function(resolve, reject) {
                    var query = 'SELECT * from matches';
                    conn.query(query, function(err, rows){
                        if(err){
                            console.log("Error with query");
                            reject();
                            throw err;
                        }
                        matchHistory = rows;
                        resolve();
                    });
                });
            });

            promise3.then(function() {
                console.log(matchHistory.length);
            })
        });


    }

};
