<template>
  <div class="container container-form">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <router-link id="btn-login" class="nav-link" to="/"
            >Login</router-link
          >
        </div>
        <div class="col-4">
          <router-link id="btn-login" class="nav-link" to="/register"
            >Register</router-link
          >
        </div>
      </div>
    </div>

    <form @submit.prevent="register" class="form-register">
      <div class="form-email">
        <input
          required
          type="email"
          v-model="email"
          class="form-control"
          id="floatingInput"
          placeholder="Email"
        />
      </div>
      <div class="form-password">
        <input
          required
          type="password"
          v-model="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
      </div>
      <div class="confirm-password">
        <input
          required
          type="password"
          v-model="confirm"
          class="form-control"
          id="confirm-password"
          placeholder="Confirm Password"
        />
      </div>
      <div id="btn-submit">
        <button class="w-100 btn btn-lg btn-success" type="submit">
          REGISTER NOW
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {

  name: "Register",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      confirm: ""
    };
  },
  methods: {
    async register() {
      const response = await axios.post(`http://localhost:3000/users/register`, {
          email: this.email,
          password: this.password,
          retypepassword: this.confirm
      });
      localStorage.setItem('token', response.data.token )
      window.location = "/map";
    }
  },
};



</script>
