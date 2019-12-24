#!/usr/bin/env ts-node
import {readFileSync, appendFile} from "fs";
export {}
console.log("Hello world!");

let input = readFileSync('input1.txt', 'utf8').split('\n')
let tot: number = 0;
console.log(input)
input.forEach(function (str) {
        let num = parseInt(str)
        tot += Math.floor(num / 3) - 2;
        console.log(`after ${num}, tot=${tot}`);
});
console.log(tot)
