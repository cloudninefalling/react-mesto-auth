class Auth {
  constructor(options) {
    this.BASE_URL = options.BASE_URL;
    this.headers = options.headers;
  }

  register(email, password) {
    return fetch(`${this.BASE_URL}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        try {
          if (res.status === 201) return res.json();
        } catch (e) {
          return e;
        }
      })
      .then((res) => {
        return res;
      })
      .catch(console.log);
  }

  login(email, password) {
    return fetch(`${this.BASE_URL}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        try {
          if (res.status === 200) return res.json();
        } catch (e) {
          return e;
        }
      })
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
    }).then((res) => res.json());
  }
}

export default new Auth({
  BASE_URL: "https://auth.nomoreparties.co",
  headers: { "Content-Type": "application/json" },
});

//6500403c36ce0c001a42441a
