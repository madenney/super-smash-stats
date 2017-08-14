/**
 * Created by Matt on 7/21/2017.
 */

var mysql = require('mysql');
var connInfo = require('./connect').conn;
var _ = require('lodash');



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
                res.end(JSON.stringify(rows))
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
    };

    this.getHead2HeadSearch = function(res, player1, input, page = 1, resultsPerPage = 20, getPages = 'false') {
        console.log("Head 2 head Search Function");
        var conn = mysql.createConnection(connInfo);
        conn.connect(function(err) {
            if (err) {
                console.log("Error connecting to the database");
                throw err;
            }

            let rows1;
            let rows2;

            let promise1 = new Promise(function(resolve, reject) {
                let query = "SELECT players.id, players.tag, image_url, main FROM players LEFT JOIN player_info ON player_info.tag = players.tag " +
                    "WHERE players.tag IN (SELECT winner FROM matches " +
                    "WHERE (winner = '"+player1+"' AND loser LIKE '"+input+"%') OR (winner LIKE '"+input+"%' AND loser = '"+player1+"'))";
                    console.log('this is the query: ', query)
                conn.query(query, function(err,rows){
                    if(err){
                        console.log("Error with query");
                        reject();
                        throw err;
                    }
                    rows1 = rows;
                    console.log('this is rows: ', rows);
                    resolve();
                });
            });

            let promise2 = new Promise(function(resolve, reject) {
                let query = "SELECT players.id, players.tag, image_url, main FROM players LEFT JOIN player_info ON player_info.tag = players.tag " +
                    "WHERE players.tag IN (SELECT loser FROM matches " +
                    "WHERE (winner = '"+player1+"' AND loser LIKE '"+input+"%') OR (winner LIKE '"+input+"%' AND loser = '"+player1+"'))";

                conn.query(query, function(err,rows){
                    if(err){
                        console.log("Error with query");
                        reject();
                        throw err;
                    }
                    rows2 = rows;
                    console.log('this is rows: ', rows);
                    resolve();
                });
            });

            Promise.all([promise1, promise2]).then(function() {
                // Concatenate Rows
                let outputRows = [...rows1, ...rows2];
                // Filter out player1 name
                outputRows = outputRows.filter(function( obj ) {
                    return obj.tag.toLowerCase() !== player1.toLowerCase();
                });
                // Uniqify the rows
                outputRows = _.uniqBy(outputRows, function(e) {
                    return e.id;
                });
                // Sort
                outputRows = _.sortBy(outputRows, 'id');
                // Slice into pages
                outputRows = outputRows.slice(((page-1) * resultsPerPage), (((page-1) * resultsPerPage) + resultsPerPage) );
                if(getPages === 'false') {
                    res.end(JSON.stringify({ outputRows }));
                    conn.end();
                } else {
                    var total = Math.ceil(outputRows.length/resultsPerPage);
                    res.end(JSON.stringify({ totalAvailablePages: total , outputRows}));
                    conn.end();
                }
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
                    player1 = rows[0];
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
                    player2 = rows[0];
                    resolve();
                });
            });

            Promise.all([promise1, promise2]).then(function() {

                console.log(player1);
                console.log(player2);


                let tag1 = player1.tag;
                let tag2 = player2.tag;

                var query = "SELECT matches.winner, matches.loser, matches.score, matches.tournament, matches.video_url, tournaments.date " +
                    "FROM matches " +
                    "JOIN tournaments ON tournaments.name = matches.tournament " +
                    "WHERE matches.winner = '"+tag1+"' AND matches.loser = '"+tag2+"' OR matches.winner = '"+tag2+"' AND matches.loser = '"+tag1+"'";
                console.log(query);
                conn.query(query, function(err, rows){
                    if(err){
                        console.log("Error with query");
                        throw err;
                    }
                    conn.end();
                    matchHistory = rows;
                    calculateHead2Head(res, player1, player2, matchHistory);
                });
            });

        });


    };

    function calculateHead2Head(res, player1, player2, history){

        var p1Wins = 0;
        var p2Wins = 0;
        var totalMatches = history.length;
        var yearlyHistory = [];

        for(var i = 0; i < history.length; i++) {
            if(history[i].winner === player1.tag) {
                p1Wins++;
            } else if (history[i].winner === player2.tag) {
                p2Wins++;
            } else {
                console.log("HOW DID YOU EVEN GET HERE");
                return false;
            }

            var re = /(?:.*?\/){2}(.*)/;
            var year = re.exec(history[i].date)[1];
            console.log("year: " + year);
            for(var j = 0; j < yearlyHistory.length; j++) {
                if(yearlyHistory[j].year === year) {
                    if(history[i].winner === player1.tag) {
                        yearlyHistory[j].p1Wins++;
                    } else if (history[i].winner === player2.tag) {
                        yearlyHistory[j].p2Wins++;
                    } else {
                        console.log("HOW DID YOU EVEN GET HERE. TELL ME.");
                        return false;
                    }
                    break;
                }
            }
            if(j === yearlyHistory.length) {
                if(history[i].winner === player1.tag) {
                    yearlyHistory.push({
                        p1Wins: 1,
                        p2Wins: 0,
                        year
                    });
                } else if (history[i].winner === player2.tag) {
                    yearlyHistory.push({
                        p1Wins: 0,
                        p2Wins: 1,
                        year
                    });
                } else {
                    console.log("HOW DID YOU EVEN GET HERE. SERIOUSLY. HOW.");
                    return false;
                }
            }
        }

        res.end(JSON.stringify({
            player1,
            player2,
            p1Wins,
            p2Wins,
            totalMatches,
            yearlyHistory
        }));
    }

};
