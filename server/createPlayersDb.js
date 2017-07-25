/**
 * Created by Matt on 7/21/2017.
 */

var mysql = require('mysql');
var connInfo = require('./connect').conn;


exports.CreatePlayersDb = function() {

    var players = [];
    var incrementer = 500;
    var dbCounter = 0;
    var conn;

    start();

    // Get matches JSON
    function start() {

        conn = mysql.createConnection(connInfo);
        conn.connect(function(err){
            if(err) {
                console.log("Error connecting to database: ");
                throw err;
            }

            var query = "SELECT * FROM `matches`";
            conn.query(query, function(err, rows) {
                if(err) {
                    console.log("Error with query: ");
                    throw err;
                }
                conn.end();
                extractNames(rows);
                rank(rows);
                sort();
                startConnection();
            });
        });
    }

    function rank(rows) {

        console.log("Ranking Players...")

        // Give every player a starting number of 1000 and a starting number of matches played (0)
        for(var i = 0; i < players.length; i++) {
            players[i] = [players[i], 2000, 0]
        }

        for(var i = 0; i < rows.length; i++) {

            var loserIndex = null;
            var winnerIndex = null;

            // Find winner and loser index in names list
            for(var j = 0; j < players.length; j++) {
                if(rows[i].winner === players[j][0]){
                    winnerIndex = j;
                    break;
                }
            }
            for(var j = 0; j < players.length; j++) {
                if(rows[i].loser === players[j][0]){
                    loserIndex = j;
                    break;
                }
            }

            var RW = Math.pow(10, ( players[winnerIndex][1] / 400 ) );
            var RL = Math.pow(10, ( players[loserIndex][1] / 400 ) );

            var EW = RW / (RW + RL);
            var EL = RL / (RW + RL);

            var newRW = players[winnerIndex][1] + 32 * (1 - EW);
            var newRL = players[loserIndex][1] + 32 * (0 - EL);

            players[winnerIndex][1] = newRW;
            players[loserIndex][1] = newRL;

            players[winnerIndex][2]++;
            players[loserIndex][2]++;

        }

        console.log("Finished ranking");

    }

    function sort() {

        console.log("Sorting...");
        for(var i = 0; i < players.length-1; i++) {

            for(var j = 0; j < players.length - i - 1; j++) {
                if(players[j][1] < players[j+1][1]) {
                    var temp = players[j];
                    players[j] = players[j+1];
                    players[j+1] = temp;
                }
            }
        }

    }

    function extractNames(rows) {

        for(var i = 0; i < rows.length; i++) {
            if(i % 10000 == 0) {
                console.log("Extracting Names...");
            }
            addToPlayers(rows[i].winner);
            addToPlayers(rows[i].loser);
        }
        console.log("Number of players: " + players.length);
    }

    function addToPlayers(name) {
        if(!players.includes(name)) {
            players.push(name);
        }
    }



    // Define the connection and start the query process
    function startConnection() {

        conn = mysql.createConnection(connInfo);
        conn.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + conn.threadId);

            createQueries(conn);
        });
    };

    // From the array, create queries
    function createQueries(conn) {
        console.log("createQueries Function");

        // Need to count the players to make sure they all get passed in later during the transaction
        var playerCount = 0;
        var query = "INSERT INTO `players` (`name`, `rank`, `matches_played`) VALUES ";
        for(var j = dbCounter; j < dbCounter + incrementer; j++) {
            if(typeof players[j] == "undefined") { break; }
            // Escape apostrophes
            if(players[j][0].includes("'")) {
                players[j][0] = players[j][0].replace(/'/g, "\\'");
            }
            query += "('"+players[j][0]+"','"+Math.floor(players[j][1])+"','"+players[j][2]+"'),";
            playerCount++;
        }
        // Slice the comma off the last player
        query = query.slice(0, query.length-1);

        console.log(query);


        // Pass in the connection, the query, the playerCount, and the current number of tries (starts at zero)
        addToDb(conn, query, playerCount, 0);
    }

    // Creates a transaction for the query. If it doesn't work, it tries again two more times
    function addToDb(conn, query, playerCount, tries) {

        console.log("Add to db function");
        /* Begin transaction */
        conn.beginTransaction(function(err) {
            console.log("Number of rows in this query: " + playerCount);
            // Check for errors with the transaction
            if (err) {
                console.log("Error with beginTransaction: ", err);
                return;
            }

            // Make the query
            conn.query(query, function(err, result) {
                console.log("Query made");
                // Check for errors with the query. If failure, then rollback and try again
                if (err) {
                    conn.rollback(function() {
                        console.log("Error with query", err);
                        tries++;
                        if(tries > 2) {
                            console.log("Stopped trying");
                            return;
                        } else {
                            console.log("Trying again...");
                            addToDb(conn, query, playerCount, tries);
                        }
                    });
                    return;
                }

                // Make sure the query added the correct amount of rows. If not, rollback and try again
                if(result.affectedRows != playerCount) {
                    console.log("playerCount does not match affectedRows");
                    conn.rollback(function(){
                        tries++;
                        if(tries > 2) {
                            console.log("Stopped trying");
                            return;
                        } else {
                            console.log("Trying again...");
                            addToDb(conn, query, playerCount, tries);
                        }
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
                    console.log('Transaction Complete.');
                    if(dbCounter > players.length) {
                        console.log("Finished");
                    } else {
                        dbCounter += incrementer;
                        console.log("Starting next iteration");
                        createQueries(conn);
                    }
                });
            });
        });  /* End transaction */
    }

};