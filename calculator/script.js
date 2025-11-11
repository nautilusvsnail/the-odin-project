/*
TODO
- Add text entry/viewing window
- Arrange buttons correctly so they can dynamically resize
- Add backspace button
- Add floating point support
- Add keyboard support
*/



const operatorNodeList = document.querySelector('#operators').childNodes;
const numberNodeList = document.querySelector('#numbers').childNodes;
const equalNode = document.querySelector('#equals');
const clearNode = document.querySelector('#clear');

const State = Object.freeze({
    FIRST_TERM: "First Term",
    SECOND_TERM: "Second Term"
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

numberNodeList.forEach(btn => { 
    numberObj[btn.id] = btn;
    numberObj[btn.id].val = parseInt(numberObj[btn.id].textContent);
    btn.addEventListener('click', e => {
        entryReg.push(e.target.textContent);
    });
});

operatorNodeList.forEach(btn => { 
    operatorObj[btn.id] = btn; 
    btn.addEventListener('click', handleOperatorKeyPress)
});

equalNode.addEventListener('click', handleEqualPress);
clearNode.addEventListener('click', handleClearPress);

function handleOperatorKeyPress(e) {
    if (systemState === State.FIRST_TERM) {
        firstTerm = consumeEntryRegister();
        operationReg = e.target.id;
        systemState = State.SECOND_TERM;
    } else if (systemState === State.SECOND_TERM) {
        if (entryReg.length !== 0) {
            secondTerm = consumeEntryRegister();
            let solution = solveCalc(firstTerm, secondTerm, operationReg);
            if (solution !== null) {
                alert(solution);
                firstTerm = solution;
                operationReg = e.target.id;
                systemState = State.SECOND_TERM;
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
            alert(solution);
            clearCalc();
        } else {
            clearCalc();
        }
    }
}

function handleClearPress() {
    clearCalc();
}

function clearCalc() {
    firstTerm = 0;
    secondTerm = 0;
    operationReg = null;
    entryReg = [];
    systemState = State.FIRST_TERM;
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
