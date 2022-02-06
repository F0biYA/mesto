import "./index.css";
import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  formCardElement,
  jobInput,
  nameInput,
  formProfileElement,
  btnOpenPopupProfile,
  btnOpenPopupCard,
  validationOptions
} from "../utils/constants.js";


/* создаем экземпляр класса PopupWithForm для разных форм*/
const addCardPopup = new PopupWithForm ('.popup_card', submitAddCardForm);
const editProfilePopup = new PopupWithForm ('.popup_profile', submitEditProfileForm);

/* функция добавления новой карточки*/
function submitAddCardForm(inputValues) {
  const card = {
      name: inputValues.place,
      link: inputValues.link,
  };
  console.log(card.name);
  console.log(card.link);
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
