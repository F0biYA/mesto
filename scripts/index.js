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
const openPopup = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__button-close');
const editPopup = document.querySelector('.popup');
let formProfileElement = document.querySelector('.form');
/*Перемнные Profile*/
let nameInput = formProfileElement.querySelector('.form__field_input_name');
let jobInput = formProfileElement.querySelector('.form__field_input_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__job');
/*Переменые Card*/
/* let placeInput = formElement.querySelector('.form__field_input_place');
let linkInput = formElement.querySelector('.form__field_input_link');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__job'); */

function createCard() {
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

  newCard.querySelector('.card__button-heart').addEventListener('click', function (evt) {     /*Обработка события Лайк */
    evt.target.classList.toggle('card__button-heart_active');});
  newCard.querySelector('.card__button-delete').addEventListener('click', function (evt) {   /*Обработка кнопки delete*/
    evt.target.closest('.card').remove();
  });

  return newCard;
}


/*ОТкрыть попап окно*/
function openPop() {
  editPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

/* Закрыть окно попап*/
function closePop() {
  editPopup.classList.remove('popup_opened');
}

/*Отправка формы профиля*/
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePop();
}
/* function formSubmitCard(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePop();
} */
openPopup.addEventListener('click', openPop);
closePopup.addEventListener('click', closePop);
formProfileElement.addEventListener('submit', formSubmitHandler);
createCard();
