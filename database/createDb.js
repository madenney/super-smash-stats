
createDb();

function createDb() {

    console.log("Database Creator:");

    var options = {
        modifyData: true,
        reloadTextFiles: false,
        reloadPlayers: false,
        calcStats: false,
        calcLocation: false,
        getYoutubeURLs: true,
        classify: false
    };



    if(options.modifyData){
        console.log("Options: ");
        console.log(options);
        interpretOptions();
    } else {
        console.log("Modify Data: False");
    }


    function interpretOptions() {
        let actionChain = [];
        let promiseChain = [];
        let action;

        if(options.reloadTextFiles) {
            console.log("Option: Reload Text Files");
            var promise = new Promise(function(resolve, reject){
                var Reload = require('./reloadTextFiles');
                action = new Reload.Reload(resolve);
                actionChain.push(action);
            });
            promiseChain.push(promise);
        }
        if(options.reloadPlayers) {
            console.log("Option: Extract Players");
            var promise = new Promise(function(resolve, reject){
                var CreatePlayersDb = require('./createPlayersDb');
                action = new CreatePlayersDb.CreatePlayersDb(resolve);
                actionChain.push(action);
            });
            promiseChain.push(promise);
        }
        if(options.calcStats){
            console.log("Option: Calculate Stats");
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
        if(options.getYoutubeURLs) {
            console.log("Option: Get Youtube URLs");
            var promise = new Promise(function(resolve, reject){
                var GetYoutubeUrls = require('./getYoutubeUrls');
                action = new GetYoutubeUrls.GetYoutubeURLs(resolve);
                actionChain.push(action);
            });
            promiseChain.push(promise);
        }

        function doStuff() {
            setTimeout(function(){
                console.log("HelloWorld");
            }, 1000);
        }

        if(actionChain.length > 0) {
            actionChain[0].run();
            for(var i = 0; i < promiseChain.length - 1; i++) {
                promiseChain[i].then(actionChain[i+1].run);
            }
        }
    }

};
