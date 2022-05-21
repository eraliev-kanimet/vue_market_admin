<template>
  <div class="table_categories">
    <ul class="table_categories-th">
      <li>#</li>
      <li>Название</li>
      <li>Действие</li>
    </ul>
    <ul @click="replaceCurrent(category)" class="table_categories-td" v-for="category in categories" :key="category.id">
      <li>{{category.id}}</li>
      <li>{{category.title}}</li>
      <li>
        <ul @click.stop class="table_categories-td-action">
          <li>Загрузить продукты</li>
          <li @click="modalUpdateActive(category)">Изменить</li>
          <li @click="modalDeleteActive(category)">Удалить</li>
        </ul>
      </li>
    </ul>
    <div v-if="!categories.length" class="table_categories-empty">Пусто</div>
    <div v-show="isLoading" class="table_categories-empty">Идет загрузка...</div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "categories-table",
  methods: {
    ...mapActions({
      replaceCurrent: 'categories/replaceCurrent',
      modalDeleteActive: 'categories/modalDeleteActive',
      modalUpdateActive: 'categories/modalUpdateActive'
    }),
  },
  computed: {
    ...mapState({
      categories: state => state.categories.categories,
      isLoading: state => state.categories.isLoading
    })
  }
}
</script>
<style lang="scss" scoped>
.table_categories {
  margin: 30px 0 auto;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  border: 1px solid rgba(221, 221, 221, 0.7);
  border-top: none;
  border-radius: 5px;
  position: relative;
  ul {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(221, 221, 221, 0.7);
    background-color: #f8f9fa;
    li:first-child {
      text-align: center;
      width: 30px;
    }
    li:last-child {
      text-align: right;
      margin-left: auto;
    }
  }
  .table_categories-th {
    border-top: 1px solid rgba(221, 221, 221, 0.7);
    padding: 10px 20px 10px 0;
  }
  .table_categories-td {
    padding: 6px 10px 6px 0;
    cursor: pointer;
    &:hover {
      background-color: rgba(222, 222, 222, 0.4);
      ul {
        background-color: rgb(222, 222, 222, 0.05);
      }
    }
    .table_categories-td-action {
      justify-content: right;
      flex-wrap: wrap;
      border: none;
      li {
        width: auto;
        margin: 0 5px;
        padding: 5px 11px;
        background-color: rgba(221, 221, 221, 0.7);
        border-radius: 2px;
        color: rgba(0,0,0,0.7);
        cursor: pointer;
        font-size: 12px;
        text-transform: uppercase;
        &:hover {
          background-color: #DDDDDD;
        }
      }
    }
  }
  .table_categories-empty {
    text-align: center;
    padding: 9px;
    &.link {
      cursor: pointer;
    }
    &.link:hover {
      background-color: rgba(222, 222, 222, 0.4);
    }
  }
}
</style>