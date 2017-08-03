/**
 * Created by Matt on 8/1/2017.
 */
var fs = require('fs');
var mysql = require('mysql');
var connInfo = require('./connect').conn;

exports.CalcStats = function(resolve) {

    this.run = function() {
        console.log("Calculating Stats");
        setTimeout(function() {
            console.log("Stats Calculated");
            resolve();
        }, 1500);
    };
    return;
};