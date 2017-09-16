/**
 * Created by Matt on 9/15/2017.
 */

var jsStringEscape = require('js-string-escape');

exports.Helper = function() {

    this.recursiveStringEscape = function(obj) {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] == "object") {
                    this.recursiveStringEscape(obj[property]);
                } else {
                    obj[property] = jsStringEscape(obj[property]);
                }
            }
        }
    }
};