var mysql = require('mysql');
var connInfo = require('./connect').conn;
var Helper = require('./helper.js');
var helper = new Helper.Helper();

exports.CreatePlayersDb = function(resolve) {

    var array = [];
    var aliases = [];
    var incrementer = 500;
    var conn;

    // Get matches JSON
    this.run = function() {


        var clearPlayersPromise = new Promise(function(resolve, reject) { clearPlayersDb(resolve, reject); });
        var getAliasesPromise = new Promise(function(resolve, reject) {
            aliases = helper.getAliases(resolve, reject);
        });

        Promise.all([clearPlayersPromise, getAliasesPromise]).then(function() {

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
        });
    };


    function extractNames(rows) {

        for(var i = 0; i < rows.length; i++) {
            if(i % 10000 === 0) {
                console.log("Extracting Names...");
            }
            addToPlayers(rows[i].winner);
            addToPlayers(rows[i].loser);
        }
        console.log("Number of players: " + array.length);
    }

    function addToPlayers(name) {
        var lowerCaseName = name.toLowerCase();
        var trueName = isAlias(name);
        if(trueName){
            lowerCaseName = trueName;
        }
        for(var i = 0; i < array.length; i++){
            var lowerCaseArrayName = array[i].toLowerCase();
            if(lowerCaseName === lowerCaseArrayName){
                break;
            }
            if(lowerCaseName < lowerCaseArrayName) {
                array.splice(i, 0, name);
                break;
            }
        }
        if(i === array.length) {
            array.push(name);
        }
    }

    function isAlias(name){
        for(var i = 0; i < aliases.length; i++){
            for(var j = 1; j < aliases[i].length; i++){
                if(aliases[i][j] === name){
                    return aliases[i][0];
                }
            }
        }
        return false;
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

    function clearPlayersDb(resolve) {
        console.log("Clearing Players Db");
        var conn = mysql.createConnection(connInfo);
        conn.connect(function(err){
            if(err) {
                console.log("Error connecting to database: ");
                reject();
                throw err;
            }

            var query = "TRUNCATE TABLE players";
            conn.query(query, function(err, rows) {
                if(err) {
                    console.log("Error with query: ");
                    throw err;
                }
                conn.end();
                resolve();
            });
        });
    }
};
