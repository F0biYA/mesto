// import initialCards from "./cards";   //импортировали массив карточек

class Card {                            // создали класс , должны передать ему селектор  и свойста карточек, IMAGE(card__image), TITLE(card__text)
  constructor(card) {
    console.log(card);          // так же по идее доджны добавить кнопки: Удалить и Сердечко
    //this._selector = selector;
    this._image = card.link;
    this._title = card.name;
                                  //присваиваем внутренним преемееным входные данные
  }
_getTemplate() {        //добавляем метод получния template элемента и кланирования его в DOM, на выходу return Template элемент
  return document.querySelector('.template_card')
                 .content
                 .querySelector('.card')
                .cloneNode(true)
}
;
getCard() {
  this._element = this._getTemplate();
  console.log(this._element);
  this._element.querySelector('.card__text').textContent = this._title;
  this._element.querySelector('.card__image').src = this._image;
  this._element.querySelector('.card__image').alt = this._title;
  // this._element.querySelector('.todo-item__del').addEventListener('click', this._handleDeleteTodo);

  return this._element;
}
// getView() {} добавилои метод полчения элемента путем присвавания свойст новому template элементу, на выходу return элемент со свойствами   34.01 webinarб
                  //перебираем массив входных данных и вешаем на каждую новую карточку слушатеь на кнопку удалить
// добавляем внутреннюю функцию удаления карточки
}
export default Card;
