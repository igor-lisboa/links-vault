<template>
  <div class="row h-100 justify-content-center align-items-center">
    <div class="col-12">
      <h1>{{ pageName }}</h1>
      <div class="text-center m-5" v-if="loading">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="accordion" role="tablist" v-else>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info"
              >Accordion 1</b-button
            >
          </b-card-header>
          <b-collapse
            id="accordion-1"
            visible
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body>
              <b-card-text>
                I start opened because <code>visible</code> is
                <code>true</code>
              </b-card-text>
              <b-card-text>{{ text }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="info"
              >Accordion 2</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ text }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-3 variant="info"
              >Accordion 3</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ text }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import apiCategory from "@/services/apiLinks/categories.js";
import mixinForceLogout from "@/mixins/forceLogout.js";
export default {
  mixins: [mixinForceLogout],
  data() {
    return {
      loading: false,
      categoriesLinks: {},
      text: "te",
      pageName: "Home",
    };
  },
  async mounted() {
    await this.getCategoryLinks();
  },
  methods: {
    async getCategoryLinks() {
      const response = await apiCategory.links().catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });

      if (response.status === 401) {
        this.forceLogout(this.pageName);
      }

      if (!response.data.success) {
        this.$swal.fire(this.pageName, response.data.message, "error");
      }

      this.categoriesLinks = response.data.categories_links;
    },
  },
};
</script>