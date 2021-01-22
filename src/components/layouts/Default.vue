<template>
  <div>
    <header>
      <b-navbar toggleable="md" type="dark" variant="info" class="fixed-top">
        <b-navbar-brand :to="{ name: 'home' }">
          <i class="fa fa-link mr-2"></i>
          LINKS <strong>Vault</strong>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse">
          <template #default="{ expanded }">
            <i class="fa fa-times" v-if="expanded"></i>
            <i class="fa fa-bars" v-else></i>
          </template>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :active="$route.name === 'home'" :to="{ name: 'home' }">
              Home
            </b-nav-item>
            <b-nav-item
              :active="$route.name === 'categories'"
              :to="{ name: 'categories' }"
            >
              Categorias
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right v-if="$store.getters.loggedUser">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ $store.state.user.email }}</em>
              </template>
              <b-dropdown-item href="#">Seus Dados</b-dropdown-item>
              <div class="dropdown-divider"></div>
              <b-dropdown-item href="#" @click.prevent="logout">
                Sair
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item
              :active="$route.name === 'login'"
              :to="{ name: 'login' }"
              v-else
              >Login</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <main role="main" class="container py-5">
      <slot></slot>
    </main>
    <footer class="footer w-100 bg-light">
      <div class="container py-2">
        <span class="text-muted">Guarde links importantes.</span>
      </div>
    </footer>
  </div>
</template>
<script>
import apiUser from "@/services/apiLinks/users.js";

export default {
  methods: {
    logout() {
      this.$swal
        .fire({
          title: "Logout",
          text: "Tem certeza que deseja realizar o logout?",
          showCancelButton: true,
          confirmButtonText: "Sim",
          cancelButtonText: "Cancelar",
          icon: "warning",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              try {
                await apiUser.logout();
              } catch (e) {
                console.log(e);
              }
              this.$store
                .dispatch("logout")
                .then(() => {
                  this.$swal.fire(
                    "Logout",
                    "Logout realizado com sucesso",
                    "success"
                  );
                  this.$router.push({ name: "login" });
                })
                .catch((err) => {
                  if (err) {
                    throw err;
                  }
                });
            } catch (ex) {
              console.log(ex);
              this.$swal.fire("Logout", "Falha ao realizar logout", "error");
            }
          }
        });
    },
  },
};
</script>
<style scoped>
main[role="main"].container.py-5 {
  margin-top: 56px;
  margin-bottom: 40px;
}
footer.footer.w-100.bg-light {
  position: fixed;
  bottom: 0;
}
</style>