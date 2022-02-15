
export default class Card {
  constructor(card, selector, handleCardClick, userId, handleCardDelete, handleLikeCard) {
    this._image = card.link;
    this._name = card.name;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._cardOwnerId = card.owner._id;
    this._userId = userId;
    this._cardId = card._id
    this._handleCardDelete = handleCardDelete;
    this._handleLikeCard = handleLikeCard;
    this._likeAmount = card.likes.length;
    this._isLike = card.likes.some(item => item._id == this._userId);

  }

  /*метод возвращающий состояние лайка карточки*/
  getLike() {
    return this._isLike
  }

  /*метод возвращаюший id карточки */
  getCardId() {
    return this._cardId;
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
    const data = { name: this._name, link: this._image };
    this._tempCard.querySelector('.card__button-delete').addEventListener('click', () => { this._handleCardDelete(this) });
    this._tempCard.querySelector('.card__button-heart').addEventListener('click', () => { this._handleLikeCard(this) });
    this._tempCard.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(data);
    });
  }

  /*публичный метод создания карточек*/
  getCard() {
    this._tempCard = this._getTemplate();
    this._tempCard.querySelector('.card__text').textContent = this._name;
    this._tempCard.querySelector('.card__image').src = this._image;
    this._tempCard.querySelector('.card__image').alt = this._name;
    this._tempCard.querySelector('.card__like-amount').textContent = this._likeAmount;
    if (this._isLike) {
      this._tempCard.querySelector('.card__button-heart').classList.add('card__button-heart_active');
    }
    this._getListeners();
    if (!(this._cardOwnerId == this._userId)) {
      this._tempCard.querySelector('.card__button-delete').classList.add('card__button-delete_hide')
    }
    return this._tempCard;
  }


  /*метод удаления карточки (переделан из приватного в публичный)*/
  deleteCard = () => {
    this._tempCard.remove();
    this._tempCard = null;
  }

  /*метод срабатыаания лайка (переделан из приватного в публичный)*/
  handleLikeImage = (card) => {
    this._isLike = !this._isLike;
    this._tempCard.querySelector('.card__like-amount').textContent = card.likes.length;
    this._tempCard.querySelector('.card__button-heart').classList.toggle('card__button-heart_active');
    this._tempCard.querySelector('.card__like-amount').textContent = card.likes.length;
  }




}
