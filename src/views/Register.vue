<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-6">
        <h1>{{ pageName }}</h1>
        <small class="text-muted">Informe seu e-mail e uma senha</small>
        <form @submit.prevent="register" class="mt-4">
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
          <div class="form-group">
            <label for="confirm-senha">Confirmação de Senha</label>
            <input
              id="confirm-senha"
              type="password"
              class="form-control"
              autocomplete
              required
              v-model="user.passwordConfirm"
            />
          </div>
          <button
            v-if="!loading"
            type="submit"
            class="btn btn-primary btn-block"
          >
            <i class="fa fa-check"></i>
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
      pageName: "Registre-se",
      loading: false,
    };
  },
  methods: {
    async register() {
      try {
        if (this.user.password !== this.user.passwordConfirm) {
          this.$swal.fire(
            this.pageName,
            "A senha e a confirmação da senha não coincidem.",
            "error"
          );
        } else {
          this.loading = true;
          const response = await apiUser.register(
            this.user.email,
            this.user.password
          );
          if (response.data.success) {
            this.$store
              .dispatch("login", response.data.data.user)
              .then(() => {
                this.$swal.fire(this.pageName, "Seja bem vindo!", "success");
                this.$router.push({ name: "home" });
              })
              .catch((err) => {
                if (err) {
                  throw err;
                }
              });
          } else {
            this.$swal.fire(this.pageName, response.data.message, "error");
          }
        }
      } catch (e) {
        if (e) {
          this.$swal.fire(this.pageName, "Credenciais inválidas", "error");
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
