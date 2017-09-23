/**
 * Created by Matt on 9/22/2017.
 */

var mysql = require('mysql');
var connInfo = require('./connect').conn;

exports.Helper = function() {

    this.getAliases = function(resolve){
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
                resolve();

                var tagsAndAlts = [];
                for(var i = 0; i < rows.length; i++) {
                    var row = [];
                    row.push(rows[i].tag.toLowerCase());
                    var alts = rows[i].split(",");
                    for(var i = 0; i < alts.length; i++){
                        row.push(alts[i].toLowerCase());
                    }
                    tagsAndAlts.push(row);
                }
                return tagsAndAlts;
            });
        });
    }

};