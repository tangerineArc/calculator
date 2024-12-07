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
            res = percentage(primaryDisplay.textContent);
            break;
        case "addition":
            res = add(secondaryDisplay.textContent, primaryDisplay.textContent);
            break;
        case "subtraction":
            res = subtract(secondaryDisplay.textContent, primaryDisplay.textContent);
            break;
        case "multiplication":
            res = multiply(secondaryDisplay.textContent, primaryDisplay.textContent);
            break;
        case "division":
            res = divide(secondaryDisplay.textContent, primaryDisplay.textContent);
            break;
    }

    console.log(res, typeof res);
    return res;
}

function add(num1, num2) {
    if (!num2) return;
    num2 = Number(num2);

    if (!num1) return num2;
    num1 = Number(num1);

    if (isNaN(num1) || isNaN(num2)) return;

    return num1 + num2;
}

function subtract(num1, num2) {
    if (!num2) return;
    num2 = Number(num2);

    if (!num1) return num2;
    num1 = Number(num1);

    if (isNaN(num1) || isNaN(num2)) return;

    return num1 - num2;
}

function multiply(num1, num2) {
    if (!num2) return;
    num2 = Number(num2);

    if (!num1) return num2;
    num1 = Number(num1);

    if (isNaN(num1) || isNaN(num2)) return;

    return num1 * num2;
}

function divide(num1, num2) {
    if (!num2) return;
    num2 = Number(num2);

    if (!num1) return num2;
    num1 = Number(num1);

    if (isNaN(num1) || isNaN(num2)) return;
    if (num2 === 0) return "ZeroDivisionError";

    return num1 / num2;
}

function negate(num) {
    if (!num) return;
    num = Number(num)

    if (isNaN(num)) return;
    return -num;
}

function percentage(num) {
    if (!num) return;
    num = Number(num);

    if (isNaN(num)) return;
    return num / 100;
}

function clear() {
    primaryDisplay.textContent = "";
    secondaryDisplay.textContent = "";
}