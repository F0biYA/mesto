import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._submitForm = submitForm;
        this._inputList = Array.from (this._form.querySelectorAll('.form__field'));
    };

        /* приватный метод собирающий данные полей формы*/
    _getInputValues = () => {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }
/* перезаписывает родительский closePopup для сбрасывания формы */
    closePopup() {
        this._form.reset();
        super.closePopup();
    }

/* перезаписывает родительский setEventListeners для добавления обработчика событий самбит*/
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });

    }
}
