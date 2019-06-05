'use strict';

let state = {};

module.exports.get = function () {
    return state;
};

module.exports.set = function (s) {
    state = s;
};
