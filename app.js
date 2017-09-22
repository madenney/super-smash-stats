var express = require('express');
var cors = require('cors');
var path = require('path');
var Helper = require('./server/helper.js');
var helper = new Helper.Helper();

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Input Validation / String Sanitization
app.use(function(req, res, next){
    helper.recursiveStringEscape(req.body);
    if(helper.checkForHugeStrings(req.body)){
        req.body = {
            error: true,
            errorMessage: "Massive String Detected."
        }
    };
    next();
});

var Database = require('./server/database.js');
var db = new Database.Database();
var SearchBarHandler = require('./server/searchbarHandler.js');
var searchHandler = SearchBarHandler.SearchBarHandler;


app.post('/autocomplete', function(req, res) {
    console.log("Autocompleting - " + req.body.input);
    db.autocomplete(res, req.body.input, req.body.pageNum, req.body.resultsPerPage, req.body.getTotalPages);
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
    db.getFrontPageInfo(res, req.body.number);
});

app.post('/head2headprofile', function(req, res) {
    console.log("Getting head2head profile");
    db.getHead2HeadProfile(res, req.body.id1, req.body.id2);
});

app.post('/head2headsearch', function(req, res) {
    console.log("Getting head2head search results");
    db.getHead2HeadSearch(res, req.body.player1, req.body.input, req.body.pageNum, req.body.resultsPerPage, req.body.getTotalPages);
});

app.post('/searchbar', function(req, res) {
    console.log("SearchBar Handler");
    searchHandler(res, req.body);
});

// For testing backend endpoints
//app.use(express.static('testing'));

app.use(express.static(path.resolve(__dirname, 'client', 'dist')));
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(3030, function(){
    console.log("Listening on port 3030");
});
