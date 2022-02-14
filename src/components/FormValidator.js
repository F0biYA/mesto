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

  /*публичный метод устранения ошибок при открытии форм*/
  deleteErrors() {
    this._inputList.forEach((inputSelector) => {
      this._form.querySelector(`#${inputSelector.id}-error`).textContent = '';
      inputSelector.classList.remove('form__field_type_error');
    });
  }

/*метод добавления ошибки*/
  _showError(input, errorMessageText) {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = errorMessageText;
    errorMessage.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

/*метод снятия ошибки*/
  _hideError(input) {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = '';
    errorMessage.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

/*метод проверки на валидность*/
  _checkInputValid(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

/* метод добавления обработчиков на все поля ввода*/
  _setEventListeners() {
    this._toggleButtonError();
    this._inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._checkInputValid(inputSelector);
        this._toggleButtonError();
      });
    });
  }

 /*метод проверки всех элементов инпут методом Some (возвращение первой ошибки)*/
  _hasInvalidInput() {
    return this._inputList.some((inputSelector) => !inputSelector.validity.valid);
  }

/*метод деактивации кнопки*/
  _toggleButtonError() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  }

/* метод  валидации*/
  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}
/*экспорт класса для использования в модуле Index JS*/
export default FormValidator;
