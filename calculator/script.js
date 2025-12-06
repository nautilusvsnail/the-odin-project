/*
okay this calculator works pretty good, so I'm calling it done. 
here's a list of features to implement if it ever needs improving:
- once solution state is reached, pressing an operator should
write the solution to firstTerm and transition back to SECOND_TERM
- entry field should only truncate, not round. solution should round.
- pressing clear once clears the entry field. pressing it twice clears
the calculator
- once you hit a certain number of digits it switches to scientific notation.
I guess this is how it should handle truncation...
- could chain operations in the running total field
*/


const MAX_STR_LEN = 12;
const DECIMAL_PRECISION = 5;

const operatorNodeList = document.querySelectorAll('.operator');
const numberNodeList = document.querySelectorAll('.digit');
const equalNode = document.querySelector('#equals');
const clearNode = document.querySelector('#clear');
const allClearNode = document.querySelector('#allClear');
const backspaceNode = document.querySelector('#backspace');
const runningTotal = document.querySelector('#running-total');
const entryField = document.querySelector('#entry');
const decimalNode = document.querySelector('#decimal');
const buttonsNode = document.querySelector('#buttons');

const State = Object.freeze({
    FIRST_TERM: "First Term",
    SECOND_TERM: "Second Term",
    SOLVED: "Solved"
});

const Operators = Object.freeze({
    PLUS: "Plus",
    MINUS: "Minus",
    MULTIPLY: "Multiply",
    DIVIDE: "Divide"
});

let firstTerm = 0;
let secondTerm = 0;

let systemState = State.FIRST_TERM;
let entryReg = [];
let operationReg = null;

let numberObj = {};
let operatorObj = {};

let decimalSet = false;

numberNodeList.forEach(btn => { 
    numberObj[btn.id] = btn;
    numberObj[btn.id].val = parseInt(numberObj[btn.id].textContent);
    btn.addEventListener('click', event => {
        handleDigitKeyPress(event.target.textContent)
    });
});

operatorNodeList.forEach(btn => { 
    operatorObj[btn.id] = btn; 
    btn.addEventListener('click', event => {
        handleOperatorKeyPress(event.target.textContent)
    });
});

equalNode.addEventListener('click', handleEqualPress);
clearNode.addEventListener('click', handleClearPress);
allClearNode.addEventListener('click', handleAllClearPress);
backspaceNode.addEventListener('click', handleBackspacePress);
decimalNode.addEventListener('click', handleDecimalPress);

buttonsNode.addEventListener('mouseover', (event) => {
    event.target.classList.add('hover');
});
buttonsNode.addEventListener('mouseout', (event) => {
    event.target.classList.remove('hover');
})

document.addEventListener("keydown", (event) => {
    const keyName = event.key;

    if (isNumeric(keyName)) {
        handleDigitKeyPress(keyName);
    } else if (
        keyName === "+" ||
        keyName === "-" ||
        keyName === "*" ||
        keyName === "/"
    ) {
        handleOperatorKeyPress(keyName);
    } else if ( keyName === "=" || keyName === "Enter" ) {
        handleEqualPress();
    } else if (keyName === ".") {
        handleDecimalPress();
    } else if (keyName === "c") {
        handleAllClearPress();
    } // else do nothing
});

function handleDigitKeyPress(digit) {
    if (systemState === State.SOLVED) {
        clearCalc();
    }
    entryReg.push(digit);
    updateDisplay(entryField, entryReg.join(''));
    // entryField.textContent = truncateString(entryReg.join(''), MAX_STR_LEN);
}

function handleOperatorKeyPress(operator) {
    if (systemState === State.FIRST_TERM) {
        firstTerm = consumeEntryRegister();
        operationReg = operator;
        systemState = State.SECOND_TERM;
        updateDisplay(runningTotal, firstTerm, operator);
        // runningTotal.textContent = [truncateString(firstTerm, MAX_STR_LEN), operator].join(' ');
        entryField.textContent = '';
        decimalSet = false;
    } else if (systemState === State.SECOND_TERM) {
        if (entryReg.length !== 0) {
            secondTerm = consumeEntryRegister();
            let solution = solveCalc(firstTerm, secondTerm, operationReg);
            if (solution !== null) {
                updateDisplay(runningTotal, solution, operator);
                // runningTotal.textContent = [truncateString(solution, MAX_STR_LEN), operator].join(' ');
                firstTerm = solution;
                operationReg = operator;
                systemState = State.SECOND_TERM;
                decimalSet = false;
            } else {
                clearCalc();
            }
        } // else do nothing
    }
}

function solveCalc(first, second, operation) {
    switch (operation) {
        case "/":
            if (second === 0) {
                alert("divide by 0 error");
                return null;
            }
            return first / second;
        case "*":
            return first * second;
        case "+":
            return first + second;
        case "-":
            return first - second;
        default:
            alert("error: invalid operation");
            return null;
    }
}

function handleEqualPress() {
    if (systemState === State.SECOND_TERM) {
        secondTerm = consumeEntryRegister();
        let solution = solveCalc(firstTerm, secondTerm, operationReg);
        if (solution !== null) {
            // updateDisplay doesn't support this and I don't feel like fixing it.
            runningTotal.textContent = [runningTotal.textContent, truncateString(roundToDecimal(secondTerm, DECIMAL_PRECISION), MAX_STR_LEN)].join(' ');
            updateDisplay(entryField, solution);
            // entryField.textContent = truncateString(solution, MAX_STR_LEN);
            firstTerm = solution;
            systemState = State.SOLVED;
            decimalSet = false;
        } else {
            clearCalc();
        }
    }
}

function handleClearPress() {
    clearCurrentEntry();
}

function handleAllClearPress() {
    clearCalc();
}

function handleBackspacePress() {
    const poppedVal = entryReg.pop();
    updateDisplay(entryField, entryReg.join(''));
    // entryField.textContent = truncateString(entryReg.join(''), MAX_STR_LEN);
    if (poppedVal == ".") {
        decimalSet = false;
    }
}

function handleDecimalPress() {
    if (!decimalSet) {
        if (systemState === State.SOLVED) {
            clearCalc();
        }
        entryReg.push('.');
        updateDisplay(entryField, entryReg.join(''));
        // entryField.textContent = truncateString(entryReg.join(''), MAX_STR_LEN);
        decimalSet = true;
    }
}

function clearCalc() {
    firstTerm = 0;
    secondTerm = 0;
    operationReg = null;
    entryReg = [];
    systemState = State.FIRST_TERM;
    runningTotal.textContent = '';
    entryField.textContent = '';
    decimalSet = false;
}

function clearCurrentEntry() {
    entryReg = [];
    entryField.textContent = '';
    decimalSet = false;
}

function consumeEntryRegister() {
    let value;
    if (entryReg.length === 0) {
        value = 0;
    } else {
        value = parseFloat(entryReg.join(''));
    }
    entryReg = [];
    return value;
}

function updateDisplay(field, value, operator = '') {
    if (value === ".") {
        field.textContent = "0.0";
        return;
    }
    const roundedVal = roundToDecimal(value, DECIMAL_PRECISION);
    let truncatedRoundedVal = truncateString(roundedVal, MAX_STR_LEN);
    if (operator !== '') {
        truncatedRoundedVal += ' ' + operator;
    }
    field.textContent = truncatedRoundedVal;
}

// utilities

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function truncateString(inVal, maxLength) {
    const inString = String(inVal);

    if (inString.length <= maxLength) {
        return inString; // Return the original string if it's already within the limit
    } else {
        // Slice the string to the desired length and append "..."
        return inString.slice(0, maxLength) + "...";
    }
}

function roundToDecimal(num, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
}