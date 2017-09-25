/**
 * Created by Matt on 9/22/2017.
 */

var mysql = require('mysql');
var connInfo = require('./connect').conn;

exports.Helper = function() {

    this.getAliases = function(aliases, resolve){
        console.log("Getting Aliases");
        var conn = mysql.createConnection(connInfo);
        conn.connect(function(err){
            if(err) {
                console.log("Error connecting to database: ");
                reject();
                throw err;
            }

            var query = "SELECT tag, alt_tags FROM player_info WHERE LENGTH(alt_tags) > 0";
            conn.query(query, function(err, rows) {
                if(err) {
                    console.log("Error with query: ");
                    throw err;
                }
                conn.end();
                for(var i = 0; i < rows.length; i++) {
                    var row = [];
                    row.push(rows[i].tag);
                    var alts = rows[i].alt_tags.split(",");
                    for(var j = 0; j < alts.length; j++){
                        row.push(alts[j].toLowerCase());
                    }
                    aliases.push(row);
                }
                resolve();

            });
        });
    }

};