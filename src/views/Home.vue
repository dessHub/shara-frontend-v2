<template>
  <div class="container">
    <header class="jumbotron">
      <h3 >Pick From Our Best Products!</h3>
      <hr>
      <div class="products-body">
        <div class="product-card" v-for="(item, index) in products" :key="index">
          <p>Name: {{item.name}}</p>
          <p>Price: ksh.{{item.price}}</p>         
          <button class="btn btn-primary" @click="addToCart(item)">
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import ProductService from '../services/product.service';

export default {
  name: 'Home',
  data() {
    return {
      products: ''
    };
  },
  mounted() {
    ProductService.all().then(
      response => {
        this.products = response;
      },
      error => {
        this.products =
          (error.response && error.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('cart/addcart', product).then(
        data => {
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
.products-body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.product-card {
  margin: 5px;
  border-style: groove;
  border-width: 2px;
  padding: 20px 30px;
  border-color: aliceblue;
}

</style>
