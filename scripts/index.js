const openPopup = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__button-close');
const editPopup = document.querySelector('.popup');

function openPop() {
  editPopup.classList.add('popup_opened');
}
openPopup.addEventListener('click', openPop);

function closePop() {
  editPopup.classList.remove('popup_opened');
}
closePopup.addEventListener('click', closePop);

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__name');
let jobInput = formElement.querySelector('.form__job');

function formSubmitHandler(evt) {
  evt.preventDefault();
  let profileName = nameInput.value;
  let profileJob = jobInput.value;
  console.log(profileName);
  console.log(profileJob);
  document.querySelector('.profile__title').textContent = profileName;
  document.querySelector('.profile__job').textContent = profileJob;
  closePop();
}

formElement.addEventListener('submit', formSubmitHandler);
