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

    <form class="form-register" @submit.prevent="save">
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
      <div id="btn-submit">
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          LOGIN
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    save() {
      axios
        .post("http://localhost:3000/users/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.data.data) {
            localStorage.setItem("token", res.data.token);
            window.location = "/#/map";
          } else {
            alert("Login tidak berhasil");
          }
        });
    },
  },
};
</script>
