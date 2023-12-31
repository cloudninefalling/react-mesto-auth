class Auth {
  constructor(options) {
    this.BASE_URL = options.BASE_URL;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(email, password) {
    return fetch(`${this.BASE_URL}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  }

  login(email, password) {
    return fetch(`${this.BASE_URL}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    })
      .then(this._getResponseData)
      .then((json) => {
        if (json) {
          if (json.token) {
            localStorage.setItem("jwt", json.token);
            return json;
          }
        } else return "Error: no json";
      });
  }

  validateToken(token) {
    return fetch(`${this.BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }
}

export default new Auth({
  BASE_URL: "https://auth.nomoreparties.co",
  headers: { "Content-Type": "application/json" },
});
