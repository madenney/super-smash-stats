/**
 * Created by Matt on 7/31/2017.
 */
var fs = require('fs');
var mysql = require('mysql');
var connInfo = require('./connect').conn;


exports.Reload = function(resolve) {

    var file1 = 'matches.txt';
    var file2 = 'tournaments.txt';
    var incrementer = 500;
    var doMatches = true;
    var array;
    var conn;
    var self = this;

    // Main Function
    this.run = function() {

        // Figure out file to use
        var file = doMatches ? file1 : file2;

        console.log("Filling Table - " + doMatches ? 'matches' : 'tournaments');

        // Open file and read data from it
        fs.readFile('data/' + file, 'utf8', function(err, data) {
            if(err) {
                console.log("Error reading data file", err);
            } else {
                createArray(data); // Create array
                startConnection(); // Create DB
            }
        });
    };

    // Create an array from the text file
    function createArray(data){
        // Split by line
        data = data.split('\n');
        array = [];
        // For each line in the file
        for(var i = 0; i < data.length - 1; i++) {
            // Escape apostrophes
            if(data[i].includes("'")) {
                data[i] = data[i].replace(/'/g, "\\'");
            }
            // Split by commas
            var line = data[i].split(',');
            // Get rid of this r that shows up sometimes. Not sure why.
            if(line[line.length-1].includes('\r')){
                line[line.length-1] = line[line.length-1].slice(0, line[line.length-1].indexOf('\r'));
            }
            // Push onto array
            array.push(line);
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
        if(doMatches) {
            var query = "INSERT INTO `matches` (`winner`, `loser`, `score`, `tournament`) VALUES ";
            for(var j = chunks[index]; j < chunks[index + 1]; j++) {
                query += "('"+array[j][0]+"','"+array[j][1]+"','"+array[j][2]+"','"+array[j][3]+"'),";
                rowCount++;
            }
        } else {
            var query = "INSERT INTO `tournaments` (`date`, `name`, `entrants`, `city`, `state`, `region`, `winner`, `bracket_link`) VALUES ";
            for(var j = chunks[index]; j < chunks[index + 1]; j++) {
                query += "('"+array[j][0]+"','"+array[j][1]+"','"+array[j][2]+"','"+array[j][3]+"','"+array[j][4]+"','"+array[j][5]+"','"+array[j][6]+"','"+array[j][7]+"'),";
                rowCount++;
            }
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
                        if(doMatches) {
                            doMatches = false;
                            self.run();
                        } else {
                            resolve();
                        }
                    } else {
                        createQueries(chunks, index + 1);
                    }
                });
            });
        });  /* End transaction */
    }
};