<template>
  <div class="row h-100 justify-content-center align-items-center">
    <div class="col-12">
      <h1>{{ pageName }}</h1>
      <div class="text-center m-5" v-if="loading">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <ul class="list-group mt-4" v-else>
        <li
          v-for="category in categories"
          :key="category.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ category.name }}
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteCategory(category)"
          >
            <i class="fa fa-trash"></i>
          </button>
        </li>
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <form
            @submit.prevent="insertCategory"
            v-if="inserting"
            class="d-flex justify-content-between align-items-center w-100"
          >
            <input
              type="text"
              class="form-control mr-2"
              v-model="category"
              placeholder="Nova categoria"
              autofocus
              required
            />
            <button type="submit" class="btn btn-success mr-2">
              <i class="fa fa-check"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="toogleInserting()"
            >
              <i class="fa fa-times"></i>
            </button>
          </form>
          <button
            type="button"
            class="btn btn-primary btn-block"
            @click="toogleInserting()"
            v-else
          >
            <i class="fa fa-plus"></i>
          </button>
        </li>
      </ul>
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
      pageName: "Categorias",
      inserting: false,
      loading: false,
      category: "",
      categories: [],
    };
  },
  async mounted() {
    await this.loadCategories();
  },
  methods: {
    toogleInserting() {
      if (this.inserting) {
        this.inserting = false;
        this.category = "";
      } else {
        this.inserting = true;
      }
    },
    async insertCategory() {
      this.loading = true;
      const response = await apiCategory
        .store(this.category)
        .catch(function (error) {
          if (error.response) {
            return error.response;
          }
        });

      this.toogleInserting();

      if (response.status === 401) {
        this.forceLogout(this.pageName);
      }

      this.$swal.fire(
        this.pageName,
        response.data.message,
        response.data.success ? "success" : "error"
      );

      await this.loadCategories();
    },
    async deleteCategory(category) {
      this.$swal.fire({
        title: this.pageName,
        text: `Tem certeza que deseja excluir a categoria ${category.name}?`,
        footer: '<small class="text-muted">Se houverem links vinculados a essa categoria, eles também serão excluídos...</a>',
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
        icon: "warning",
        preConfirm: async () => {
          const response = await apiCategory
            .delete(category.id)
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

          await this.loadCategories();
        },
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !this.$swal.isLoading(),
      });
    },
    async loadCategories() {
      try {
        this.loading = true;
        const response = await apiCategory.index().catch(function (error) {
          if (error.response) {
            return error.response;
          }
        });

        if (response.status === 401) {
          this.forceLogout(this.pageName);
        }

        if (response.data.success) {
          this.categories = response.data.data.categories;
        } else {
          this.$swal.fire(this.pageName, response.data.message, "error");
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