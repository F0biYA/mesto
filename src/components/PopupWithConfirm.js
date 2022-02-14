import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.form');
  }

  /* перезаписыываем родительский openPopup */
  openPopup(card) {
    super.openPopup();
    this._element = card;
  }

  /* добавялем свой обработчик на сабмит формы*/
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._element);
    });

  }
}
