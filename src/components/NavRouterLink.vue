<template>
  <li :class="'nav-item' + ($route.name === routeName ? ' active' : '')">
    <router-link class="nav-link" :to="{ name: routeName }">
      {{ routeLabel }}
    </router-link>
  </li>
</template>
<script>
export default {
  props: ["routeName", "routeLabel"],
};
</script>