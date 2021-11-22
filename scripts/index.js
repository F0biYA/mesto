const openPopup = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__button-close');
const editPopup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__field_name');
let jobInput = formElement.querySelector('.form__field_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__job');
function openPop() {
  editPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}


function closePop() {
  editPopup.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePop();
}
openPopup.addEventListener('click', openPop);
closePopup.addEventListener('click', closePop);
formElement.addEventListener('submit', formSubmitHandler);
