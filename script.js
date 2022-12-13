const input = document.querySelector('.screen__input');
const focusEl = ({ target }) => {
  target.focus();
};

input.addEventListener('blur', focusEl);
