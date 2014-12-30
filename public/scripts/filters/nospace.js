/**
 * Description:
 *     removes white space from text. useful for html values that cannot have spaces
 * Usage:
 *   {{some text | nospace}}
 * From:
 *   https://gist.github.com/builtbylane/7237798
 */

angular.module("aliga.filters.nospace", []).filter("nospace", function () {
    "use strict";
    return function (value) {
        return (!value) ? "" : value.replace(/ /g, "");
    };
});
