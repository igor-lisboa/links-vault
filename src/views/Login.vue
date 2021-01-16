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
        <input type="password" class="form-control" v-model="user.password" />
      </div>
      <p class="alert alert-danger" v-if="msg">{{ msg }}</p>
      <button type="submit" class="btn btn-primary brn-block">Logar</button>
      <router-link :to="{ name: 'register' }"
        >Não possui um cadastro, cadastre-se aqui!</router-link
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      msg: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", this.user)
        .then(() => this.$router.push({ name: "home" }))
        .catch((err) => {
          if (err) {
            this.msg = "Credenciais inválidas!";
          }
        });
    },
  },
};
</script>
