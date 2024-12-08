"use strict";

/* TO-DO: Prevent input on integer overflow in js */

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
        button.addEventListener("click", listen);
    });

    document.addEventListener("keydown", listen);


    function listen(event) {
        let targetContent;
        let targetId;
        if (event.type === "click") {
            targetContent = event.target.textContent;
            targetId = event.target.id;
        } else if (event.type === "keydown") {
            targetContent = event.key;
            switch (targetContent) {
                case "~":
                    targetId = "negation";
                    break;
                case "%":
                    targetId = "percentage";
                    break;
                case "Delete":
                    targetId = "all-clear";
                    break;
                case "Enter":
                case "=":
                    targetId = "equals";
                    break;
                case "Backspace":
                    targetId = "delete";
                    break;
            }
        }

        if (isError) {
            isError = false;
            primaryDisplay.textContent = "0";
        }

        if ((targetContent === "-" && !primaryDisplay.textContent) || digits.includes(targetContent)) {
            if (targetContent !== "." || !primaryDisplay.textContent.includes(".")) {
                let res = primaryDisplay.textContent.concat(targetContent)
                if (targetContent !== "." && targetContent !== "0") {
                    primaryDisplay.textContent = Number(res);
                } else if (primaryDisplay.textContent !== "0" || targetContent !== "0") {
                    primaryDisplay.textContent = res;
                }
            }
        } else if ((secondaryDisplay.textContent || primaryDisplay.textContent) && binaryOperations.includes(targetContent)) {
            if (!primaryDisplay.textContent) {
                secondaryDisplay.textContent = secondaryDisplay.textContent
                    .slice(0, secondaryDisplay.textContent.length - 3)
                    .concat(` ${targetContent} `);
            } else if (binaryOperations.includes(secondaryDisplay.textContent.at(-2))) {
                const res = calculate();
                if (res === ZERO_DIVISION_ERROR) {
                    primaryDisplay.textContent = ZERO_DIVISION_ERROR;
                    secondaryDisplay.textContent = "";
                    isError = true;
                } else {
                    secondaryDisplay.textContent = res;
                    secondaryDisplay.textContent = secondaryDisplay.textContent.concat(` ${targetContent} `);
                    primaryDisplay.textContent = "0";
                }
            } else {
                secondaryDisplay.textContent = secondaryDisplay.textContent
                    .concat(primaryDisplay.textContent)
                    .concat(` ${targetContent} `);
                primaryDisplay.textContent = "0";
            }
        } else if (unaryOperations.includes(targetId)) {
            const res = operateOnUnary(targetId);
            if (res) {
                primaryDisplay.textContent = res;
            }
        } else if (targetId === "equals") {
            const res = calculate();
            if (res === ZERO_DIVISION_ERROR) {
                isError = true;
            }
            primaryDisplay.textContent = res;
            secondaryDisplay.textContent = "";
        } else if (targetId === "delete") {
            primaryDisplay.textContent = primaryDisplay.textContent.slice(0, primaryDisplay.textContent.length - 1);
        }
    }
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
    if (!operand1) return operand2;
    
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

    return Number((num1 + num2).toFixed(10));
}

function subtract(num1, num2) {
    if (!num2) return;
    num2 = Number(num2);

    if (!num1) return num2;
    num1 = Number(num1);

    if (isNaN(num1) || isNaN(num2)) return;

    return Number((num1 - num2).toFixed(10));
}

function multiply(num1, num2) {
    if (!num2) return;
    num2 = Number(num2);

    if (!num1) return num2;
    num1 = Number(num1);

    if (isNaN(num1) || isNaN(num2)) return;

    return Number((num1 * num2).toFixed(10));
}

function divide(num1, num2) {
    if (!num2) return;
    num2 = Number(num2);

    if (!num1) return num2;
    num1 = Number(num1);

    if (isNaN(num1) || isNaN(num2)) return;
    if (num2 === 0) return ZERO_DIVISION_ERROR;

    return Number((num1 / num2).toFixed(10));
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
    return Number((num / 100).toFixed(10));
}

function clear() {
    primaryDisplay.textContent = "0";
    secondaryDisplay.textContent = "";
}