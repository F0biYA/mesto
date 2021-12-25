import {initialCards} from "./cards.js";
import Card from "./card.js";
const cardContainer = document.querySelector('.cards');
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

function addInitialCards(card) {            /* Добавляем в верстку*/
  cardContainer.prepend(card);
}
function createCard(card) {
  const newCard = new Card (card);
  return newCard;
}
const renderInitialCards = () => {          // для каждого эл-та заданного массива вызываем ф-цию создания карточки, затем функцию добавления карточки
  initialCards.forEach (function (item) {

      const cardElement = createCard(item).getCard();
      addInitialCards(cardElement);
  });
}
renderInitialCards();

 const openPop = popup => {             /*открытие попапов*/
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByKey);
}
export default openPop;

const closePop = popup => {
  popup.classList.remove('popup_opened');             /*закртыие попапов*/
  document.removeEventListener('keydown', closeByKey);


};

function closeByKey(event) {                  /*функция закрытия эскейпом*/
  if (event.key === "Escape") {
    const openPopup = document.querySelector('.popup_opened');
    closePop(openPopup);
  }
}


function submitFormProfile(evt) {                                  /*Функция Отправка формы профиля*/
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePop(popupProfile);
}

function submitFormCard(evt) {                                /*Функция Отправка формы создания новой карточки*/
  evt.preventDefault();
  const card = {              /*присваиваем вводимые поля*/
    name: placeInput.value,
    link: linkInput.value,
  };
  const cardElement = createCard(card).getCard();
  addInitialCards(cardElement);
  placeInput.value = '';
  linkInput.value = '';
  const btnSubmitCard = document.querySelector('.form__submit-card');
  btnSubmitCard.classList.add('form__submit_disabled');
  btnSubmitCard.setAttribute('disabled', true);
  closePop(popupCard);

}

btnOpenPopupCard.addEventListener('click', () => openPop(popupCard));   /*слушатель кнопки добавления карт*/
btnOpenPopupProfile.addEventListener('click', () => {                   /*слушатель кнопки реадкатирвания профиля*/
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPop(popupProfile)
});
btnClosePopupCrd.addEventListener('click', () => closePop(popupCard));  /*слушатель кнопки закрытия карт*/


popupArray.forEach((popup) => {                           //Функция закрытия по щелчку без дополнительного Оверлея
  popup.addEventListener('click', (evt) => {
    if (!(evt.target.classList.contains('popup__image') || evt.target.classList.contains('form__field') || evt.target.classList.contains('form__title') || evt.target.classList.contains('form'))) { //
      closePop(popup);
    }
  });
});

btnClosePopupPrf.addEventListener('click', () => closePop(popupProfile));/*слушатель кнопки закртия профиля*/
btnClosePopupImg.addEventListener('click', () => closePop(popupImage));
formProfileElement.addEventListener('submit', submitFormProfile);  /*слушатель отправки формы профиля*/
formCardElement.addEventListener('submit', submitFormCard);         /*слушатель отправки формы карт*/
