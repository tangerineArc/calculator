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
        case "percentage":
            res = absolute(primaryDisplay.textContent);
            break;
        case "addition":
            res = add(secondaryDisplay.textContent, primaryDisplay.textContent);
            break;
        case "subtraction":
            res = subtract(secondaryDisplay.textContent, primaryDisplay.textContent);
            break;
    }

    console.log(res);
    return res;
}

function add(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    if (isNaN(num1) || isNaN(num2)) return;
    return num1 + num2;
}

function subtract(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    if (isNaN(num1) || isNaN(num2)) return;
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

function percentage(num) {
    num = Number(num);
    if (isNaN(num)) return;
    return num / 100;
}

function clear() {
    primaryDisplay.textContent = "";
    secondaryDisplay.textContent = "";
}