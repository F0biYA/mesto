class FormValidator {
  constructor(options, form) {
    this._form = form;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }
  deleteErrors() {           //публичной метод устранения ошибок при открытии форм
    this._inputList.forEach((inputSelector) => {
      this._form.querySelector(`#${inputSelector.id}-error`).textContent = '';
      inputSelector.classList.remove('form__field_type_error');
    });
  }
  _showError(input, errorMessageText) {  //метод добавления ошибки
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = errorMessageText;
    errorMessage.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideError(input) {                            //метод снятия ошибки
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = '';
    errorMessage.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _checkInputValid(input) {  //метод проверки на валидность
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _setEventListeners() {  // метод добавления обработчиков на все поля ввода
    this._toggleButtonError();
    this._inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._checkInputValid(inputSelector);
        this._toggleButtonError();
      });
    });
  }


  _hasInvalidInput() {                                //метод проверки всех элементов инпут методом Some (возвращние первой ошибки)
    return this._inputList.some((inputSelector) => !inputSelector.validity.valid);
  }

  _toggleButtonError() {                    //метод деактивации кнопки
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    } else {
      console.log('call at 61 string')
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  }


  enableValidation() {   // метод  валидации
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}
export default FormValidator;
