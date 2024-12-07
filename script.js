"use strict";

const secondaryDisplay = document.querySelector(".secondary-display");
const primaryDisplay = document.querySelector(".primary-display");

const buttons = document.querySelectorAll(".buttons > div > button");
// console.log(buttons);

buttons.forEach(button => {
    button.addEventListener("click", event => {
        operate(event.target.id);
    });
});

function operate(type) {
    let res;
    switch (type) {
        case "all-clear":
            clear();
            break;
        case "negation":
            res = negate(primaryDisplay.textContent);
            break;
        case "absolute":
            res = absolute(primaryDisplay.textContent);
            break;
    }
    console.log(res);
    return res;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function negate(num) {
    num = Number(num)
    if (isNaN(num)) return;
    return -num;
}

function absolute(num) {
    num = Number(num);
    if (isNaN(num)) return;
    return Math.abs(num);
}

function clear() {
    primaryDisplay.textContent = "";
    secondaryDisplay.textContent = "";
}