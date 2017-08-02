/**
 * Created by Matt on 7/21/2017.
 */

var mysql = require('mysql');
var connInfo = require('./connect').conn;


exports.CreatePlayersDb = function(resolve) {

    var array = [];
    var incrementer = 500;
    var conn;

    // Get matches JSON
    this.run = function() {

        console.log("Filling Table - players");

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
                startConnection();
            });
        });
    };


    // function rank(rows) {
    //
    //     console.log("Ranking Players...");
    //
    //     // Give every player a starting number of 1000 and a starting number of matches played (0)
    //     for(var i = 0; i < players.length; i++) {
    //         players[i] = [players[i], 2000, 0]
    //     }
    //
    //     for(var i = 0; i < rows.length; i++) {
    //
    //         var loserIndex = null;
    //         var winnerIndex = null;
    //
    //         // Find winner and loser index in names list
    //         for(var j = 0; j < players.length; j++) {
    //             if(rows[i].winner === players[j][0]){
    //                 winnerIndex = j;
    //                 break;
    //             }
    //         }
    //         for(var j = 0; j < players.length; j++) {
    //             if(rows[i].loser === players[j][0]){
    //                 loserIndex = j;
    //                 break;
    //             }
    //         }
    //
    //         var RW = Math.pow(10, ( players[winnerIndex][1] / 400 ) );
    //         var RL = Math.pow(10, ( players[loserIndex][1] / 400 ) );
    //
    //         var EW = RW / (RW + RL);
    //         var EL = RL / (RW + RL);
    //
    //         var newRW = players[winnerIndex][1] + 32 * (1 - EW);
    //         var newRL = players[loserIndex][1] + 32 * (0 - EL);
    //
    //         players[winnerIndex][1] = newRW;
    //         players[loserIndex][1] = newRL;
    //
    //         players[winnerIndex][2]++;
    //         players[loserIndex][2]++;
    //
    //     }
    //
    //     console.log("Finished ranking");
    //
    // }

    // function sort() {
    //
    //     console.log("Sorting...");
    //     for(var i = 0; i < players.length-1; i++) {
    //
    //         for(var j = 0; j < players.length - i - 1; j++) {
    //             if(players[j][1] < players[j+1][1]) {
    //                 var temp = players[j];
    //                 players[j] = players[j+1];
    //                 players[j+1] = temp;
    //             }
    //         }
    //     }
    //
    // }

    function extractNames(rows) {

        for(var i = 0; i < rows.length; i++) {
            if(i % 10000 == 0) {
                console.log("Extracting Names...");
            }
            addToPlayers(rows[i].winner);
            addToPlayers(rows[i].loser);
        }
        console.log("Number of players: " + array.length);
    }

    function addToPlayers(name) {
        if(!array.includes(name)) {
            array.push(name);
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

            var chunks = createChunks();

            createQueries(chunks, 0);
        });
    };

    function createChunks() {
        var chunks = [];
        for(var i = 0; i < array.length; i+= incrementer) {
            chunks.push(i);
        }
        chunks.push(array.length);
        return chunks;
    }

    // From the array, create queries
    function createQueries(chunks, index) {

        // Need to count the matches to make sure they all get passed in later during the transaction
        var rowCount = 0;
        var query = "INSERT INTO `players` (`tag`) VALUES ";
        for(var j = chunks[index]; j < chunks[index + 1]; j++) {
            // Escape apostrophes
            if(array[j].includes("'")) {
                array[j] = array[j].replace(/'/g, "\\'");
            }
            query += "('"+array[j]+"'),";
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
                if(result.affectedRows != rowCount) {
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
                        resolve();
                    } else {
                        createQueries(chunks, index + 1);
                    }
                });
            });
        });  /* End transaction */
    }
};
