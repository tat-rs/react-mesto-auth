const BASE_URL = 'https://auth.nomoreparties.co';

//класс запроса к серверу
class Api {
  constructor({url, headers}) {
    this._url = url; //ссылка сервера
    this._headers = headers; //заголовок
  }

  //метод проверки результата запроса к серверу
  _checkResponse(res) {
    try {
      if (res.status === 200){
        return res.json();
      }
    } catch(error){
      return (error)
    }
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
  };

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
  };

  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {...this.headers, 'Authorization': `Bearer ${token}`}
    })
    .then(this._checkResponse)
  }

}

const auth = new Api({
  url: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

export default auth