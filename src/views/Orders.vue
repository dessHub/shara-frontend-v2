<template>
  <div class="container">
    <header class="jumbotron">
      <h3 >All Orders</h3>
      <hr>
      <div class="products-body">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Order No</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Customer Email</th>
                <th scope="col">NO Items</th>
                <th scope="col">Sum Amount</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in orders" :key="index">
                <th scope="row">ORD{{ item.id }}</th>
                <td>{{ item.user.name }}</td>
                <td>{{ item.user.email }}</td>
                <td>{{ item.no_products }}</td>
                <td>ksh.{{ item.amount }}</td>
                <td>
                  <tr v-for="(itemname, i) in item.histories">
                    <td>{{ itemname.product.name }}</td>
                  </tr>
                </td>
                <td>
                  <tr v-for="(itemprice, i) in item.histories">
                    <td>Ksh. {{ itemprice.product.price }}</td>
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
    if (this.$store.state.auth.user.role !== 'admin') {
      this.$router.push('/access/401');
    }
    CartService.getAllOrders().then(
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
