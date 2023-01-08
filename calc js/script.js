const calculator = document.querySelector('#calculator');
const display = calculator.querySelector('.display');
const buttons = calculator.querySelectorAll('.button');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;
let decimalAdded = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    display.textContent = number;
    awaitingNextValue = false;
    decimalAdded = false;
  } else {
    display.textContent = display.textContent === '0' ? number : display.textContent + number;
  }
}

function sendOperatorValue(operator) {
  if (operator === '.') {
    if (!decimalAdded) {
      display.textContent = display.textContent + operator;
      decimalAdded = true;
    }
  } else {
    firstValue = parseFloat(display.textContent);
    operatorValue = operator;
    display.textContent = operator;
    awaitingNextValue = true;
    decimalAdded = false;
  }
}

function calculate() {
  let result = 0;

  switch(operatorValue) {
    case '+':
      result = firstValue + parseFloat(display.textContent);
      break;
    case '-':
      result = firstValue - parseFloat(display.textContent);
      break;
    case '*':
      result = firstValue * parseFloat(display.textContent);
      break;
    case '/':
      result = firstValue / parseFloat(display.textContent);
      break;
  }

  display.textContent = result;
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = true;
  decimalAdded = false;
}

buttons
.forEach(button => {
    button.addEventListener('click', event => {
      const value = event.target.dataset.value;
  
      if (value >= '0' && value <= '9') {
        sendNumberValue(value);
      } else if (value === '+' || value === '-' || value === '*' || value === '/' || value === '.') {
        sendOperatorValue(value);
      } else if (value === '=') {
        calculate();
      }
    });
  });
  
  document.addEventListener('keydown', event => {
    const key = event.key;
  
    if (key >= '0' && key <= '9') {
      sendNumberValue(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
      sendOperatorValue(key);
    } else if (key === 'Enter') {
      calculate();
    }
  });
  