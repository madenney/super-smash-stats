/**
 * Created by Matt on 7/21/2017.
 */
var fs = require('fs');
var mysql = require('mysql');

exports.CreateTourneysDb = function() {

    var tourneys = [];
    var incrementer = 500; // Number of tourneys per query
    var counter = 0;

    run(); // This is the constructor

    // Main Function
    function run() {
        // Open file and read data from it
        fs.readFile('data/tournaments.txt', 'utf8', function(err, data) {
            if(err) {
                console.log("Error reading data file", err);
            } else {
                createArray(data); // Create array
                startConnection(); // Create DB
            }
        });

    };

    // Create an array from the matches.txt data
    function createArray(data){
        // Split by line
        data = data.split('\n');

        // For each line in the file
        for(var i = 0; i < data.length - 1; i++) {
            // Escape apostrophes
            if(data[i].includes("'")) {
                data[i] = data[i].replace(/'/g, "\\'");
            }
            // Split by commas
            var tourney = data[i].split(',');
            // Get rid of this r that shows up sometimes. Not sure why.
            if(tourney[7].includes('\r')){
                tourney[7] = tourney[7].slice(0, tourney[7].indexOf('\r'));
            }
            // Push onto match array
            tourneys.push(tourney);
        }
    }

    // Define the connection and start the query process
    function startConnection() {
        var conn = mysql.createConnection({
            host: 'localhost',
            port: '1337',
            user: 'root',
            password: 'root',
            database: 'smashstats'
        });

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

        // Need to count the tourneys to make sure they all get passed in later during the transaction
        var tourneyCount = 0;
        var query = "INSERT INTO `tournaments` (`date`, `name`, `entrants`, `city`, `state`, `region`, `winner`, `bracket_link`) VALUES ";
        for(var j = counter; j < counter + incrementer; j++) {
            if(typeof tourneys[j] == "undefined") { break; }
            query += "('"+tourneys[j][0]+"','"+tourneys[j][1]+"','"+tourneys[j][2]+"','"+tourneys[j][3]+"','"+tourneys[j][4]+"','"+tourneys[j][5]+"','"+tourneys[j][6]+"','"+tourneys[j][7]+"'),";
            tourneyCount++;
        }
        // Slice the comma off the last match
        query = query.slice(0, query.length-1);

        // Pass in the connection, the query, the tourneyCount, and the current number of tries (starts at zero)
        addToDb(conn, query, tourneyCount, 0);
    }

    // Creates a transaction for the query. If it doesn't work, it tries again two more times
    function addToDb(conn, query, tourneyCount, tries) {

        console.log("Add to db function");
        /* Begin transaction */
        conn.beginTransaction(function(err) {
            console.log("Number of rows in this query: " + tourneyCount);
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
                            addToDb(conn, query, tourneyCount, tries);
                        }
                    });
                    return;
                }

                // Make sure the query added the correct amount of rows. If not, rollback and try again
                if(result.affectedRows != tourneyCount) {
                    console.log("tourneyCount does not match affectedRows");
                    conn.rollback(function(){
                        tries++;
                        if(tries > 2) {
                            console.log("Stopped trying");
                            return;
                        } else {
                            console.log("Trying again...");
                            addToDb(conn, query, tourneyCount, tries);
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
                    if(counter > tourneys.length) {
                        console.log("Finished");
                    } else {
                        counter += incrementer;
                        console.log("Starting next iteration");
                        createQueries(conn);
                    }
                });
            });
        });  /* End transaction */
    }
};
