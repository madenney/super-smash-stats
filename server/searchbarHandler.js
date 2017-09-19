/**
 * Created by Matt on 9/13/2017.
 */

var mysql = require('mysql');
var connInfo = require('./connect').conn;

var characters = ['Fox','Falco','Sheik','Marth','Captain Falcon','Jigglypuff','Ice Climbers','Peach','Pikachu','Samus',
    'Doctor Mario','Yoshi','Luigi','Mario','Young Link','Link','Donkey Kong','Ganondorf','Roy','Game And Watch',
    'Mr. Game and Watch','Mewtwo','Zelda','Ness','Pichu','Bowser','Kirby'];
var charactersLowerCase = ['fox','falco','sheik','marth','captain falcon','jigglypuff','ice climbers','peach','pikachu','samus',
    'doctor mario','yoshi','luigi','mario','young link','link','donkey kong','ganondorf','roy','game and watch',
    'mr game and watch','mewtwo','zelda','ness','pichu','bowser','kirby'];

var maximumDropdownLength = 10;


exports.SearchBarHandler = function(res, searchBarObj) {
    console.log("Inside searchbarHandler");
    console.log(searchBarObj);

    // Remove autocomplete
    // if(searchBarObj.bar[searchBarObj.length-1].type === 'autocomplete'){
    //     searchBarObj.bar.pop();
    // }

    // Get preInput
    var preInput = null;
    for(var i = 0; i < searchBarObj.bar.length; i++) {
        if(searchBarObj.bar[i].type === 'input') {
            break;
        }
        preInput = searchBarObj.bar[i];
    }
    if(!preInput) {
        preInput = {type: 'incomplete', text: ''};
        searchBarObj.bar.unshift(preInput);
    }




    // For letters and numbers key presses
    if(searchBarObj.newInputCode >= 48 && searchBarObj.newInputCode <= 90){
        // For inserting VS
        // if(searchBarObj.newInputCode === 86 && (preInput.type === 'player' || preInput.type === 'character')){
        //
        // }
        if(preInput.type === 'incomplete') {
            preInput.text += searchBarObj.newInputKey;
            autocomplete(searchBarObj, preInput, res);
        }
        // } else {
        //     if(true) {
        //         console.log('poop');
        //     }
        // }
    }

};

function autocomplete(searchBarObj, preInput, res) {

    // Clear current dropdown menu and completion
    searchBarObj.dropdown = [];

    // Check for character completion
    for(var i = 0; i < characters.length; i++) {
        for(var j = 0; j < preInput.text.length; j++){
            if(charactersLowerCase[i][j] !== preInput.text[j].toLowerCase()){
                break;
            }
        }
        if(j === preInput.text.length) {
            searchBarObj.dropdown.push({type: 'character', text: characters[i]});
        }
    }


    // Prepare mysql connection
    var conn = mysql.createConnection(connInfo);
    conn.connect(function(err){
        if(err) {
            console.log("Error Connecting to the database");
            throw err;
        }

        // Check for player completion
        var query = "SELECT p.tag, p.id, player_info.main, player_info.image_url " +
                    "FROM players as p " +
                    "LEFT JOIN player_info ON p.tag = player_info.tag " +
                    "WHERE p.tag LIKE '"+preInput.text+"%' " +
                    "LIMIT " + (maximumDropdownLength - searchBarObj.dropdown.length);
        conn.query(query, function(err, rows) {
            if (err) {
                console.log("Error with players query");
                throw err;
            }
            console.log("Number of players: " + rows.length);
            for(var i = 0; i < rows.length; i++) {
                searchBarObj.dropdown.push({
                    type: 'player',
                    text: rows[i].tag,
                    id: rows[i].id,
                    main: rows[i].main
                })
            }


            // if dropdown is filled, then return to client, else, get tournaments
            if(searchBarObj.dropdown.length === maximumDropdownLength) {
                checkForComplete(searchBarObj, preInput);
                end = JSON.stringify(searchBarObj);
                res.end(end);
            } else {
                // If there is still room on the dropdown, then check for tournaments
                var query = "SELECT name, id FROM tournaments " +
                            "WHERE name LIKE '"+preInput.text+"%' " +
                            "LIMIT " + (maximumDropdownLength - searchBarObj.dropdown.length);
                console.log(query);
                conn.query(query, function(err, rows) {
                    if (err) {
                        console.log("Error with tournaments query");
                        throw err;
                    }
                    console.log("Number of tournaments: " + rows.length);
                    for (var i = 0; i < rows.length; i++) {
                        searchBarObj.dropdown.push({
                            type: 'tournament',
                            text: rows[i].name,
                            id: rows[i].id
                        });
                    }
                    checkForComplete(searchBarObj, preInput);
                    end = JSON.stringify(searchBarObj);
                    res.end(end);
                });
            }
        });
    });
}

function checkForComplete(searchBarObj, preInput){

    for(var i = 0; i < searchBarObj.dropdown.length; i++){
        if(searchBarObj.dropdown[i].text === preInput.text){
            preInput.type = searchBarObj.dropdown[i].type;
            searchBarObj.dropdown[i].highlighted = true;
        } else {
            searchBarObj.dropdown[i].highlighted = false;
        }
    }

}