"use strict";
var mytest = (function () {
    return {
        log: function () {
            console.log('This is an IIFE');
        },
        log2: function () {
            console.log('This is an IIFE2');
        }
    };
})();
mytest.log();
mytest.log2();
