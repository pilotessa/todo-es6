'use strict';
var inject = require('gulp-inject');

module.exports = {
    hashCode: function (value) {
        var valueForHash = (typeof value === "string") ? value : JSON.stringify(value);

        var hash = 0;
        for (var i = 0; i < valueForHash.length; i++) {
            var character = valueForHash.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
};