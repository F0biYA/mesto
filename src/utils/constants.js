export {
  formCardElement,
  jobInput,
  nameInput,
  formProfileElement,
  btnOpenPopupProfile,
  btnOpenPopupCard,
  validationOptions
};
const btnOpenPopupCard = document.querySelector('.profile__button-add');
const btnOpenPopupProfile = document.querySelector('.profile__button-edit');
const formProfileElement = document.querySelector('.form_profile');
const nameInput = formProfileElement.querySelector('.form__field_input_name');
const jobInput = formProfileElement.querySelector('.form__field_input_job');
const formCardElement = document.querySelector('.form_card');
const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error'
};
