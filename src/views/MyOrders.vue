<template>
  <div class="container">
    <header class="jumbotron">
      <h3 >My Orders</h3>
      <hr>
      <div class="products-body">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Order No</th>
                <th scope="col">NO Items</th>
                <th scope="col">Sum Amount</th>
                <th scope="col">Product Id</th>
                <th scope="col">Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in orders" :key="index">
                <th scope="row">ORD{{ item.id }}</th>
                <td>{{ item.no_products }}</td>
                <td>ksh.{{ item.amount }}</td>
                <td>
                  <tr v-for="(itemname, i) in item.histories">
                    <td>{{ itemname.product_id }}</td>
                  </tr>
                </td>
                <td>
                  <tr v-for="(itemquantity, i) in item.histories">
                    <td>{{ itemquantity.quantity }}</td>
                  </tr>
                </td>
                </tr>
            </tbody>
        
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
      orders: []
    };
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push('/login');
    }
    CartService.getMyOrders().then(
      response => {
        this.orders = response;
      },
      error => {
        this.orders =
          (error.response && error.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {}
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
