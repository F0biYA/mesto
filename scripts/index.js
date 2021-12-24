import {initialCards} from "./cards.js";
import Card from "./card.js";
console.log(initialCards);
const cardContainer = document.querySelector('.cards');
const templateCard = document.querySelector('.template_card');
const btnOpenPopupCard = document.querySelector('.profile__button-add');   /*кнопка открытия попапа карт*/
const btnOpenPopupProfile = document.querySelector('.profile__button-edit');  /*кнопка открытия попапа профиля*/
const btnClosePopupPrf = document.querySelector('.popup__button-close_profile'); /*кнопка закрытия попапа профиля*/
const btnClosePopupCrd = document.querySelector('.popup__button-close_card'); /*кнопка закрытия попапа карт*/
const btnClosePopupImg = document.querySelector('.popup__button-close_image'); /*кнопка закрытия попапа фото*/
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupImage = document.querySelector('.popup_image');
const popupArray = document.querySelectorAll('.popup');                    /*МАССИВ для закртия по щелчку*/
const formProfileElement = document.querySelector('.form_profile');
const nameInput = formProfileElement.querySelector('.form__field_input_name');
const jobInput = formProfileElement.querySelector('.form__field_input_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const formCardElement = document.querySelector('.form_card');
const linkInput = document.querySelector('.form__field_input_link');
const placeInput = document.querySelector('.form__field_input_place');

// function addInitialCards(arr) {
//   const cardHtml = initialCards.map((item, idx, arr) => {
//     return getCard(item);
//   });
//   cardContainer.append(...cardHtml);
// }
function addCardToDOM(card) {
  cardContainer.prepend(card);
}
const renderElements = () => {
  initialCards.forEach (function (item) {

      const cardElement = createCard(item).getCard();
      addCardToDOM(cardElement); // для каждого эл-та массива вызываем ф-цию создания карточки, затем функцию добавления карточки
  });
}
renderElements();
function createCard(card) {
  console.log(card);
  const newCard = new Card (card);
  return newCard;
}
// /* function getCard(item) {
//   const newCard = templateCard.content.cloneNode(true);
//   const titleCard = newCard.querySelector('.card__text');
//   const imageCard = newCard.querySelector('.card__image');
//   imageCard.src = item.link;
//   imageCard.alt = item.name;
//   titleCard.textContent = item.name;
//   newCard.querySelector('.card__button-heart').addEventListener('click', function (evt) {     /*Слушатель события Лайк */
//     evt.target.classList.toggle('card__button-heart_active');
//   });
//   newCard.querySelector('.card__button-delete').addEventListener('click', function (evt) {   /*Слушатель  кнопки delete*/
//     evt.target.closest('.card').remove();
//   });

//   imageCard.addEventListener('click', function (evt) {                      /*слушатель события клика по фотке*/
//     document.querySelector('.popup__image').src = item.link;
//     document.querySelector('.popup__image').alt = item.name;
//     document.querySelector('.popup__image-caption').textContent = item.name;
//     openPop(popupImage);
//   });
//   return newCard;
// }

// const openPop = popup => {             /*открытие попапов*/
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByKey);
// }
// const closePop = popup => {
//   popup.classList.remove('popup_opened');             /*закртыие попапов*/
//   document.removeEventListener('keydown', closeByKey);


// };

// function closeByKey(event) {                  /*функция закрытия эскейпом*/
//   if (event.key === "Escape") {
//     const openPopup = document.querySelector('.popup_opened');
//     closePop(openPopup);
//   }
// }


// function submitFormProfile(evt) {                                  /*Функция Отправка формы профиля*/
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePop(popupProfile);
// }

// function submitFormCard(evt) {                                /*Функция Отправка формы карты*/
//   evt.preventDefault();
//   const createCard = getCard({ name: placeInput.value, link: linkInput.value });
//   cardContainer.prepend(createCard);
//   placeInput.value = '';
//   linkInput.value = '';
//   const btnSubmitCard = document.querySelector('.form__submit-card');
//   btnSubmitCard.classList.add('form__submit_disabled');
//   btnSubmitCard.setAttribute('disabled', true);
//   closePop(popupCard);

// }

// btnOpenPopupCard.addEventListener('click', () => openPop(popupCard));   /*слушатель кнопки добавления карт*/
// btnOpenPopupProfile.addEventListener('click', () => {                   /*слушатель кнопки реадкатирвания профиля*/
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   openPop(popupProfile)
// });
// btnClosePopupCrd.addEventListener('click', () => closePop(popupCard));  /*слушатель кнопки закрытия карт*/


// popupArray.forEach((popup) => {                           //Функция закрытия по щелчку без дополнительного Оверлея
//   popup.addEventListener('click', (evt) => {
//     if (!(evt.target.classList.contains('popup__image') || evt.target.classList.contains('form__field') || evt.target.classList.contains('form__title') || evt.target.classList.contains('form'))) { //
//       closePop(popup);
//     }
//   });
// });

// btnClosePopupPrf.addEventListener('click', () => closePop(popupProfile));/*слушатель кнопки закртия профиля*/
// btnClosePopupImg.addEventListener('click', () => closePop(popupImage));
// formProfileElement.addEventListener('submit', submitFormProfile);  /*слушатель отправки формы профиля*/
// formCardElement.addEventListener('submit', submitFormCard);         /*слушатель отправки формы карт*/
//addInitialCards(initialCards);                                                       /*создание карты*/
