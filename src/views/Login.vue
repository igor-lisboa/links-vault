<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-6">
        <h1>Login</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="user.email"
              autofocus
              autocomplete
              required
            />
          </div>
          <div class="form-group">
            <label for="senha">Senha</label>
            <input
              id="senha"
              type="password"
              class="form-control"
              autocomplete
              required
              v-model="user.password"
            />
          </div>
          <button
            v-if="!loading"
            type="submit"
            class="btn btn-primary btn-block"
          >
            Entrar
          </button>
          <button
            v-else
            type="submit"
            disabled
            class="btn btn-primary btn-block"
          >
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </button>
          <router-link :to="{ name: 'register' }">
            Não possui um cadastro, cadastre-se aqui!
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiUser from "@/services/apiLinks/users.js";
export default {
  data() {
    return {
      user: {},
      loading: false,
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
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
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
