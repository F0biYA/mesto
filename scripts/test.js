import openPopup from "./index.js";
import { cardImage } from "./index.js";
import {popupImage} from "./index.js";
import {cardCaption} from "./index.js";
class Card {
  constructor(card, selector) {
    this._image = card.link;
    this._title = card.name;
    this._selector = selector;
  }

 /*метод получения template элемента и кланирования его в DOM, на выходе  Template элемент*/
  _getTemplate() {
    return document.querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true)
  };

  /*метод  "навешивания" слушателей на кнопки */
  _getListeners() {
    this._tempCard.querySelector('.card__button-delete').addEventListener('click', this._handleDeleteCard);
    this._tempCard.querySelector('.card__button-heart').addEventListener('click', this._handleLikeCard);
    this._tempCard.querySelector('.card__image').addEventListener('click', this._handlePopupOpen);
  }

  /*публичный метод создания карточек*/
  getCard() {
    this._tempCard = this._getTemplate();
    this._tempCard.querySelector('.card__text').textContent = this._title;
    this._tempCard.querySelector('.card__image').src = this._image;
    this._tempCard.querySelector('.card__image').alt = this._title;
    this._getListeners();
    return this._tempCard;
  }

   /* метод окрытия увеличенного изображения*/
  _handlePopupOpen = () => {
    cardImage.src = this._image;
    cardImage.alt = this._title;
    cardCaption.textContent = this._title;
    openPopup(popupImage);
  }

/*метод удаления карточки*/
  _handleDeleteCard = () => {
    this._tempCard.remove();
    this._tempCard = null;
  }

/*метод срабатыаания лайка*/
  _handleLikeCard = () => {
    this._tempCard.querySelector('.card__button-heart').classList.toggle('card__button-heart_active');
  }
}
/*экспорт класса ждя использования в модуле Index JS*/
export default Card;
