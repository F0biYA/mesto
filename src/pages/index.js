import "./index.css";
//import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  formCardElement,
  jobInput,
  nameInput,
  formProfileElement,
  btnOpenPopupProfile,
  btnOpenPopupCard,
  btnOpenPopupAvatar,
  formAvatarElement,
  buttonCreate,
  buttonSaveAvatar,
  buttonEditProfile,
  validationOptions
} from "../utils/constants.js";


/* созадем экземпляр API класса*/
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    authorization: '59fa2368-57bc-421b-8a9b-bec049dce68e',
    'Content-Type': 'application/json'
  }
});


/* создаем экземпляр класса PopupWithForm для разных форм*/
const addCardPopup = new PopupWithForm('.popup_card', submitAddCardForm);
const editProfilePopup = new PopupWithForm('.popup_profile', submitEditProfileForm);
const editAvatarPopup = new PopupWithForm('.popup_avatar', submitEditAvatarForm);

/* экземпляр класса PopupWithConfirm*/
const confirmPopup = new PopupWithConfirm('.popup_confirm', submitDeleteCard);

/* экземпляр класса PopupWithImage */
const scaleImagePopup = new PopupWithImage('.popup_image');

/*экземпляр класса UserInfo*/
const addUserInfo = new UserInfo({ profileNameSelector: '.profile__title', profileJobSelector: '.profile__job', profileAvatarSelector: '.profile__image' });

/*пустой контейнер для карточек*/
const cardSection = new Section({
  items: [],
  renderer: (item) => {
    cardSection.addItem(createCard(item));
  }
}, '.cards');


/* функция открытия попапа confirm при подтверждении удаления карточки*/
function confirmCardDelete(card) {
  confirmPopup.openPopup(card);
}

/* функция лайка карточке */
function likeCard(card) {
  if (!(card.getLike())) {
    api.putLike(card.getCardId())
      .then((result) => {
        card.handleLikeImage(result)
      })
      .catch((err) => {
        console.log(`Невозможно поставить лайк карточке ${err}`);
      });
  } else {
    console.log('else');
    api.deleteLike(card.getCardId())
      .then((result) => {
        card.handleLikeImage(result)
      })
      .catch((err) => {
        console.log(`Невозможно убрать лайк у карточки ${err}`);
      });
  }

}

/* функция удаления карточки*/
function submitDeleteCard(card) {
  api.deleteCard(card.getCardId())
    .then(() => {
      card.deleteCard();
      confirmPopup.closePopup();
    })
    .catch((err) => {
      console.log(`Невозможно удалить карточку ${err}`);
    });
}


/* функция добавления новой карточки*/
function submitAddCardForm(inputValues) {
  const card = {
    name: inputValues.place,
    link: inputValues.link,
  };
  buttonCreate.textContent = 'Создание...';
  api.postCard(card)
    .then((card) => {
      cardSection.addItem(createCard(card));
      addCardPopup.closePopup();
    })
    .catch((err) => {
      console.log(`Невозможно добавить карточку ${err}`);
    })
    .finally(() => {
      buttonCreate.textContent = 'Создать';
    });
}

/* функция подтверждения для изменений информации в профиле */
function submitEditProfileForm(inputValues) {
  buttonEditProfile.textContent = 'Сохранение...'
  //console.log(inputValues);
  api.patchUserInfo(inputValues)
    .then((result) => {
      addUserInfo.setUserInfo({
        name: result.name,
        job: result.about,
        avatar: result.avatar,
      });
      editProfilePopup.closePopup();
    })
    .catch((err) => {
      console.log(`Невозможно изменить информацию о пользователе ${err}`);
    })
    .finally(() => {
      buttonEditProfile.textContent = 'Сохранить';
    });
}
/* функция подтверждения  изменениЯ аватара в профиле */
function submitEditAvatarForm(inputValues) {
  //console.log(inputValues.link);
  buttonSaveAvatar.textContent = 'Сохранение...';
  api.patchAvatar(inputValues.link)
    .then((result) => {
      addUserInfo.setUserInfo({
        name: result.name,
        job: result.about,
        avatar: result.avatar
      });
      editAvatarPopup.closePopup();
    })
    .catch((err) => {
      console.log(`Невозможно загрузить аватар на сервер ${err}`);
    })
    .finally(() => {
      buttonSaveAvatar.textContent = 'Сохранить';
    });
}

/*функция создать новую карточку*/
function createCard(card) {
  const newCard = new Card(
    card, '.template_card',
    scaleImagePopup.openPopup,
    addUserInfo.getId(),
    (card) => { confirmCardDelete(card) },
    (card) => { likeCard(card) }
  );
  return newCard.getCard();
}

/* получение и обработки карточек с сервера*/
api.getServerCards()
  .then((cardsArray) => {
    return cardsArray
  })
  .then((cardsArray) => {
    cardSection.renderItems(cardsArray);
  })
  .catch((err) => {
    console.log(`Невозможно отобразить карточки с сервера ${err}`);
  })

/*получение информации о пользователе с сервера*/
api.getUserInfo()
  .then((userObject) => {
    console.log(userObject)
    return userObject
  })
  .then((result) => {
    console.log(result.avatar)
    addUserInfo.setUserInfo({
      name: result.name,
      job: result.about,
      avatar: result.avatar
    });
    addUserInfo.setId(result._id);
  })
  .catch((err) => {
    console.log(`Невозможно получить информацию о пользователе ${err}`);
  });


/* слушатель кнопки открытия попапа добавления карточек*/
btnOpenPopupCard.addEventListener('click', function () {
  addCardFormValidator.deleteErrors();
  addCardPopup.openPopup();
});

/* слушатель кнопки открытия попапа изменения профиля*/
btnOpenPopupProfile.addEventListener('click', function () {
  editProfileFormValidator.deleteErrors();
  const { name, job } = addUserInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  editProfilePopup.openPopup();
});
/* слушатель кнопки открытия попапа изменения аватара*/
btnOpenPopupAvatar.addEventListener('click', function () {
  addCardFormValidator.deleteErrors();
  editAvatarPopup.openPopup()
});
/*валидатор для формы добавления карточек*/
const addCardFormValidator = new FormValidator(validationOptions, formCardElement);

/*вадиадтор для формы добавления карточек*/
const editProfileFormValidator = new FormValidator(validationOptions, formProfileElement);

/*валидатор для формы изменения аватара*/
const editAvatarFormValidator = new FormValidator(validationOptions, formAvatarElement);

/*запуск проверки валидности форм */
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

/* вызов слушателей для каждого из попапов*/
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
scaleImagePopup.setEventListeners();
editAvatarPopup.setEventListeners();
confirmPopup.setEventListeners();
