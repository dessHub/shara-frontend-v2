<template>
  <div class="container">
    <header class="jumbotron">
      <h3 >Cart</h3>
      <hr>
      <div class="products-body">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in cart" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item.name }}</td>
                <td>ksh.{{ item.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>       
                    <button class="btn btn-danger" @click="remove(item.id)">
                        <span>Remove</span>
                    </button>
                </td>
                </tr>
            </tbody>
            
            <tfoot>
            <tr>
                <td colspan="5" class="footer-td">
                    <div class="footer">
                        <div class="footer-card">
                            <div class="footer-item">Amount: <strong>Ksh. {{ cartItems.sumAmount }}</strong></div>
                            <div class="footer-item">No Of Items: <strong>{{ cartItems.noItems }}</strong></div>
                            <div class="footer-item">        
                                <button class="btn btn-primary" @click="checkout()">
                                    <span>Checkout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="5">
                  <hr>
                  <h4>Add products to cart <router-link to="/" class="nav-l">here</router-link></h4>
                </td>
            </tr>
            </tfoot>
        
        </table>


      </div>
    </header>
  </div>
</template>

<script>
import CartService from '../services/cart.service';

export default {
  name: 'Home',
  data() {
    return {
      products: ''
    };
  },
  mounted() {},
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    cart() {
      const storeCart = this.$store.state.cart.cart;
      const localCart = JSON.parse(localStorage.getItem('cart'))
      return storeCart.length > 0 ? storeCart : (localCart ? localCart : []);
    },
    cartItems() {
        const sumAmount = this.cart.reduce((acc, item) => {
            acc += item.price;
            return acc;
        }, 0)
        const noItems = this.cart.length;
        return {sumAmount, noItems}
    }
  },
  methods: {
    checkout() {
      const body = {
          "amount": this.cartItems.sumAmount,
          "noProducts": this.cartItems.noItems,
          "products": this.cart
      }
      this.$store.dispatch('cart/order', body).then(
        data => {
          localStorage.removeItem('cart');
          this.$router.push('/myorders');
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    remove(id) {
      this.$store.dispatch('cart/remove', id).then(
        () => {
          this.$router.push('/cart');
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    }
  }
};
</script>

<style scoped>
.footer {
  margin: 10px 50px;
}

.footer-td {
    text-align: end;
    padding: 10px;
}

.footer-card {
  margin: 5px;
  padding: 20px 30px;
}

.footer-item {
    margin: 5px 1px;
    padding: 5px 1px;
}

</style>
