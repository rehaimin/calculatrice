const calculInput = document.getElementById('calcul');
const resultInput = document.getElementById('result');
const formElement = document.querySelector('form');
const historyDiv = document.querySelector('.history');

let keyValue;
let btnId;
let tmp;
let lastOperatorTyped;
let lastKey;
let leftParenthese = false;
let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '÷', 'x', '-', '+', '%'];
let operatorsKeys = ['+', '-', 'x', '÷'];

function showHideHistory() {
    if (history.length > 0) {
        for (let i = 0; i < history.length; i++) {
            document.getElementById('calcul' + i).innerText = history[i].calculation
            document.getElementById('result' + i).innerText = history[i].result
        }
    }

    if (historyDiv.classList.contains('showAnimation')) {
        //hide history
        historyDiv.classList.remove('overFlow');
        historyDiv.classList.replace('showAnimation', 'hideAnimation');
        setTimeout(() => {
            historyDiv.classList.toggle('show');
        }, 250);
    } else {
        //show history
        historyDiv.classList.toggle('show');
        historyDiv.classList.remove('hideAnimation');
        historyDiv.classList.add('showAnimation');
        setTimeout(() => {
            historyDiv.classList.add('overFlow');
        }, 250);
    }
}
document.querySelector('.menuBtn').addEventListener('click', showHideHistory)

let history = [];
if (localStorage.getItem('history') != null) {
    history = history.concat(JSON.parse(localStorage.getItem('history')));
}

function showResult() {
    tmp = calculInput.value;
    tmp = tmp.replace(/x/g, '*').replace(/÷/g, '/').replace(/%/g, '/100');
    if (tmp.endsWith('+') || tmp.endsWith('-') || tmp.endsWith('*') || tmp.endsWith('/') || tmp.endsWith('(')) tmp = tmp.slice(0, -1);
    (eval(tmp) != undefined) ? resultInput.value = eval(tmp): resultInput.value = "";
}

function clearCalculator() {
    calculInput.value = "";
    resultInput.value = "";
    lastOperatorTyped = "";
    lastKey = "";
    leftParenthese = false;
}

function backSpace() {
    if (calculInput.value != "") {
        calculInput.value = calculInput.value.slice(0, -1)
    }
}

function equal() {
    calculInput.value = resultInput.value;
    resultInput.value = "";
}

function saveHistory() {
    let calculation = calculInput.value;
    let result = resultInput.value;
    let historyObject = {
        calculation: calculation,
        result: result,
    }
    history.push(historyObject);
    if (history.length > 3) {
        history.shift();
    }
    localStorage.setItem('history', JSON.stringify(history));
}

function calculate(e) {
    keyValue = e.target.getAttribute('key');
    btnId = e.target.getAttribute('id');
    if (keyValue) {
        if (!leftParenthese && keyValue == '()') {
            keyValue = '(';
            leftParenthese = true;
        } else if (leftParenthese && keyValue == '()') {
            keyValue = ')'
            leftParenthese = false;
        }
        calculInput.value = calculInput.value + keyValue;
        showResult();
        if (operatorsKeys.includes(keyValue)) lastOperatorTyped = keyValue;
        lastKey = keyValue;
    }
    if (btnId) {
        switch (btnId) {
            case "AC":
                clearCalculator();
                break;
            case "backSpace":
                backSpace();
                showResult();
                break;
            case "equal":
                saveHistory();
                equal();
                break;
            default:
                break;
        }
    }
    e.target.blur();
}


formElement.addEventListener('click', calculate);

function keyboardKeysTyping(event) {
    if (keys.includes(event.key)) {
        event.preventDefault();
        document.querySelector("button[key='" + event.key + "']").click();
    } else {
        switch (event.key) {
            case 'Enter':
            case '=':
                event.preventDefault();
                saveHistory();
                equal();
                break;
            case 'Escape':
            case 'Esc':
                clearCalculator();
                break;
            case 'Backspace':
                backSpace();
                showResult();
                break;
            case '/':
                document.querySelector("button[key='÷']").click();
                break;
            case '*':
                document.querySelector("button[key='x']").click();
                break;
            case '(':
            case ')':
                document.querySelector("button[key='()']").click();
                break;
            default:
                break;
        }
    }
}

window.addEventListener('keydown', keyboardKeysTyping)