<template>
  <categories-header/>
  <categories-table/>
  <base-modal @click="modalDeleteInactive" :visible="modalDelete">
    <categories-delete-form/>
  </base-modal>
  <base-modal @click="modalCreateInactive" :visible="modalCreate">
    <categories-create-form/>
  </base-modal>
  <base-modal @click="modalUpdateInactive" :visible="modalUpdate">
    <categories-update-form/>
  </base-modal>
</template>

<script>
import {mapActions, mapState} from "vuex";
export default {
  methods: {
    ...mapActions({
      getCategoriesOrSubcategories: 'categories/getCategoriesOrSubcategories',
      modalDeleteInactive: 'categories/modalDeleteInactive',
      modalCreateInactive: 'categories/modalCreateInactive',
      modalUpdateInactive: 'categories/modalUpdateInactive',
      getSelectCategories: 'categories/getSelectCategories',
    })
  },
  mounted() {
    this.getSelectCategories();
    this.getCategoriesOrSubcategories();
  },
  computed: {
    ...mapState({
      modalDelete: state => state.categories.modalDelete,
      modalCreate: state => state.categories.modalCreate,
      modalUpdate: state => state.categories.modalUpdate
    })
  }
}
</script>