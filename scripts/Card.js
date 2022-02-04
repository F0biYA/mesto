
export default class Card {
  constructor(card, selector, handleCardClick) {
    this._image = card.link;
    this._title = card.name;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
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
   this._tempCard.querySelector('.card__image').addEventListener('click', this._handleCardClick);
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
