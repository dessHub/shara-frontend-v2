<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div>Product Form</div>
      <form name="form" @submit.prevent="handleCreate">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="product.name"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="name"
            />
            <div
              v-if="submitted && errors.has('name')"
              class="alert-danger"
            >{{errors.first('name')}}</div>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input
              v-model="product.price"
              v-validate="'required|min:1|max:12'"
              type="text"
              class="form-control"
              name="price"
            />
            <div
              v-if="submitted && errors.has('price')"
              class="alert-danger"
            >{{errors.first('price')}}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Create</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import Product from '../models/product';

export default {
  name: 'Createproduct',
  data() {
    return {
      product: new Product('', ''),
      submitted: false,
      successful: false,
      message: ''
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
  },
  methods: {
    handleCreate() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('product/create', this.product).then(
            data => {
              console.log("produc post", data)
              const productId = data.id;
              this.successful = true;
              this.$router.push(`/product/${productId}`);
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
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>