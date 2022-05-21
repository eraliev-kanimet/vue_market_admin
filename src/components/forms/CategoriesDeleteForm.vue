<template>
  <form class="form">
    <strong>Удалить категорию: </strong>
    <p class="title">{{category.title}}</p>
    <ul class="buttons">
      <li class="red" @click="deleteCategory">Удалить</li>
      <li @click="modalInactive">Отмена</li>
    </ul>
  </form>
</template>

<script>
import {mapActions,mapState} from "vuex";

export default {
  name: "categories-delete-form",
  methods: {
    ...mapActions({
      deleteCategory: 'categories/deleteCategory',
      modalInactive: 'categories/modalDeleteInactive'
    })
  },
  computed: {
    ...mapState({
      category: state => state.categories._delete,
    })
  }
}
</script>

<style scoped>
.form {
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.title {
  margin: 15px;
}
.buttons {
  display: flex;
  align-items: center;
}
.buttons > li {
  width: auto;
  margin: 0 5px;
  padding: 5px 10px;
  background-color: rgba(221, 221, 221, 0.7);
  border-radius: 3px;
  color: rgba(0,0,0,0.7);
  cursor: pointer;
  font-size: 15px;
  text-transform: uppercase;
}
.buttons > li.red {
  background-color: #ef4f61;
  color: #f8f9fa;
}
</style>