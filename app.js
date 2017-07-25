var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var Database = require('./server/database.js');
options = {
    reloadTextFiles: false,
    redoPlayers: false,
    checkForBadMatches: false
};
var db = new Database.Database(options);

app.use(express.static('test_client'));

app.post('/getplayer', function(req, res) {
    console.log("Get Player Called.") ;
    console.log(req.body);
    db.getPlayer(res, req.body.user_input);
});

app.listen(3030, function(){
    console.log("Listening on port 3030");
});

