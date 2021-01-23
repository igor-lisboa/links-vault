<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-6">
        <h1>{{ pageName }}</h1>
        <small class="text-muted">Atualize seu e-mail ou senha</small>
        <form @submit.prevent="update" class="mt-4">
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
            <label for="senha">Nova Senha</label>
            <input
              id="senha"
              type="password"
              class="form-control"
              autocomplete
              v-model="user.password"
            />
            <small class="text-muted"
              >Caso não queira atualizar sua senha, deixe em branco.</small
            >
          </div>
          <div class="form-group">
            <label for="confirm-senha">Confirmação de Senha</label>
            <input
              id="confirm-senha"
              type="password"
              class="form-control"
              autocomplete
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
import mixinForceLogout from "@/mixins/forceLogout.js";
export default {
  mixins: [mixinForceLogout],
  data() {
    return {
      user: {},
      pageName: "Seus Dados",
      loading: false,
    };
  },
  created() {
    this.getStoredUser();
  },
  methods: {
    getStoredUser() {
      this.user = this.$store.state.user;
    },
    async update() {
      try {
        if (
          this.user.password !== this.user.passwordConfirm &&
          this.user.passwordConfirm !== undefined &&
          this.user.password !== undefined
        ) {
          this.$swal.fire(
            this.pageName,
            "A senha e a confirmação da senha não coincidem.",
            "error"
          );
        } else {
          this.loading = true;
          const response = await apiUser
            .update(this.user.email, this.user.password)
            .catch(function (error) {
              if (error.response) {
                return error.response;
              }
            });

          if (response.status === 401) {
            this.forceLogout(this.pageName);
          }

          this.$swal.fire(
            this.pageName,
            response.data.message,
            response.data.success ? "success" : "error"
          );
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
