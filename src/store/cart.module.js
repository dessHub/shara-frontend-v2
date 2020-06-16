import CartService from '../services/cart.service';

export const cart = {
  namespaced: true,
  state: {
    cart: [],
    success: false,
  },
  actions: {
    async addcart({ commit, state }, product) {
      const currentCart = state.cart
      const cartObj = await CartService.create(product, currentCart)
          commit('createSuccess', cartObj);
      return {message: "Added successfuly"}
    },
    order({ commit }, body) {
      return CartService.createOrder(body).then(
        data => {
          commit('orderSuccess');
          return Promise.resolve(data);
        },
        error => {
          commit('orderFailure');
          return Promise.reject(error);
        }
      );
    },
    remove({ commit }, id) {
      commit('removeItem', id);
    }
  },
  mutations: {
    createSuccess(state, cart) {
      state.cart = cart;
      state.success = true;
    },
    createFailure(state) {
      state.status.success = false;
    },
    orderSuccess(state) {
      state.success = true;
    },
    orderFailure(state) {
      state.status.success = false;
    },
    removeItem(state, id) {
      const newCart = state.cart.filter(item => item.id != id)
      state.cart = newCart;
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }
};
