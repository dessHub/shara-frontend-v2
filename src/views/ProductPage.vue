<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{product.name}} - ksh.{{product.price}}</h3>
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
  mounted() {
    ProductService.getProduct(this.$route.params.id).then(
      response => {
        console.log("product respo", response)
        this.product = response;
      },
      error => {
        this.product =
          (error.response && error.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>