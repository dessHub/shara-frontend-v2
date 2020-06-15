import axios from 'axios';

const API_URL = 'http://127.0.0.1:3333/api/v1/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password
    });
  }
}

export default new AuthService();
