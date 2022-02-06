import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector('.popup__image');
      this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  openPopup = ({name, link}) => {
    console.log(name);
      this._popupImage.src = link;
      this._popupImage.alt = name;
      this._popupImageCaption.textContent = name;
      super.openPopup();
  }
}

