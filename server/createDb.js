var fs = require('fs');
var mysql = require('mysql');
var connInfo = require('./connect').conn;

exports.createDb = function(options) {

    function interpretOptions() {

        let actionChain = [];
        let promiseChain = [];
        let action;

        if(options.reloadTextFiles) {
            console.log("ReloadTextFiles");
            var promise = new Promise(function(resolve, reject){
                var Reload = require('./reloadTextFiles');
                action = new Reload.Reload(resolve);
                actionChain.push(action);
            });
            promiseChain.push(promise);
        }
        if(options.reloadPlayers) {
            console.log("ReloadPlayersPromise");
            var promise = new Promise(function(resolve, reject){
                var CreatePlayersDb = require('./createPlayersDb');
                action = new CreatePlayersDb.CreatePlayersDb(resolve);
                actionChain.push(action);
            });
            promiseChain.push(promise);
        }
        if(options.calcStats){
            console.log("CalcStatsPromise");
            var promise = new Promise(function(resolve, reject) {
                var CalcStats = require('./calcStats');
                action = new CalcStats.CalcStats(resolve, options.calcLocation);
                actionChain.push(action);
            });
            // promise.catch(function(reason) {
            //     console.log("Rejection Reason: ", reason);
            // });
            promiseChain.push(promise);
        }
        // if(options.getYoutubeURLs) {
        //     var promise = new Promise(function(resolve, reject){
        //         var CreatePlayersDb = require('./createPlayersDb');
        //         action = new CreatePlayersDb.CreatePlayersDb(resolve);
        //         actionChain.push(action);
        //     });
        //     promiseChain.push(promise);
        // }

        function doStuff() {
            setTimeout(function(){
                console.log("HelloWorld");
            }, 1000);
        }

        if(actionChain.length > 0) {
            actionChain[0].run();
            for(var i = 0; i < promiseChain.length - 1; i++) {
                console.log("Promise Number: " + i);
                promiseChain[i].then(actionChain[i+1].run);
            }
        }
    }

    interpretOptions();

};