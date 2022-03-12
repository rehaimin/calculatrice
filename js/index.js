const calculInput = document.getElementById('calcul');
const resultInput = document.getElementById('result');
const formElement = document.querySelector('form');
let keyValue;
let btnId;
let tmp;
let lastOperatorTyped;
let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '÷', 'x', '-', '+', '%'];

function showResult() {
    tmp = calculInput.value;
    tmp = tmp.replace(/x/g, '*').replace(/÷/g, '/');
    if (tmp.endsWith('+') || tmp.endsWith('-') || tmp.endsWith('*') || tmp.endsWith('/')) tmp = tmp.slice(0, -1);
    (eval(tmp) != undefined) ? resultInput.value = eval(tmp): resultInput.value = "";
}

function clearCalculator() {
    calculInput.value = "";
    resultInput.value = "";
    lastOperatorTyped = "";
}

function backSpace() {
    if (calculInput.value != "") {
        calculInput.value = calculInput.value.slice(0, -1)
    }
}

function calculate(e) {
    keyValue = e.target.getAttribute('key');
    btnId = e.target.getAttribute('id');
    if (keyValue) {
        if (keyValue == "+" || keyValue == "-" || keyValue == "x" || keyValue == "÷") {
            lastOperatorTyped = keyValue;
        }
        calculInput.value = calculInput.value + keyValue;
        showResult();
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
                calculInput.value = resultInput.value;
                resultInput.value = "";
                break;
            default:
                break;
        }
    }
    e.target.blur();
}
formElement.addEventListener('click', calculate);

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    if (keys.includes(event.key)) {
        event.preventDefault();
        document.querySelector("button[key='" + event.key + "']").click();
    } else {
        switch (event.key) {
            case 'Enter':
            case '=':
                event.preventDefault();
                calculInput.value = resultInput.value;
                resultInput.value = "";
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
            default:
                break;
        }
    }
});