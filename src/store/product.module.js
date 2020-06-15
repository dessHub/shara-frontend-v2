import ProductService from '../services/product.service';

export const product = {
  namespaced: true,
  state: {
    products: [],
    product: {},
    success: false,
  },
  actions: {
    create({ commit }, product) {
      return ProductService.create(product).then(
        product => {
          commit('createSuccess', product);
          return Promise.resolve(product);
        },
        error => {
          commit('createFailure');
          return Promise.reject(error);
        }
      );
    },
    all({ commit }) {
      ProductService.all();
      commit('fetchAllSuccess');
    },
    remove({ commit }, id) {
      ProductService.remove(id);
    }
  },
  mutations: {
    createSuccess(state, product) {
      state.product = product;
      state.success = true;
    },
    createFailure(state) {
      state.status.success = false;
    },
    fetchAllSuccess(state, products) {
      state.products  = products;
      state.status = true;
    }
  }
};
