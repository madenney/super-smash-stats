/**
 * Created by Matt on 8/1/2017.
 */
var fs = require('fs');
var mysql = require('mysql');
var connInfo = require('./connect').conn;


exports.CalcStats = function(globalResolve, calcLocation) {

    var players = [];
    var matches = [];
    var incrementer = 500;
    var conn;

    this.run = function() {
        console.log("Calculating Stats");

        conn = mysql.createConnection(connInfo);
        conn.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            var promisePlayers = new Promise(function(resolve, reject){ getPlayers(resolve, reject); });
            var promiseMatches = new Promise(function(resolve, reject){ getMatches(resolve, reject); });
            Promise.all([promisePlayers, promiseMatches]).then(function() {
                console.log("Grabbed matches and players from db. Starting Calculations.");
                beginCalculations();
            });
        });
    };

    function beginCalculations() {
        resetValues();
        rank();
        sort();
        countWins();
        var promiseChain = [];
        if(calcLocation) {
            var CalculateLocation = require('./calcLocation');
            var promiseLocation = new Promise(function(resolve, reject) { CalculateLocation.CalcLocation(resolve, reject, players, matches, conn)});
            promiseChain.push(promiseLocation);
        }
        promiseChain.push( new Promise(function(resolve, reject) { clearPlayersDb(resolve, reject); }) );
        Promise.all(promiseChain).then(startConnection);
    }

    function resetValues() {
        for(var i = 0; i < players.length; i++){
            players[i].rank = 2000;
            players[i].total_matches_played = 0;
            players[i].games_vs_sub100 = 0;
            players[i].wins_vs_sub100 = 0;
            players[i].games_vs_26_100 = 0;
            players[i].wins_vs_26_100 = 0;
            players[i].games_vs_6_25 = 0;
            players[i].wins_vs_6_25 = 0;
            players[i].games_vs_top5 = 0;
            players[i].wins_vs_top5 = 0;
        }
    }


    function countWins(){
        console.log("Counting wins");
        for(var i = 0; i < matches.length; i++) {

            if(i % 10000 === 0) {
                console.log("counting...");
            }


            var loserIndex = null;
            var winnerIndex = null;

            // Find winner and loser index in players array
            var winnerUpperCase = matches[i].winner.toLowerCase();
            for(var j = 0; j < players.length; j++) {
                if(winnerUpperCase === players[j].tag.toLowerCase()){
                    winnerIndex = j;
                    break;
                }
            }
            var loserUpperCase = matches[i].loser.toLowerCase();
            for(var j = 0; j < players.length; j++) {
                if(loserUpperCase === players[j].tag.toLowerCase()){
                    loserIndex = j;
                    break;
                }
            }

            if(loserIndex < 5) {
                players[winnerIndex].games_vs_top5++;
                players[winnerIndex].wins_vs_top5++;
            } else if(loserIndex < 25) {
                players[winnerIndex].games_vs_6_25++;
                players[winnerIndex].wins_vs_6_25++;
            }
            else if(loserIndex < 100) {
                players[winnerIndex].games_vs_26_100++;
                players[winnerIndex].wins_vs_26_100++;
            }
            else {
                players[winnerIndex].games_vs_sub100++;
                players[winnerIndex].wins_vs_sub100++;
            }

            if(winnerIndex < 5) {
                players[loserIndex].games_vs_top5++;
            } else if(winnerIndex < 25) {
                players[loserIndex].games_vs_6_25++;
            }
            else if(winnerIndex < 100) {
                players[loserIndex].games_vs_26_100++;
            }
            else {
                players[loserIndex].games_vs_sub100++;
            }
        }
    }

    function rank() {

        console.log("Ranking Players...");

        for(var i = matches.length - 1; i > -1; i--) {

            if(i % 10000 === 0){
                console.log("ranking...");
            }


            var loserIndex = null;
            var winnerIndex = null;

            // Find winner and loser index in players array
            var winnerLowerCase = matches[i].winner.toLowerCase();
            for(var j = 0; j < players.length; j++) {
                if(winnerLowerCase === players[j].tag.toLowerCase()){
                    winnerIndex = j;
                    break;
                }
            }
            var loserLowerCase = matches[i].loser.toLowerCase();
            for(var j = 0; j < players.length; j++) {
                if(loserLowerCase === players[j].tag.toLowerCase()){
                    loserIndex = j;
                    break;
                }
            }

            var RW = Math.pow(10, ( players[winnerIndex].rank / 400 ) );
            var RL = Math.pow(10, ( players[loserIndex].rank / 400 ) );

            var EW = RW / (RW + RL);
            var EL = RL / (RW + RL);

            var newRW = players[winnerIndex].rank + 32 * (1 - EW);
            var newRL = players[loserIndex].rank + 32 * (0 - EL);

            players[winnerIndex].rank = newRW;
            players[loserIndex].rank = newRL;

            players[winnerIndex].total_matches_played++;
            players[loserIndex].total_matches_played++;

        }

        console.log("Finished ranking");
    }

    function sort() {
        console.log("Sorting...");
        for(var i = 0; i < players.length-1; i++) {
            for(var j = 0; j < players.length - i - 1; j++) {
                if(players[j].rank < players[j+1].rank) {
                    var temp = players[j];
                    players[j] = players[j+1];
                    players[j+1] = temp;
                }
            }
        }

    }

    function getPlayers(resolve, reject) {

        var query = "SELECT * FROM `players`";
        conn.query(query, function(err, rows) {
            if(err) {
                console.log("Error with query: ");
                reject();
                throw err;
            }
            players = rows;
            resolve();
        });
    }

    function getMatches(resolve, reject) {

        var query = "SELECT * FROM `matches`";
        conn.query(query, function(err, rows) {
            if(err) {
                console.log("Error with query: ");
                reject();
                throw err;
            }
            matches = rows;
            resolve();
        });
    }


    function clearPlayersDb(resolve) {
        console.log("Clearing Player DB");
        var query = "TRUNCATE TABLE players";
        conn.query(query, function(err, rows) {
            if(err) {
                console.log("Error with query: ");
                throw err;
            }
            resolve();
        });
    }

    // Define the connection and start the query process
    function startConnection() {

        var chunks = createChunks();
        createQueries(chunks, 0);
    };

    function createChunks() {
        var chunks = [];
        for(var i = 0; i < players.length; i+= incrementer) {
            chunks.push(i);
        }
        chunks.push(players.length);
        return chunks;
    }

    // From the array, create queries
    function createQueries(chunks, index) {

        // Need to count the matches to make sure they all get passed in later during the transaction
        var rowCount = 0;
        var query = "INSERT INTO `players` (`tag`, `location`, `rank`, `total_matches_played`, `games_vs_sub100`, " +
            "`wins_vs_sub100`, `games_vs_26_100`, `wins_vs_26_100`, `games_vs_6_25`, `wins_vs_6_25`, `games_vs_top5`, `wins_vs_top5`) VALUES ";
        for(var i = chunks[index]; i < chunks[index + 1]; i++) {
            // Escape apostrophes
            if(players[i].tag.includes("'")) {
                players[i].tag = players[i].tag.replace(/'/g, "\\'");
            }
            query += "('"+players[i].tag+"','"+players[i].regions+"','"+players[i].rank+"','"+players[i].total_matches_played+"','"+players[i].games_vs_sub100+
                "','"+players[i].wins_vs_sub100+"','"+players[i].games_vs_26_100+"','"+players[i].wins_vs_26_100+"','"+
                players[i].games_vs_26_100+"','"+players[i].wins_vs_6_25+"','"+players[i].games_vs_top5+
                "','"+players[i].wins_vs_top5+"'),";
            rowCount++;
        }

        // Slice the comma off the last match
        query = query.slice(0, query.length-1);

        // Pass in the connection, the query, the rowcount
        addToDb(query, rowCount, chunks, index);
    }

    // Creates a transaction for the query
    function addToDb(query, rowCount, chunks, index) {

        /* Begin transaction */
        conn.beginTransaction(function(err) {
            console.log("Number of rows in this query: " + rowCount);
            // Check for errors with the transaction
            if (err) {
                console.log("Error with beginTransaction: ", err);
                return;
            }

            // Make the query
            conn.query(query, function(err, result) {

                // Check for errors with the query. If failure, then rollback and try again
                if (err) {
                    conn.rollback(function() {
                        console.log(err);
                        console.log("Error with query. Trying again...");
                        //addToDb(query, rowCount);
                    });
                    return;
                }

                // Make sure the query added the correct amount of rows. If not, rollback and try again
                if(result.affectedRows !== rowCount) {
                    console.log("matchCount does not match affectedRows");
                    conn.rollback(function(){
                        console.log("Incorrect number of rows. Trying again...");
                        addToDb(query, rowCount);
                    });
                    return;
                }

                // Commit the changes
                conn.commit(function(err) {
                    if (err) {
                        console.log("Commit Failed");
                        conn.rollback(function() {
                            console.log("Commit error:");
                            throw err;
                        });
                        return;
                    }

                    if(index + 1 >= chunks.length - 1) {
                        console.log("Finished");
                        conn.end();
                        globalResolve();
                    } else {
                        createQueries(chunks, index + 1);
                    }
                });
            });
        });  /* End transaction */
    }

};
