var mysql = require('mysql');
var connInfo = require('./connect').conn;


exports.classify = function() {

    console.log("Classifying Players");
    var players;

    run();

    function run() {

        var promisePlayers = new Promise(function(resolve, reject){ getPlayers(resolve, reject); });
        promisePlayers.then(function() {
            doMath();
        });

    };

    function doMath() {
        console.log("Doing Math...");
        // get the mean
        var total = 0;
        for(var i = 0; i < players.length; i++) {
            total+= players[i].rank;
        }
        var mean = total/players.length;

        total = 0;
        for(var i = 0; i < players.length; i++) {
            total += Math.pow((players.rank - mean), 2);
        }
        var standardDeviation = Math.sqrt(total / players.length);

        console.log("Average: ", mean);
        console.log("Standard Deviation: ", standardDeviation);

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