var mysql = require('mysql');
var connInfo = require('./connect').conn;


exports.Classify = function(globalResolve) {

    console.log("Classifying Players");
    var players;


    this.run = function() {

        var promisePlayers = new Promise(function(resolve, reject){ getPlayers(resolve, reject); });
        promisePlayers.then(function() {
            doMath();
        });

    };

    function doMath() {
        console.log("Doing Math...");
        console.log("Number of Players: " + players.length);
        // get the mean
        var total = 0;
        for(var i = 0; i < players.length; i++) {
            total+= players[i].rank;
        }
        var mean = total/players.length;

        total = 0;
        for(var i = 0; i < players.length; i++) {
            total += Math.pow((players[i].rank - mean), 2);
        }
        var standardDeviation = Math.sqrt(total / players.length);

        console.log("Average: ", mean);
        console.log("Standard Deviation: ", standardDeviation);
        globalResolve();
    }

    function getPlayers(resolve, reject) {

        var conn = mysql.createConnection(connInfo);
        conn.connect(conn, function() {
            var query = "SELECT * FROM `players`";
            conn.query(query, function(err, rows) {
                if(err) {
                    console.log("Error with query: ");
                    reject();
                    throw err;
                }
                players = rows;
                conn.end();
                resolve();
            });
        });
    }

};
