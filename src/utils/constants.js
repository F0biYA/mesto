export {
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
};
const btnOpenPopupCard = document.querySelector('.profile__button-add');
const btnOpenPopupProfile = document.querySelector('.profile__button-edit');
const btnOpenPopupAvatar = document.querySelector('.profile__image');
const formProfileElement = document.querySelector('.form_profile');
const nameInput = formProfileElement.querySelector('.form__field_input_name');
const jobInput = formProfileElement.querySelector('.form__field_input_job');
const formCardElement = document.querySelector('.form_card');
const formAvatarElement = document.querySelector('.form_avatar');
const buttonCreate = document.querySelector('.form__submit-card');
const buttonSaveAvatar = document.querySelector('.form__submit-avatar');
const buttonEditProfile = document.querySelector('.form__submit-profile');
const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error'
};
