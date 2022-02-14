export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector('.popup__button-close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  /*публичный метод откртия попапа */
  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  /*публичный метод закрытия попапа*/
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  /*публичный метод закртия по области и по иконке*/
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.closePopup();
      }
    })
    this._closeButton.addEventListener('click', () => {
      this.closePopup();
    });
  }

  /*приватный метод закрытия по Esc */
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }
}
