
const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) => {                  //функция добавления ошибки
  const errorMessage = form.querySelector(`#${input.id}-error`);
  errorMessage.textContent = errorMessageText;
  errorMessage.classList.add(errorMessageClass);
  input.classList.add(inputErrorClass);
}

const hideError = (form, input, errorMessageClass, inputErrorClass) => {                            //функция снятия ошибки
  const errorMessage = form.querySelector(`#${input.id}-error`);
  errorMessage.textContent = '';
  errorMessage.classList.remove(errorMessageClass);
  input.classList.remove(inputErrorClass);
}
const hasInvalidInput = (inputs) => {                                           //функция проверки всех элементов инпут методом Some (возвращние первой ошибки)
  return Array.from(inputs).some((el) => !el.validity.valid);
}

const toggleButtonError = (inputs, button, inactiveButtonClass) => {                    //функция деактивации кнопки
  if (hasInvalidInput(inputs)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
}

const enableValidation = ({ formSelector, ...rest }) => {      // ЗАпуск функции валидации
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setInputListeners(form, rest);
  });
}

const setInputListeners = (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
  const inputs = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);
  toggleButtonError(inputs, submitButton, inactiveButtonClass);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValid(form, input, rest);
      toggleButtonError(inputs, submitButton, inactiveButtonClass);
    })
  });
}

const checkInputValid = (form, input, { inputErrorClass, errorClass }) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, errorClass, inputErrorClass);
  } else {
    hideError(form, input, errorClass, inputErrorClass);
  }
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error'
});

