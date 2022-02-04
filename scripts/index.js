import { initialCards } from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

/*Параметры для валидации полей */
const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error'
};
//const cardContainer = document.querySelector('.cards');
/*кнопка открытия попапа карт*/
const btnOpenPopupCard = document.querySelector('.profile__button-add');
/*кнопка открытия попапа профиля*/
const btnOpenPopupProfile = document.querySelector('.profile__button-edit');
/*кнопка закрытия попапа профиля*/
//const btnClosePopupPrf = document.querySelector('.popup__button-close_profile');
/*кнопка закрытия попапа карт*/
//const btnClosePopupCrd = document.querySelector('.popup__button-close_card');
/*кнопка закрытия попапа фото*/
//const btnClosePopupImg = document.querySelector('.popup__button-close_image');
//const popupProfile = document.querySelector('.popup_profile');
//const popupCard = document.querySelector('.popup_card');
//const popupImage = document.querySelector('.popup_image');

 /*МАССИВ для закрытия по щелчку*/
//const popupsArray = document.querySelectorAll('.popup');
//const cardImage = document.querySelector('.popup__image');
//const cardCaption = document.querySelector('.popup__image-caption');
//const btnSubmitCard = document.querySelector('.form__submit-card');
const formProfileElement = document.querySelector('.form_profile');
const nameInput = formProfileElement.querySelector('.form__field_input_name');
const jobInput = formProfileElement.querySelector('.form__field_input_job');
//const profileName = document.querySelector('.profile__title');
//const profileJob = document.querySelector('.profile__job');
const formCardElement = document.querySelector('.form_card');
//const linkInput = document.querySelector('.form__field_input_link');
//const placeInput = document.querySelector('.form__field_input_place');

/* создаем экземпляр класса PopupWithForm для разных форм*/
const addCardPopup = new PopupWithForm ('.popup_card', submitAddCardForm);
const editProfilePopup = new PopupWithForm ('.popup_profile', submitEditProfileForm);

/* функция добавления новой карточки*/
function submitAddCardForm(inputValues) {
  const card = {
      name: inputValues.place,
      link: inputValues.url,
  };
  cardSection.addItem(createCard(card));
  addCardPopup.closePopup();
}

/* функция для изменениЯ информации в профиле */
function submitEditProfileForm (inputValues) {
  addUserInfo.setUserInfo (inputValues);
  editProfilePopup.closePopup();
}

/* экземпляр класса PopupWithImage */
const scaleImagePopup = new PopupWithImage ('.popup_image');

/*экземпляр класса UserInfo*/
const addUserInfo = new UserInfo ({profileNameSelector: '.profile__title', profileJobSelector: '.profile__job'});

/*функция создать новую карточку*/
function createCard(card) {

  const newCard = new Card(card, '.template_card', scaleImagePopup.openPopup);
  return newCard.getCard();
}

/* карточки из массива*/
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardSection.addItem(createCard(item));
  }
}, '.cards');

/* вызов функции*/
cardSection.renderItems();


/* слушатель кнопки открытия попапа добавления карточек*/
btnOpenPopupCard.addEventListener ('click', function() {
    addCardFormValidator.deleteErrors();
    addCardPopup.openPopup();
});

/* слушатель кнопки открытия попапа изменения профиля*/
btnOpenPopupProfile.addEventListener ('click', function() {
    editProfileFormValidator.deleteErrors();
    const {name, job} = addUserInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    editProfilePopup.openPopup();
});


/*валидатор для формы добавления карточек*/
const addCardFormValidator = new FormValidator(validationOptions, formCardElement);

/*вадиадтор для формы добавления карточек*/
const editProfileFormValidator = new FormValidator(validationOptions, formProfileElement);

/*запуск проверки валидности форм */
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();


/* вызов слушателей для каждого из попапов*/
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
scaleImagePopup.setEventListeners();
