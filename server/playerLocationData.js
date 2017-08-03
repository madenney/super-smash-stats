var connInfo = require('./connect').conn;
var mysql = require('mysql');
var _ = require('lodash');
var fs = require('fs');
var count = require('count-array-values');

var matches;
var tournaments;
var players = [];
var playersArray = [];
var regionCountArray = [];
var finalArray = [];

var getMatches = function() {

    var conn = mysql.createConnection(connInfo);
    conn.connect(function(err){
        if(err) {
            console.log("Error Connecting to the database");
            throw err;
        }

        var query = "SELECT * FROM `matches`";
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
// set up player array
var analyze = function (){
  console.log('ANALYZING');
    for(i=0;i<players.length;i++){
      playersArray.push([players[i].tag])
    }

//pushing tournaments into player array
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


    //prints playersArray with all tournaments including dupes
    // fs.writeFileSync('playersArray.json', JSON.stringify(playersArray));

    // counting duplicate regions
    for(i=0;i<players.length;i++){
        regionCountArray.push([players[i].tag])
    }
    for(i=0;i<regionCountArray.length;i++){
        regionCountArray[i].push(count(playersArray[i], 'region', 'count'));
    }
    // fs.writeFileSync('playersRegionCount.json', JSON.stringify(regionCountArray));

    // lastly, filter the highest counted region
    for(i=0;i<players.length;i++){
       finalArray.push([players[i].tag])
    }

    for(i=0;i<regionCountArray.length;i++){
            var highestCount = 0;
            var highestCountIndex;
            for(j=0;j<regionCountArray[i][1].length;j++){
                if(regionCountArray[i][1][j].count > highestCount){
                     highestCount = regionCountArray[i][1][j].count;
                     highestCountIndex = j;
                }
            }
        finalArray[i].push(regionCountArray[i][1][highestCountIndex])
    }
    fs.writeFileSync('playersRegionFinal.json', JSON.stringify(finalArray));
    console.log('finished')
};
