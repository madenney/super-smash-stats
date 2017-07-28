var connInfo = require('./connect').conn;
var mysql = require('mysql');
var _ = require('lodash');

var matches;
var tournaments;
var players = [];
var playersArray = [];
var regionCountArray = [];

var getMatches = function() {

    var conn = mysql.createConnection(connInfo);
    conn.connect(function(err){
        if(err) {
            console.log("Error Connecting to the database");
            throw err;
        }

        var query = "SELECT * FROM `dummy-matches`";
        conn.query(query, function(err, rows) {
            if(err) {
                console.log("Error with query");
                throw err;
            }
            console.log(rows.length);
            matches = rows;
            getPlayers();
        });
    });
};

var getPlayers = function() {

    var conn = mysql.createConnection(connInfo);
    conn.connect(function(err){
        if(err) {
            console.log("Error Connecting to the database");
            throw err;
        }

        var query = "SELECT * FROM players";
        conn.query(query, function(err, rows) {
            if(err) {
                console.log("Error with query");
                throw err;
            }
            console.log(rows.length);
            players = rows;
            getTournaments();
        });
    });
};
var getTournaments = function() {

    var conn = mysql.createConnection(connInfo);
    conn.connect(function(err){
        if(err) {
            console.log("Error Connecting to the database");
            throw err;
        }

        var query = "SELECT * FROM tournaments";
        conn.query(query, function(err, rows) {
            if(err) {
                console.log("Error with query");
                throw err;
            }
            console.log(rows.length);
            tournaments = rows;
            analyze();
        });
    });
};

getMatches();

var analyze = function (){
  console.log('ANALYZING');
    for(i=0;i<players.length;i++){
      playersArray.push([players[i].name])
    }

    console.log('Players Array.length: ', playersArray.length);
    for(i=0;i<matches.length;i++){
        var winnerFound = false;
        var loserFound = false;
        for(j=0;j<players.length;j++){
            if(matches[i].winner === playersArray[j][0]){
                playersArray[j].push(matches[i].tournament);
                winnerFound = true;
            }
            if(matches[i].loser === playersArray[j][0]){
                playersArray[j].push(matches[i].tournament);
                loserFound = true;
            }
            if(winnerFound === true && loserFound === true){
                break;
            }
        }
    }
// use lodash method _.uniq to filter duplicate tournaments
    for(i=0;i<playersArray.length;i++) {
        playersArray[i] = _.uniq(playersArray[i]);
        // console.log('players Array: ', playersArray[i]);
    }
    for(i=0;i<tournaments.length;i++){
        for(j=0;j<playersArray.length;j++){
            for(k=0;k<playersArray[j].length;k++) {
                if (tournaments[i].name === playersArray[j][k]) {
                    playersArray[j][k] = tournaments[i].region;
                }
            }
        }
    }


    //test playersArray
    //why does players .length have ssome players with no regions, but hcanged to 10 works
    for(i=0;i<players.length;i++) {
        console.log(playersArray[i]);
    }
    // counting duplicate regions

    console.log('finished')
};
// THIS IS STILL USING DUMMY-MATCHES
