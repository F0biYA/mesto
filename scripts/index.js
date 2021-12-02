const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardContainer = document.querySelector('.cards');
const templateCard = document.querySelector('.template_card');
const openPopupCard = document.querySelector('.profile__button-add');   /*кнопка открытия попапа карт*/
const openPopupProfile = document.querySelector('.profile__button-edit');  /*кнопка открытия попапа профиля*/
const closeBtnPopupPrf = document.querySelector('.popup__button-close_profile'); /*кнопка закрытия попапа профиля*/
const closeBtnPopupCrd = document.querySelector('.popup__button-close_card'); /*кнопка закрытия попапа карт*/
const closeBtnPopupImg = document.querySelector('.popup__button-close_image'); /*кнопка закрытия попапа фото*/
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupImage = document.querySelector('.popup_image');
const popup = document.querySelector('.popup');
let formProfileElement = document.querySelector('.form_profile');
let nameInput = formProfileElement.querySelector('.form__field_input_name');
let jobInput = formProfileElement.querySelector('.form__field_input_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__job');
let formCardElement = document.querySelector('.form_card');
let linkInput = document.querySelector('.form__field_input_link');
let placeInput = document.querySelector('.form__field_input_place');

function renderCard() {
  const cardHtml = initialCards.map((item, idx, arr) => {
    return getCard(item);
  });
  cardContainer.append(...cardHtml);
}

function getCard(item) {
  const newCard = templateCard.content.cloneNode(true);
  const titleCard = newCard.querySelector('.card__text');
  const imageCard = newCard.querySelector('.card__image');
  imageCard.src = item.link;
  imageCard.alt = item.name;
  titleCard.textContent = item.name;
  newCard.querySelector('.card__button-heart').addEventListener('click', function (evt) {     /*Слушатель события Лайк */
    evt.target.classList.toggle('card__button-heart_active');
  });
  newCard.querySelector('.card__button-delete').addEventListener('click', function (evt) {   /*Слушатель  кнопки delete*/
    evt.target.closest('.card').remove();
  });

  imageCard.addEventListener('click', function (evt) {                      /*слушатель события клика по фотке*/
    document.querySelector('.popup__image').src = item.link;
    document.querySelector('.popup__image').alt = item.name;
    document.querySelector('.popup__image-caption').textContent = item.name;
    openPop(popupImage);
  });
  return newCard;
}
const openPop = popup => popup.classList.add('popup_opened');                 /*открытие попапов*/
const closePop = popup => popup.classList.remove('popup_opened');             /*закртыие попапов*/




function formSubmitProfile(evt) {                                  /*Функция Отправка формы профиля*/
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePop(popupProfile);
}

function formSubmitCard(evt) {                                /*Функция Отправка формы карты*/
  evt.preventDefault();
  const createCard = getCard({ name: placeInput.value, link: linkInput.value });
  cardContainer.prepend(createCard);
  placeInput.value = '';
  linkInput.value = '';
  closePop(popupCard);
}

openPopupCard.addEventListener('click', () => openPop(popupCard));   /*слушатель кнопки добавления карт*/
openPopupProfile.addEventListener('click', () => {                   /*слушатель кнопки реадкатирвания профиля*/
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPop(popupProfile)
});
closeBtnPopupCrd.addEventListener('click', () => closePop(popupCard));  /*слушатель кнопки закрытия карт*/
closeBtnPopupPrf.addEventListener('click', () => closePop(popupProfile));/*слушатель кнопки закртия профиля*/
closeBtnPopupImg.addEventListener('click', () => closePop(popupImage));
formProfileElement.addEventListener('submit', formSubmitProfile);  /*слушатель отправки формы профиля*/
formCardElement.addEventListener('submit', formSubmitCard);         /*слушатель отправки формы карт*/
renderCard();                                                       /*создание карты*/
