//класс запроса к серверу
class Api {
  constructor({url, headers}) {
    this._url = url; //ссылка сервера
    this._headers = headers; //заголовок
  }

  //метод проверки результата запроса к серверу
  _checkResponse(res) {
    if (res.ok) {
      return res.json(); //возвращаем резульат, если нет ошибок
    }
    return Promise.reject(`Ошибка: ${res.status}`); //возвращаем статус ошибки
  };

   //метод, получающий список всех карточек с сервера
  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  //получаем данные пользователя
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  //метод редактирования данных пользователя
  setUserInfo(info) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      })
    })
    .then(this._checkResponse)
  }

  //метод редактирования фото профиля
  setUserAvatar(user) {
    return fetch(`${this._url}users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: user.avatar,
      })
    })
    .then(this._checkResponse)
  }

  //метод добавления новой карточки на страницу
  addNewCard(newCard) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.subtitle, //новое описание
        link: newCard.link, //новая ссыока
      })
    })
    .then(this._checkResponse)
  }

  //метод постановки лайка и дизлайка
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  //метод удаления карточки со страницы
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

}
 
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    authorization: '3ace1836-34ae-4def-81c7-968efe5e4e17',
    "content-type": "application/json",
  }
})

export default api