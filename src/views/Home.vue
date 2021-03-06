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
      <div class="accordion mt-3" role="tablist" v-else>
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
              <small
                v-if="category.links.length === 0"
                class="text-center text-muted"
                >Cadastre links nessa categoria</small
              >
              <ul class="list-group mt-4" v-else>
                <li
                  v-for="link in category.links"
                  :key="link.id"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <a target="_blank" :href="link.link">
                    {{ link.name ? link.name : link.link }}
                  </a>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteLink(link)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </li>
              </ul>
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
    <b-modal
      id="modal-add-link"
      title="Inclua novos links"
      scrollable
      centered
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5 class="m-auto">Novo Link</h5>
        <button class="btn btn-light" @click="close()" ref="btnClose">
          <i class="fa fa-times"></i>
        </button>
      </template>

      <template #default>
        <h5
          v-if="categoriesLinks.length === 0"
          class="text-danger text-center m-auto"
        >
          Por favor, cadastre ao menos uma categoria antes de adicionar seu
          primeiro link.
          <hr class="mb-4" />
          <small class="text-muted">
            <router-link :to="{ name: 'categories' }">
              Cique aqui para cadastrar uma categoria
            </router-link>
          </small>
        </h5>
        <form v-else @submit.prevent="saveLink">
          <div class="form-group">
            <label for="link">Link</label>
            <input
              type="url"
              id="link"
              class="form-control"
              v-model="link.link"
              autofocus
              required
            />
          </div>
          <div class="form-group">
            <label for="category">Categoria</label>
            <select
              v-model="link.category"
              id="category"
              class="form-control"
              required
            >
              <option
                v-for="category in categoriesLinks"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="name">Nome para o link</label>
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="link.name"
            />
          </div>
          <hr class="mb-4" />
          <button
            v-if="!loading"
            type="submit"
            class="btn btn-success btn-block"
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
      </template>
    </b-modal>
  </div>
</template>
<script>
import apiCategory from "@/services/apiLinks/categories.js";
import apiLinks from "@/services/apiLinks/links.js";
import mixinForceLogout from "@/mixins/forceLogout.js";

export default {
  mixins: [mixinForceLogout],
  data() {
    return {
      loading: false,
      categoriesLinks: [],
      link: {},
      pageName: "Home",
    };
  },
  async mounted() {
    await this.getCategoryLinks();
  },
  methods: {
    async deleteLink(link) {
      this.$swal.fire({
        title: this.pageName,
        text: `Tem certeza que deseja excluir o link ${
          link.name ? link.name : link.link
        }?`,
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
        icon: "warning",
        preConfirm: async () => {
          const response = await apiLinks
            .delete(link.id)
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

          await this.getCategoryLinks();
        },
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !this.$swal.isLoading(),
      });
    },
    hideModalAddLink() {
      this.$root.$emit("bv::hide::modal", "modal-add-link", "#btnClose");
    },
    async saveLink() {
      try {
        this.loading = true;
        const response = await apiLinks
          .store(this.link.category, this.link.link, this.link.name)
          .catch(function (error) {
            if (error.response) {
              return error.response;
            }
          });

        if (response.status === 401) {
          this.forceLogout(this.pageName);
        }

        if (response.data.success) {
          this.link = {};
          this.hideModalAddLink();
          this.loading = false;
        }

        this.$swal.fire(
          this.pageName,
          response.data.message,
          response.data.success ? "success" : "error"
        );

        await this.getCategoryLinks();
      } catch (e) {
        console.log(e);
      }
    },
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