export default class UserInfo {
  constructor({profileNameSelector, profileJobSelector}) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
  }

/* публичный метод возвращающий обьект с данными пользователя*/
  getUserInfo () {
      return {
          name: this._name.textContent,
          job: this._job.textContent,
      };
  }

  /* публичный метод добавляющий новые данные */
  setUserInfo ({ name, job }) {
      this._name.textContent = name;
      this._job.textContent = job;
  }

}
