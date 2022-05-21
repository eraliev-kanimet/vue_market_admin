<template>
  <div class="header">
    <div class="left"><p>{{ current.id ? 'Категория: ' + current.title : 'Категории' }}</p></div>
    <ul class="right">
      <li v-if="current.id">Загрузить продукты</li>
      <li @click="modalUpdateActive('current')" v-if="current.id">Изменить</li>
      <li @click="modalDeleteActive(current)" v-if="current.id">Удалить</li>
      <li @click="modalCreateActive">{{ current.id  ? 'Создать под-категорий' : 'Создать категорий'}}</li>
      <li @click="callGetCategoriesOrSubcategories" v-if="current.id">Назад</li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "categories-header",
  methods: {
    ...mapActions({
      callGetCategoriesOrSubcategories: 'categories/callGetCategoriesOrSubcategories',
      modalCreateActive: 'categories/modalCreateActive',
      modalDeleteActive: 'categories/modalDeleteActive',
      modalUpdateActive: 'categories/modalUpdateActive'
    }),
  },
  computed: {
    ...mapState({
      current: state => state.categories.current
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  min-height: 65px;
  margin: 30px auto;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.1) 0 8px 24px;
  .left {
    font-size: 26px;
    text-align: left; 
    width: 40%;
  }
  .right {
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    li {
      width: auto;
      margin: 3px;
      padding: 5px 12px;
      background-color: rgba(221, 221, 221, 0.7);
      border-radius: 2px;
      color: rgba(0,0,0,0.7);
      cursor: pointer;
      font-size: 14px;
      text-transform: uppercase;
      &:hover {
        background-color: #DDDDDD;
      }
    }
  }
}
</style>