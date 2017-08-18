/**
 * Created by Matt on 8/7/2017.
 */
var mysql = require('mysql');
var connInfo = require('./connect').conn;
var ytsearch = require('youtube-api-search');


exports.GetYoutubeURLs = function() {

    var matches;
    var matchIndex = 0;
    var output = [];
    var conn;
    var retry = false;

    this.run = function() {
        console.log("Getting Youtube URLS");

        getMatches();
    };

    function getMatches(){

        conn = mysql.createConnection(connInfo);
        conn.connect(function(err){
            if(err){
                console.log("Error Connecting to the database");
                throw err;
            }

            console.log("Grabbing Matches");
            // The sorted way
            //var query = "SELECT m.*  FROM `matches` AS m JOIN `players` AS p on p.tag = m.winner ORDER BY p.rank DESC";
            var query = "SELECT matches.id, matches.winner, matches.loser, matches.tournament, matches.video_url FROM `matches` JOIN players ON matches.winner = players.tag ORDER BY players.id ASC";
            conn.query(query, function(err,rows){
                if(err){
                    console.log("Error with query");
                    throw err;
                }
                matches = rows;
                controlSearch();
            })
        })
    };


    function controlSearch() {

        if(!matches[matchIndex]) {
            console.log("Finished");
            return;
        }

        if(retry) {
            if(matches[matchIndex].video_url.length > 3){
                console.log('URL already found or attempted. Skipping');
                matchIndex++;
                controlSearch();
                return;
            }
        } else {
            if (matches[matchIndex].video_url === 'na' || matches[matchIndex].video_url.length > 3) {
                console.log('URL already found or attempted. Skipping');
                matchIndex++;
                controlSearch();
                return;
            }
        }

        var searchTerm = matches[matchIndex].winner +" vs "+ matches[matchIndex].loser +" "+ matches[matchIndex].tournament + " melee singles";
        console.log("Searching: " + searchTerm);
        var options = {
            key: 'AIzaSyBGdYNDwitHpGUZXC5eJ42PcPetEt8jnRc', // Khanh's key
            //key:'AIzaSyCwiZZo-60aGr3Vdjut0eYy3p01CXcjXos', // Matt's key
            // key: 'AIzaSyCFTE9hlB9_RaffTbiWM23chT7Qumdpa0U', // Howard's key
            term: searchTerm.toLowerCase()
        };

        getUrl(options);
    }

    function getUrl(options) {
        ytsearch(options, function(response) {
            //options.term = " tyo vs meercat mini boss melee singles"
            for(var i = 0; i < response.length; i++) {
                var title = response[i].snippet.title.toLowerCase();
                if(checkForMatch(matches[matchIndex], title)) {
                    console.log("\nFound video: " + title);
                    matches[matchIndex].video_url = "https://www.youtube.com/watch?v=" + response[i].id.videoId;
                    break;
                }
            }
            if(matches[matchIndex].video_url === 'x'){
                matches[matchIndex].video_url = 'na';
            }
            updateDb();
        });
    }

    function checkForMatch(match, videoTitle) {
        title = videoTitle.toLowerCase();
        if(!(title.includes(match.winner.toLowerCase()))){
            return false;
        }
        if(!(title.includes(match.loser.toLowerCase()))){
            return false;
        }
        if(!(title.includes(match.tournament.toLowerCase()))){
            return false;
        }
        if(title.includes('highlights')) {
            return false;
        }
        if(title.includes('moments')) {
            return false;
        }
        if(title.includes('analysis')) {
            return false;
        }
        if(title.includes('intro')) {
            return false;
        }
        if(title.includes('doubles')) {
            return false;
        }
        return true;
    }

    function updateDb() {
        console.log("Index: " + matchIndex);

        var query = "UPDATE `matches` SET video_url = '" + matches[matchIndex].video_url + "' WHERE id = '" + matches[matchIndex].id + "'";
        conn.query(query, function(err, result) {
            if(err) {
                console.log("Error with query");
                throw err;
            }
            console.log("Successful update at id: " + matches[matchIndex].id);
            matchIndex++;
            controlSearch();

        });
    }
};
