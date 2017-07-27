var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var Database = require('./server/database.js');
options = {
    reloadTextFiles: false,
    redoPlayers: false,
    checkForBadMatches: false
};
var db = new Database.Database(options);

app.use(express.static('test_client'));

app.post('/autocomplete', function(req, res) {
    console.log("Autocompleting - " + req.body.input);
    db.autocomplete(res, req.body.input);
});

app.post('/match_history', function(req, res) {
    console.log("Getting History - " + req.body.input, req.body.page);
    db.getHistory(res, req.body.input,  req.body.page);
});

app.post('/match_history', function(req, res) {
    console.log("Getting match history - " + req.body.input, req.body.page);
    db.getHistory(res, req.body.input,  req.body.page);
});

app.post('/player_profile', function(req, res) {
    console.log("grabbing player profile - " + req.body.input);
    db.getPlayerProfile(res, req.body.input);
});

app.post('/front_page', function(req, res) {
    console.log("Getting frontpage info");
    db.getFrontPageInfo(res);
});

app.listen(3030, function(){
    console.log("Listening on port 3030");
});

