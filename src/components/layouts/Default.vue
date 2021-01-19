<template>
  <div>
    <header>
      <!-- Fixed navbar -->
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link
          class="navbar-brand d-flex align-items-center"
          :to="{ name: 'home' }"
        >
          <i class="fa fa-link mr-2"></i>
          <strong>LINKS Vault</strong>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <nav-router-link routeName="home" routeLabel="Home" />
            <nav-router-link routeName="categories" routeLabel="Categorias" />
          </ul>
        </div>
      </nav>
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
import NavRouterLink from "@/components/NavRouterLink.vue";

export default {
  components: {
    NavRouterLink,
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