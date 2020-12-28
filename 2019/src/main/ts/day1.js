#!/usr/bin/env ts-node
"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
console.log("Hello world!");
var input = fs_1.readFileSync('input1.txt', 'utf8').split('\n');
var tot = 0;
console.log(input);
input.forEach(function (str) {
    var num = parseInt(str);
    tot += Math.floor(num / 3) - 2;
    console.log("after " + num + ", tot=" + tot);
});
console.log(tot);
