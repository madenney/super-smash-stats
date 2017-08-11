var express = require('express');
var cors = require('cors');
var path = require('path');


var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var Database = require('./server/database.js');
options = {
    modifyData: false,
    reloadTextFiles: false,
    reloadPlayers: false,
    calcStats: false,
    calcLocation: false,
    getYoutubeURLs: true
};

var db = new Database.Database(options);


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


//app.use(express.static('./test_client'));
app.use(express.static(path.resolve(__dirname, 'client', 'dist')));

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});


app.listen(3030, function(){
    console.log("Listening on port 3030");
});
