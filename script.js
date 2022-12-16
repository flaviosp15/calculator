const disableKeyboard = event => {
  return event.preventDefault();
};

document.addEventListener('keypress', disableKeyboard);
