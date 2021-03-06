import axios from 'axios';
import authHeader from './auth-header';
import { baseUrl } from './utils'

const API_URL = baseUrl;

class ProductService {
  all() {
    return axios
      .get(API_URL + 'products',
       { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

  getProduct(id) {
    return axios
      .get(API_URL + 'products/' + id,
       { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

  remove(id) {
    return axios
      .delete(API_URL + 'products/' + id,
       { headers: authHeader() })
      .then(response => {
        console.log('delete', response)
        return response.data;
      });
  }

  create(product) {
    return axios
      .post(API_URL + 'products',
       { name: product.name, price: product.price },
       { headers: authHeader() }
       )
      .then(response => {
        return response.data;
      });
  }
}

export default new ProductService();
