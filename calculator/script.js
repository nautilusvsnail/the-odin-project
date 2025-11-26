/*
TODO
- Add text entry/viewing window
- Arrange buttons correctly so they can dynamically resize
- Add backspace button
- Add floating point support
- Add keyboard support
*/



const operatorNodeList = document.querySelectorAll('.operator');
const numberNodeList = document.querySelectorAll('.digit');
const equalNode = document.querySelector('#equals');
const clearNode = document.querySelector('#clear');
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
    btn.addEventListener('click', handleDigitKeyPress);
});

operatorNodeList.forEach(btn => { 
    operatorObj[btn.id] = btn; 
    btn.addEventListener('click', handleOperatorKeyPress)
});

equalNode.addEventListener('click', handleEqualPress);
clearNode.addEventListener('click', handleClearPress);
decimalNode.addEventListener('click', handleDecimalPress);

buttonsNode.addEventListener('mouseover', (event) => {
    event.target.classList.add('hover');
});
buttonsNode.addEventListener('mouseout', (event) => {
    event.target.classList.remove('hover');
})

document.addEventListener("keydown", (event) => {
    const keyName = event.key;

    if (event.code.includes("Digit")) {
        handleDigitKeyPress(event);
    } else if (
        keyName === "+" ||
        keyName === "-" ||
        keyName === "*" ||
        keyName === "/"
    ) {
        handleOperatorKeyPress(event);
    } else if ( keyName === "=" ) {
        handleEqualPress();
    } else if (keyName === ".") {
        handleDigitKeyPress(event);
    } else if (keyName === "c") {
        handleClearPress();
    } // else do nothing
});

function handleDigitKeyPress(event) {
    if (systemState === State.SOLVED) {
        clearCalc();
    }
    entryReg.push(event.target.textContent);
    entryField.textContent = entryReg.join('');
}

function handleOperatorKeyPress(event) {
    if (systemState === State.FIRST_TERM) {
        firstTerm = consumeEntryRegister();
        operationReg = event.target.id;
        systemState = State.SECOND_TERM;
        runningTotal.textContent = [firstTerm, event.target.textContent].join(' ');
        entryField.textContent = '';
        decimalSet = false;
    } else if (systemState === State.SECOND_TERM) {
        if (entryReg.length !== 0) {
            secondTerm = consumeEntryRegister();
            let solution = solveCalc(firstTerm, secondTerm, operationReg);
            if (solution !== null) {
                runningTotal.textContent = [solution, event.target.textContent].join(' ');
                firstTerm = solution;
                operationReg = event.target.id;
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
        case "divide":
            if (second === 0) {
                alert("divide by 0 error");
                return null;
            }
            return first / second;
        case "multiply":
            return first * second;
        case "plus":
            return first + second;
        case "minus":
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
            runningTotal.textContent = [runningTotal.textContent, secondTerm].join(' ');
            entryField.textContent = solution;
            firstTerm = solution;
            systemState = State.SOLVED;
            decimalSet = false;
        } else {
            clearCalc();
        }
    }
}

function handleClearPress() {
    clearCalc();
}

function handleDecimalPress() {
    if (!decimalSet) {
        if (systemState === State.SOLVED) {
            clearCalc();
        }
        entryReg.push('.');
        entryField.textContent = entryReg.join('');
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
