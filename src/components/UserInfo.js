export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
    this._id = 0;
  }

  /* публичный метод возвращающий обьект с данными пользователя*/
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  /* публичный метод добавляющий новые данные */
  setUserInfo({ name, job, avatar }) {
    this._name.textContent = name;
    this._job.textContent = job;
    this._avatar.src = avatar;
  }

  /* публичный метод получения id*/
  getId() {
    return this._id;
  }

  /* публичный метод установкиid*/
  setId(id) {
    this._id = id;
    console.log(this._id);
  }
}
