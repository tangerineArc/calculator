"use strict";

const ZERO_DIVISION_ERROR = ":(";

const secondaryDisplay = document.querySelector(".secondary-display");
const primaryDisplay = document.querySelector(".primary-display");

setButtonListeners();

function setButtonListeners() {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    const binaryOperations = ["/", "*", "-", "+"];
    const unaryOperations = ["all-clear", "negation", "percentage"];

    let isError = false;

    document.querySelectorAll(".buttons > div > button").forEach(button => {
        button.addEventListener("click", event => {
            if (isError) {
                isError = false;
                primaryDisplay.textContent = "";
            }

            if ((event.target.textContent === "-" && !primaryDisplay.textContent) || digits.includes(event.target.textContent)) {
                if (event.target.textContent !== "." || !primaryDisplay.textContent.includes(".")) {
                    primaryDisplay.textContent = primaryDisplay.textContent.concat(event.target.textContent);
                }
            } else if ((secondaryDisplay.textContent || primaryDisplay.textContent) && binaryOperations.includes(event.target.textContent)) {
                if (!primaryDisplay.textContent) {
                    secondaryDisplay.textContent = secondaryDisplay.textContent
                        .slice(0, secondaryDisplay.textContent.length - 3)
                        .concat(` ${event.target.textContent} `);
                } else if (binaryOperations.includes(secondaryDisplay.textContent.at(-2))) {
                    const res = calculate();
                    if (res === ZERO_DIVISION_ERROR) {
                        primaryDisplay.textContent = ZERO_DIVISION_ERROR;
                        secondaryDisplay.textContent = "";
                        isError = true;
                    } else {
                        secondaryDisplay.textContent = res;
                        secondaryDisplay.textContent = secondaryDisplay.textContent.concat(` ${event.target.textContent} `);
                        primaryDisplay.textContent = "";
                    }
                } else {
                    secondaryDisplay.textContent = secondaryDisplay.textContent
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
                const res = calculate();
                if (res === ZERO_DIVISION_ERROR) {
                    isError = true;
                }
                primaryDisplay.textContent = res;
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
    if (num2 === 0) return ZERO_DIVISION_ERROR;

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