<template>
  <div class="row h-100 justify-content-center align-items-center">
    <div class="col-12">
      <h1>{{ pageName }}</h1>
      <small class="text-muted"
        >Cadastre novos links ou veja os que já foram cadastrados e
        categorizados</small
      >
      <div class="text-center m-5" v-if="loading">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="accordion" role="tablist" v-else>
        <b-card
          v-for="(category, index) in categoriesLinks"
          :key="index"
          no-body
          class="mb-1"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle="`accordion-${index}`" variant="info">
              {{ category.name }}
            </b-button>
          </b-card-header>
          <b-collapse
            :id="`accordion-${index}`"
            :visible="index === 0"
            accordion="accordion-categories"
            role="tabpanel"
          >
            <b-card-body>
              <div v-for="link in category.links" :key="link.id">
                {{ link.id }}
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
    <button
      class="btn btn-primary btn-lg mr-3 mb-5"
      style="position: fixed; bottom: 0; right: 0"
      v-b-modal.modal-add-link
    >
      <i class="fa fa-plus"></i>
      Link
    </button>
    <b-modal id="modal-add-link" title="Inclua novos links" scrollable centered>
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <b-button size="sm" variant="outline-danger" @click="close()">
          Close Modal
        </b-button>
        <h5>Modal Header</h5>
      </template>

      <template #default="{ hide }">
        <p>Modal Body with button</p>
        <b-button @click="hide()">Hide Modal</b-button>
      </template>

      <template #modal-footer="{ ok, cancel, hide }">
        <b>Custom Footer</b>
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="success" @click="ok()"> OK </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
        <!-- Button with custom close trigger value -->
        <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
          Forget it
        </b-button>
      </template>
    </b-modal>
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
      pageName: "Home",
    };
  },
  async mounted() {
    await this.getCategoryLinks();
  },
  methods: {
    async getCategoryLinks() {
      this.loading = true;
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

      this.categoriesLinks = response.data.data.categories_links;
      this.loading = false;
    },
  },
};
</script>