#!/usr/bin/env ts-node
import {readFileSync, appendFile} from "fs";
export {}
console.log("Hello world!");

let input = readFileSync('input1.txt', 'utf8').split('\n')

function rocketMass(mass) {
        if (mass <= 0)
                return 0;
        console.log(`mass = ${mass}`);
        return (mass + rocketMass(Math.floor(mass / 3) - 2));
}
let tot: number = 0;
console.log(input)

input.forEach(function (str) {
        let num = parseInt(str)
        tot += rocketMass(num) - num;
        console.log(`after ${num}, total is ${tot}`)
});
console.log(tot)
//console.log(rocketMass(100756))
