"use strict";

const secondaryDisplay = document.querySelector(".secondary-display");
const primaryDisplay = document.querySelector(".primary-display");

setButtonListeners();

function setButtonListeners() {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    const binaryOperations = ["/", "*", "-", "+"];
    const unaryOperations = ["all-clear", "negation", "percentage"];

    document.querySelectorAll(".buttons > div > button").forEach(button => {
        button.addEventListener("click", event => {
            if ((event.target.textContent === "-" && !primaryDisplay.textContent) || digits.includes(event.target.textContent)) {
                primaryDisplay.textContent = primaryDisplay.textContent.concat(event.target.textContent);
            } else if (primaryDisplay.textContent && binaryOperations.includes(event.target.textContent)) {
                const secondaryDisplayText = secondaryDisplay.textContent.trim();
                if (binaryOperations.includes(secondaryDisplayText[secondaryDisplayText.length - 1])) {
                    secondaryDisplay.textContent = calculate()
                    secondaryDisplay.textContent = secondaryDisplay.textContent.concat(` ${event.target.textContent} `);
                    primaryDisplay.textContent = "";
                } else {
                    secondaryDisplay.textContent = secondaryDisplayText
                        .concat(primaryDisplay.textContent)
                        .concat(` ${event.target.textContent} `);
                    primaryDisplay.textContent = "";
                }
            } else if (unaryOperations.includes(event.target.id)) {
                const res = operateOnUnary(event.target.id);
                if (res) {
                    primaryDisplay.textContent = res;
                }
            } else if (event.target.id === "equals") {
                primaryDisplay.textContent = calculate();
                secondaryDisplay.textContent = "";
            } else if (event.target.id === "delete") {
                primaryDisplay.textContent = primaryDisplay.textContent.slice(0, primaryDisplay.textContent.length - 1);
            }
        });
    });
}

function operateOnUnary(type) {
    switch (type) {
        case "all-clear":
            return clear();
        case "negation":
            return negate(primaryDisplay.textContent);
        case "percentage":
            return percentage(primaryDisplay.textContent);
    }
}

function calculate() {
    const [operand1, operator] = secondaryDisplay.textContent.trim().split(" ");
    const operand2 = primaryDisplay.textContent;

    if (!operand2) return operand1;
    
    switch (operator) {
        case "+":
            return add(operand1, operand2);
        case "-":
            return subtract(operand1, operand2);
        case "*":
            return multiply(operand1, operand2);
        case "/":
            return divide(operand1, operand2);
    }
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