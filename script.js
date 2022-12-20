const disableKeyboard = event => {
  return event.preventDefault();
};

document.addEventListener('keypress', disableKeyboard);

const operationInputDOM = document.querySelector('.screen__input');
const displayResultDOM = document.querySelector('.screen__result');
const btnsDOM = document.querySelectorAll('.row__btn:not([data-clear], [data-delete], [data-equal], [data-parentheses])');
const btnClearAllDOM = document.querySelector('[data-clear]');
const btnDeleteDOM = document.querySelector('[data-delete]');
const btnEqualDOM = document.querySelector('[data-equal]');
const btnParenthesesDOM = document.querySelector('[data-parentheses]');
let parenthese = true;

class Calculator {
  constructor() {
    this.operation = '';
  }
  insertParentheses() {
    if (parenthese) {
      this.operation += '(';
      operationInputDOM.value = this.operation;
      parenthese = !parenthese;
    } else {
      this.operation += ')';
      operationInputDOM.value = this.operation;
      parenthese = !parenthese;
    }
  }
  insertChar(char) {
    operationInputDOM.value = '';
    this.operation += char;
    operationInputDOM.value += this.operation;
    char === '=' ? null : this.displayResult(char);
  }
  clearAll() {
    this.operation = '';
    this.result = '';
    operationInputDOM.value = this.operation;
    displayResultDOM.innerHTML = '&nbsp';
  }
  compute() {
    try {
      const op = {
        '÷': '/',
        '×': '*',
        '–': '-',
        ',': '.',
      };
      const result = eval(this.operation.replace(/([÷×–,])/g, signal => op[signal]));
      return result;
    } catch (e) {
      return Error('Formatação');
    }
  }
  deleteChar() {
    this.operation = this.operation.slice(0, -1);
    operationInputDOM.value = this.operation;
    displayResultDOM.innerHTML = this.operation ? this.operation : '&nbsp';
  }
  displayResult(char) {
    if (char === '=') {
      this.operation = `${this.compute(char)}`;
      operationInputDOM.value = this.operation;
      displayResultDOM.innerHTML = '&nbsp';
    } else {
      displayResultDOM.innerHTML = this.compute(char);
    }
  }
}

const calculator = new Calculator();

btnsDOM.forEach(btn => {
  btn.addEventListener('click', ({ target }) => {
    calculator.insertChar(target.innerText);
  });
});

btnDeleteDOM.addEventListener('click', () => calculator.deleteChar());

btnClearAllDOM.addEventListener('click', () => calculator.clearAll());

btnEqualDOM.addEventListener('click', ({ target }) => calculator.displayResult(target.innerText));

btnParenthesesDOM.addEventListener('click', () => calculator.insertParentheses());
