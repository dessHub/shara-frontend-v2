import axios from 'axios';
import authHeader from './auth-header';
import { baseUrl } from './utils'

const API_URL = baseUrl;

class CartService {

  create(product, stateCart) {
    let newCart = []
    const cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : stateCart; 
    const productIndex = cart.length === 0 ? -1 : cart.map(item => item.id).indexOf(product.id)
    if (productIndex !== -1) {
       newCart = cart.reduce((acc, item) => {
         if(item.id === product.id) {
           item.quantity += 1
           item.price += Number(product.price) 
           acc.push(item);
         } else {
           acc.push(item)
         }
         return acc;
       }, [])
    } else {
      newCart = [...cart]
      let cartItem =  {};
      cartItem.id = product.id
      cartItem.name = product.name
      cartItem.price = Number(product.price)
      cartItem.quantity = 1
      newCart.push(cartItem)
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    return newCart;
  }

  createOrder(body) {
    return axios
      .post(API_URL + 'orders',
       body,
       { headers: authHeader() }
       )
      .then(response => {
        return response.data;
      });
  }

  getMyOrders() {
    return axios
      .get(API_URL + 'orders',
       { headers: authHeader() }
       )
      .then(response => {
        return response.data;
      });

  }

  getAllOrders() {
    return axios
      .get(API_URL + 'admin/orders',
       { headers: authHeader() }
       )
      .then(response => {
        return response.data;
      });

  }
}

export default new CartService();
