#!/usr/bin/env ts-node
"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
console.log("Hello world!");
var input = fs_1.readFileSync('input1.txt', 'utf8').split('\n');
function rocketMass(mass) {
    if (mass <= 0)
        return 0;
    console.log("mass = " + mass);
    return (mass + rocketMass(Math.floor(mass / 3) - 2));
}
var tot = 0;
console.log(input);
input.forEach(function (str) {
    var num = parseInt(str);
    tot += rocketMass(num) - num;
    console.log("after " + num + ", total is " + tot);
});
console.log(tot);
//console.log(rocketMass(100756))
