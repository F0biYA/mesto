import openPop from "./index.js";
class Card {
  constructor(card, selector) {

    this._image = card.link;
    this._title = card.name;
    this._selector = selector;

  }
  _getTemplate() {        //метод получения template элемента и кланирования его в DOM, на выходе  Template элемент
    return document.querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true)
  };
  getCard() {               //публичный метод присваивания вновь созданному элементу свойств и добавления слушателей на кнопки
    this._tempCard = this._getTemplate();
    this._tempCard.querySelector('.card__text').textContent = this._title;
    this._tempCard.querySelector('.card__image').src = this._image;
    this._tempCard.querySelector('.card__image').alt = this._title;
    this._tempCard.querySelector('.card__button-delete').addEventListener('click', this._handleDeleteCard);
    this._tempCard.querySelector('.card__button-heart').addEventListener('click', this._handleLikeCard);
    this._tempCard.querySelector('.card__image').addEventListener('click', this._handlePopupOpen);
    return this._tempCard;
  }
  _handlePopupOpen = () => {
    document.querySelector('.popup__image').src = this._image;
    document.querySelector('.popup__image').alt = this._title;
    document.querySelector('.popup__image-caption').textContent = this._title;
    openPop(document.querySelector('.popup_image'));
  }
  _handleDeleteCard = () => {   //метод удаления карточки
    this._tempCard.remove();
  }
  _handleLikeCard = () => {     //метод срабатыаания лайка
    this._tempCard.querySelector('.card__button-heart').classList.toggle('card__button-heart_active');
  }
}
export default Card;
