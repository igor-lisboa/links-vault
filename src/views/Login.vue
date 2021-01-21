<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" class="form-control" v-model="user.email" />
      </div>
      <div class="form-group">
        <label for="senha">Senha</label>
        <input
          type="password"
          class="form-control"
          autocomplete
          v-model="user.password"
        />
      </div>
      <button type="submit" class="btn btn-primary brn-block">Logar</button>
      <router-link :to="{ name: 'register' }"
        >Não possui um cadastro, cadastre-se aqui!</router-link
      >
    </form>
  </div>
</template>

<script>
import apiUser from "./../services/apiLinks/users.js";
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiUser.login(
          this.user.email,
          this.user.password
        );
        this.$store
          .dispatch("login", response.data.data.user)
          .then(() => {
            this.$router.push({ name: "home" });
          })
          .catch((err) => {
            if (err) {
              throw err;
            }
          });
      } catch (e) {
        if (e) {
          this.$swal.fire("Login", "Credenciais inválidas", "error");
        }
      }
    },
  },
};
</script>
