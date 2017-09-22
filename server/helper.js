/**
 * Created by Matt on 9/15/2017.
 */

var jsStringEscape = require('js-string-escape');

exports.Helper = function() {

    this.recursiveStringEscape = function(obj) {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] === "object") {
                    this.recursiveStringEscape(obj[property]);
                } else {
                    obj[property] = jsStringEscape(obj[property]);
                }
            }
        }
    };

    this.checkForHugeStrings = function(obj) {
        console.log("Checking for massive strings");
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] === "object") {
                    console.log("Object : ", property, property.length);
                    if(property.length > 500){

                    }
                    if(this.checkForHugeStrings(obj[property])){
                        return true;
                    }
                } else {
                    console.log("key : ", property, property.length);
                    if(property.length > 500){
                        return true;
                    }
                    console.log("property : ", obj[property], obj[property].length);
                    if(obj[property].length > 500){
                        return true;
                    }
                }
            }
        }
        return false;
    };
};