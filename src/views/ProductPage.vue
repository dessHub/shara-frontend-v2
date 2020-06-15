<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Product Page</h3>
      <hr>
      <p>Name: {{ product.name }}</p>
      <p>Price: ksh.{{product.price}}</p>

      <div>
        <span>          
          <button class="btn btn-danger" @click="remove()">
            <span>Delete</span>
          </button></span>
      </div>
    </header>
  </div>
</template>

<script>
import ProductService from '../services/product.service';

export default {
  name: 'ProductPage',
  data() {
    return {
      product: {}
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isAdmin() {
      return this.$store.state.auth.user.role === 'admin';
    }
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push('/');
    }
    if (!this.isAdmin) {
      this.$router.push('/access/401');
    }
    ProductService.getProduct(this.$route.params.id).then(
      response => {
        console.log
        this.product = response;
      },
      error => {
        this.product =
          (error.response && error.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    remove() {
      this.$store.dispatch('product/remove', this.$route.params.id).then(
        data => {
          this.$router.push('/');
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