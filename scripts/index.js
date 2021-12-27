import { initialCards } from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

/*Параметры для валидации полей */
const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error'
};
const cardContainer = document.querySelector('.cards');
/*кнопка открытия попапа карт*/
const btnOpenPopupCard = document.querySelector('.profile__button-add');
/*кнопка открытия попапа профиля*/
const btnOpenPopupProfile = document.querySelector('.profile__button-edit');
/*кнопка закрытия попапа профиля*/
const btnClosePopupPrf = document.querySelector('.popup__button-close_profile');
/*кнопка закрытия попапа карт*/
const btnClosePopupCrd = document.querySelector('.popup__button-close_card');
/*кнопка закрытия попапа фото*/
const btnClosePopupImg = document.querySelector('.popup__button-close_image');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupImage = document.querySelector('.popup_image');

 /*МАССИВ для закрытия по щелчку*/
const popupsArray = document.querySelectorAll('.popup');
const cardImage = document.querySelector('.popup__image');
const cardCaption = document.querySelector('.popup__image-caption');
const btnSubmitCard = document.querySelector('.form__submit-card');
const formProfileElement = document.querySelector('.form_profile');
const nameInput = formProfileElement.querySelector('.form__field_input_name');
const jobInput = formProfileElement.querySelector('.form__field_input_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const formCardElement = document.querySelector('.form_card');
const linkInput = document.querySelector('.form__field_input_link');
const placeInput = document.querySelector('.form__field_input_place');

/* функция добавить в верстку*/
function addInitialCards(card) {
  cardContainer.prepend(card);
}
/*функция создать новую карточку*/
function createCard(card) {
  const newCard = new Card(card, '.template_card');
  return newCard;
}

/* для каждого эл-та заданного массива вызываем ф-цию создать карточку, затем функцию добавить карточку*/
const renderInitialCards = () => {
  initialCards.forEach((item) => {
    const cardElement = createCard(item).getCard();
    addInitialCards(cardElement);
  });
}

/*функция открыть попап ( универсальная для всех трех)*/
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByKey);
}

/*функция закрыть попап (универсальная для всех)*/
const closePop = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByKey);
};

/*функция закрыть эскейпом*/
function closeByKey(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector('.popup_opened');
    closePop(openPopup);
  }
}

/*Функция Отправить форму профиля*/
function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePop(popupProfile);
}

/*Функция Отправить форму создания новой карточки*/
function submitFormCard(evt) {
  evt.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };
  const cardElement = createCard(card).getCard();
  addInitialCards(cardElement);
  placeInput.value = '';
  linkInput.value = '';
  btnSubmitCard.classList.add('form__submit_disabled');
  btnSubmitCard.setAttribute('disabled', true);
  closePop(popupCard);
}

/*слушатель кнопки добавления карточек*/
btnOpenPopupCard.addEventListener('click', () => {
  addCardFormValidator.deleteErrors()
  openPopup(popupCard)
});

/*слушатель кнопки реадкатирования профиля*/
btnOpenPopupProfile.addEventListener('click', () => {
  editProfileFormValidator.deleteErrors();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile)
});

/*слушатель кнопки закрытия формы для создания карточек*/
btnClosePopupCrd.addEventListener('click', () => closePop(popupCard));

/*Функция закрытия по щелчку без дополнительного Оверлея*/
popupsArray.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (!(evt.target.classList.contains('popup__image') || evt.target.classList.contains('form__field') || evt.target.classList.contains('form__title') || evt.target.classList.contains('form'))) { //
      closePop(popup);
    }
  });
});

/*вызов функции создать карточки*/
renderInitialCards();

/*слушатель кнопки закртия формы профиля*/
btnClosePopupPrf.addEventListener('click', () => closePop(popupProfile));

 /*слушатель кнопки закрытия увеличенного изображения*/
btnClosePopupImg.addEventListener('click', () => closePop(popupImage));

/*слушатель отправки формы профиля*/
formProfileElement.addEventListener('submit', submitFormProfile);

/*слушатель отправки формы карт*/
formCardElement.addEventListener('submit', submitFormCard);

/*валидатор для формы добавления карточек*/
const addCardFormValidator = new FormValidator(validationOptions, formCardElement);

/*вадиадтор для формы добавления карточек*/
const editProfileFormValidator = new FormValidator(validationOptions, formProfileElement);

/*запуск проверки валидности форм */
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

/*экспорт функции открытия для ипользования в модуле JS Card*/
export default openPopup;
export  {cardImage} ;
export {popupImage} ;
export {cardCaption};
