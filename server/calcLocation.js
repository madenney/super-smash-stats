var connInfo = require('./connect').conn;
var mysql = require('mysql');
var _ = require('lodash');
var fs = require('fs');
var count = require('count-array-values');


exports.CalcLocation = function(resolve, reject, players, matches, conn) {

    var tournaments;

    begin();

    // function getMatches() {
    //
    //     var conn = mysql.createConnection(connInfo);
    //     conn.connect(function(err){
    //         if(err) {
    //             console.log("Error Connecting to the database");
    //             throw err;
    //         }
    //
    //         var query = "SELECT * FROM `matches`";
    //         conn.query(query, function(err, rows) {
    //             if(err) {
    //                 console.log("Error with query");
    //                 throw err;
    //             }
    //             console.log(rows.length);
    //             matches = rows;
    //             getPlayers();
    //         });
    //     });
    // };
    //
    // var getPlayers = function() {
    //
    //     var conn = mysql.createConnection(connInfo);
    //     conn.connect(function(err){
    //         if(err) {
    //             console.log("Error Connecting to the database");
    //             throw err;
    //         }
    //
    //         var query = "SELECT * FROM players";
    //         conn.query(query, function(err, rows) {
    //             if(err) {
    //                 console.log("Error with query");
    //                 throw err;
    //             }
    //             console.log(rows.length);
    //             players = rows;
    //             getTournaments();
    //         });
    //     });
    // };

    function begin() {
        getTournaments();
    }

    function getTournaments() {

        var query = "SELECT * FROM tournaments";
        conn.query(query, function(err, rows) {
            if(err) {
                console.log("Error with query");
                reject();
                throw err;
            }
            console.log(rows.length, 'tournaments');
            tournaments = rows;
            analyze();
        });
    };

    // set up player array
    function analyze() {
        console.log('Getting Locations');
        for(i=0;i<players.length;i++){
            players[i].tournaments = [];
            players[i].regions = null;
        }

        //pushing tournaments into player array
        for(i=0;i<matches.length;i++){
            if(i % 10000 == 0) {
                console.log("getting locations...");
            }
            var winnerFound = false;
            var loserFound = false;
            for(j=0;j<players.length;j++){
                if(matches[i].winner === players[j].tag){
                    players[j].tournaments.push(matches[i].tournament);
                    winnerFound = true;
                }
                if(matches[i].loser === players[j].tag){
                    players[j].tournaments.push(matches[i].tournament);
                    loserFound = true;
                }
                if(winnerFound === true && loserFound === true){
                    break;
                }
            }
        }

        console.log("Concluding Location Search");
        // use lodash method _.uniq to filter duplicate tournaments
        for(i=0;i<players.length;i++) {
            players[i].tournaments = _.uniq(players[i].tournaments);
        }

        for(i=0;i<tournaments.length;i++){
            for(j=0;j<players.length;j++){
                for(k=0;k<players[j].tournaments.length;k++) {
                    if (tournaments[i].name === players[j].tournaments[k]) {
                        players[j].tournaments[k] = tournaments[i].region;
                    }
                }
            }
        }

        for(i=0;i<players.length;i++){
            players[i].regions = count(players[i].tournaments, 'region', 'count');
            players[i].regions = players[i].regions[0].region;
        }

        console.log('Finished getting locations');

        resolve();
    };


};